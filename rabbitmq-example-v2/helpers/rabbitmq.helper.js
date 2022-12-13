const amqp = require('amqplib');
const URL = 'amqp://localhost';

class RabbitMQ {
    constructor() {
        this.queues = {};
    }

    async init() {
        try {
            this.connection = await amqp.connect(URL);
            this.channel = await this.connection.createChannel();
            return this;
        } catch (error) {
            setTimeout(() => {
                this.init();
            }, 10000);
        }
    }

    async createExchange({ name, type, durable = true }) {
        if (!this.connection) await this.init();
        await this.channel.assertExchange(name, type, { durable });
        this.exchange = name;
        return this;
    }

    /**
     * Send message to an exchange
     * @param {Object} - object defining exchange and routingKey
     * @param {Object} msg Message as Buffer
     */
    async publish({ exchange, routingKey }, msg) {
        const queue = `${exchange}.${routingKey}`
        await this.channel.assertQueue(queue, { durable: true })
        this.channel.bindQueue(queue, exchange, routingKey)
        this.channel.publish(exchange, routingKey, Buffer.from(msg))
    }

    /**
     * @param {Object} - object defining queue name and bindingKey
     * @param {Function} handler Handler that will be invoked with given message and acknowledge function (msg, ack)
     */
    async subscribe({ exchange, bindingKey }, handler) {
        const queue = `${exchange}.${bindingKey}`
        if (!this.connection) {
            await this.init()
        }
        if (this.queues[queue]) {
            const existingHandler = _.find(this.queues[queue], h => h === handler)
            if (existingHandler) {
                return () => this.unsubscribe(queue, existingHandler)
            }
            this.queues[queue].push(handler)
            return () => this.unsubscribe(queue, handler)
        }

        await this.channel.assertQueue(queue, { durable: true })
        this.channel.bindQueue(queue, exchange, bindingKey)
        this.queues[queue] = [handler]
        this.channel.consume(
            queue,
            async (msg) => {
                const ack = _.once(() => this.channel.ack(msg));
                this.queues[queue].forEach(h => h(msg, ack));
            }
        )
        return () => this.unsubscribe(queue, handler);
    }

    async unsubscribe (queue, handler) {
        _.pull(this.queues[queue], handler)
    }
}

module.exports = RabbitMQ;