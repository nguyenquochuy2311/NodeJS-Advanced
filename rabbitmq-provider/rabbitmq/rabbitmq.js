const amqp = require('amqplib');

const URL = 'amqp://localhost';

class RabbitMQ {

    constructor() {
        this.connection;
        this.channel;
        this.queue = '';
    }

    async connect() {
        try {
            const connection = await amqp.connect(URL);
            const channel = await connection.createChannel();
            this.connection = connection;
            this.channel = channel;
            await this.channel.assertQueue(this.q, { durable: false });
        } catch (error) {
            console.error(error);
            setTimeout(() => {
                this.connect();
            }, 5000);
        }
    }

    async disconnect() {
        try {
            if (this.connection) await this.connection.close();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}

module.exports = RabbitMQ;