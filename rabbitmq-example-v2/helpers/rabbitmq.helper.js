const amqp = require('amqplib');
const URL = 'amqp://localhost';
const _ = require('lodash');

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

    async createExchange(name, type = 'fanout') {
        if (!this.connection) await this.init();
        await this.channel.assertExchange(name, type, { durable: true });
        this.exchange = name;
        return this;
    }

    /**
     * Send message to an exchange
     * @param {String} - string defining exchange
     * @param {String} - msg Message as Buffer
     * @param {String} - string defining and routingKey
     */
    async publish(exchange, msg, routingKey = '') {
        const queue = `${exchange}.${routingKey}`;

        await this.channel.assertQueue(queue);
        
        const args =Object.assign({}, {
            'x-delay': 5000
        }); 
        this.channel.bindQueue(queue, exchange, routingKey, args);
        
        if(typeof msg !== 'string') msg = JSON.stringify(msg);
        this.channel.publish(exchange, routingKey, Buffer.from(msg), args);
    }

    /**
     * @param {Object} - object defining queue name and bindingKey
     * @param {Function} handler Handler that will be invoked with given message and acknowledge function (msg, ack)
     */
    async subscribe(exchange, bindingKey, handler) {
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
        
        const args =Object.assign({}, {
            'x-delay': 5000
        }); 
        await this.channel.assertQueue(queue)
        this.channel.bindQueue(queue, exchange, bindingKey, args);
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