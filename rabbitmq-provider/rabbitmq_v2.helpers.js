const amqp = require('amqplib');

const URL = 'amqp://localhost';

class RabbitMQV2 {
    constructor() {}

    async publish(queueName, data, exchangeName = null, type = 'fanout' ,routingKey = null) {
        try {
            if(!queueName || !data) throw Error('Publish failed');

            const connection = await amqp.connect(URL);

            const channel = await connection.createChannel();

            await channel.assertQueue(queueName);
            channel.sendToQueue(queueName, Buffer.from(data));

            connection.on("error", function (err) {
                console.log(err);
                setTimeout(connectRabbitMQ, 10000);
            });

            connection.on("close", function () {
                console.error("connection to RabbitQM closed!");
                setTimeout(connectRabbitMQ, 10000);
            });
        }
        catch (err) {
            console.error(err);
            setTimeout(connectRabbitMQ, 10000);
        }
    }

    async consume(queueName) {
        try {
            const connection = await amqp.connect(URL);

            const channel = await connection.createChannel();

            await channel.assertQueue(queueName);
            await channel.consume(queueName, async function (message) {
                if (message && message.content) {
                    console.log(message.content.toString());
                    channel.ack(message);
                }
            });

            connection.on("error", function (err) {
                console.log(err);
                setTimeout(connectRabbitMQ, 10000);
            });

            connection.on("close", function () {
                console.error("connection to RabbitQM closed!");
                setTimeout(connectRabbitMQ, 10000);
            });

        }
        catch (err) {
            console.error(err);
            setTimeout(connectRabbitMQ, 10000);
        }
    }
}