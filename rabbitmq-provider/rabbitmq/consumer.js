const RabbitMQ = require("./rabbitmq");

class Consumer extends RabbitMQ {

    constructor() {
        super();
    }

    async consume(queueName) {
        await this.connect();
        try {
            if (queueName) {
                console.log(queueName);
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
            this.connect();
        }
    }
}

module.exports = Consumer;