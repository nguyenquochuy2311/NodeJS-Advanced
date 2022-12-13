const amqp = require("amqplib");

var connection;

//  Connect RabbitMQ
async function connectRabbitMQ() {
    try {
        connection = await amqp.connect("amqp://localhost");
        console.info("connect to RabbitMQ success");

        const channel = await connection.createChannel();

        const QUEUE = "demo";

        await channel.assertQueue(QUEUE);
        await channel.consume(QUEUE, async function (message) {
            console.log(message.content.toString());
            channel.ack(message);
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
connectRabbitMQ();