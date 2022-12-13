const RabbitMQ = require("./rabbitmq");

class Publisher extends RabbitMQ {

    constructor() {
        super();
    }

    async sendToQueue(queueName, data) {
        try {
            if (typeof data !== 'string') data = JSON.stringify(data);

            if (queueName) {
                await this.channel.assertQueue(queueName);
                await this.channel.sendToQueue(queueName, Buffer.from(data));
            }
        } catch (error) {
            console.log(error);
            this.connect();
        }
    }
}

module.exports = Publisher;