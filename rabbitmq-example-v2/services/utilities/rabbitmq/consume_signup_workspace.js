const MessageBroker = require('../../../helpers/rabbitmq.helper');
const RMQConsumer = new MessageBroker().init();
const EXCHANGE = 'admin_pannel';
const handleWorkspaceSignup = require('../../../handlers/handle_workspace_signup');

async function processSignup() {
  try {
    const consumer = await RMQConsumer;
    await consumer.createExchange(EXCHANGE, "direct");
    consumer.subscribe(EXCHANGE, "workspace_signup", handleWorkspaceSignup);
  } catch (error) {
    console.log(error);
  }
}

module.exports = processSignup;