const amqp = require('amqplib');

const URL = 'amqp://localhost';

class RabbitMQ {

    connection = null;
    channel = null;

    /**
     * @constructor
     * @param
     */
    constructor() {}

    /**
     * @param
     * @return  Promise
     */
    async connect() {
        try {
            const connection = await amqp.connect(URL);
            this.connection = connection;
        } catch (error) {
            setTimeout(() => {
                this.connect();
            }, 5000);
        }
    }

    /**
     * @param
     * @return  Promise
     */
    async disconnect() {
        try {
            if (this.channel) await this.channel.close();
            if (this.connection) await this.connection.close();
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param
     * @return  Promise
     */
    async createChannel() {
        try {
            const channel = await this.connection.createChannel();
            this.channel = channel;
        } catch (error) {
            this.connect();
        }
    }

    /**
     * @param
     * @return  Promise
     */
    async init() {
        try {
            await this.connect();
            await this.createChannel();
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * @param   queueName string
     * @return  Promise
     */
    async assertQueue(queueName) {
        try {
            if (!queueName) throw Error('Assert queue failed');

            if (!this.channel) {
                this.channel = await this.createChannel();
                await this.channel.assertQueue(queueName);
            } else {
                await this.channel.assertQueue(queueName);
            }
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * @param   queueName string
     * @return  Promise
     */
    async assertQueueAndBind(queueName, exchangeName, data = '') {
        try {
            if (!queueName || !exchangeName) throw Error('Assert and bind queue failed');
            if (!this.channel) this.channel = await this.createChannel();

            await this.channel.assertQueue(queueName, {
                exclusive: false
            }, async function (error, q) {
                if (error) throw error;

                await this.channel.bindQueue(q.queue, exchangeName, data);
            })
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * @param   queueName string
     * @return  Promise
     */
    async assertExchange(exchangeName, type = 'fanout') {
        try {
            if (!exchangeName) throw Error('Assert exchange failed');
            if (!this.channel) this.channel = await this.createChannel();

            await this.channel.assertExchange(exchangeName, type, {
                durable: true,
                autoDelete: false
            });
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * @param   queueName string
     * @param   data string  
     * @param   exchangeName string   
     * @param   type fanout | direct | topic | headers    
     * @return  Promise
     */
    async sendToQueue(queueName, data, exchangeName = null, type = 'fanout') {
        try {
            if (!queueName || !data) throw Error('Send to queue failed');
            if (!this.channel) this.channel = await this.createChannel();
            if (typeof data !== 'string') data = JSON.stringify(data);

            switch (type) {
                case 'direct':

                    break;
                case 'topic':

                    break;
                case 'headers':

                    break;
                default:
                    if (exchangeName) {
                        await this.assertQueueAndBind(queueName, exchangeName);
                    } else {
                        await this.assertQueue(queueName);
                    }
                    await this.channel.sendToQueue(queueName, Buffer.from(data));
                    break;
            }
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * @param   queueName string
     * @param   fn   
     * @return  Promise
     */
    async consume(queueName, fn) {
        try {
            if (!queueName) throw Error('Channel consume queue failed');
            if (!this.channel) this.channel = await this.createChannel();

            await this.assertQueue(queueName);
            await this.channel.consume(queueName, (data) => {
                if (data && data.content) data = JSON.parse(data.content.toString());
                fn(data);
            }, {
                noAck: true
            })
        } catch (error) {
            console.error(error);
        }
    }

    async connectRabbitMQ() {
        try {
            const connection = await amqp.connect("amqp://localhost");
            console.info("connect to RabbitMQ success");
    
            const channel = await connection.createChannel();
    
            const QUEUE = "workspace_signup";
    
            await channel.assertQueue(QUEUE);
            await channel.consume(QUEUE, async function (message) {
                if(message && message.content) {
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

module.exports = RabbitMQ;