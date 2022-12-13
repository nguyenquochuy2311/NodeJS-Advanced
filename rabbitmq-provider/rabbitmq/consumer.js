const RabbitMQ = require("./rabbitmq");

class Consumer extends RabbitMQ {

    constructor() {
        super();
    }

    async consume(queueName) {
        await this.connect();
        try {
            if (queueName) {
                await this.channel.assertQueue(queueName);
                await this.channel.consume(queueName, (data) => {
                    if (data && data.content) {
                        data = JSON.parse(data.content.toString());
                        console.log(data);
                    }
                }, {
                    noAck: true
                })
            }
        } catch (error) {
            console.error(error);
            this.connect();
        }
    }
}

module.exports = Consumer;