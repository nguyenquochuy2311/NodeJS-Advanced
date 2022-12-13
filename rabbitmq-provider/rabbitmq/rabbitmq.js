const amqp = require('amqplib');

const URL = 'amqp://localhost';

class RabbitMQ {

    constructor() {
        this.connection = null;
        this.channel = null;
    }

    async connect() {
        try {
            this.connection = await amqp.connect(URL);
            if (this.connection) {
                this.channel = await this.connection.createChannel();
            }
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
            throw error;
        }
    }

}

module.exports = RabbitMQ;