const express = require('express');
const app = express();

const AdminPannelRabbitMQ = require('./admin_pannel.rabbitmq');
const adminPannelRabbitMQ = new AdminPannelRabbitMQ();

const amqp = require('amqplib');
const { ADMIN_PANNEL_QUEUE } = require('./admin_pannel_constant');

// adminPannelRabbitMQ.connectRabbitMQ();

const AdminPannelConsumer = require('./rabbitmq/consumer');
const adminPannelConsumer = new AdminPannelConsumer();

(async () => {
    await adminPannelConsumer.consume(ADMIN_PANNEL_QUEUE.WORKSPACE_SIGNUP);
});

app.use('/', (req, res) => {
    res.json('here');
})

const PORT = 9001;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})