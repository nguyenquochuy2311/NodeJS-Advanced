const express = require('express');
const app = express();
const config = require('./config');
const RabbitMQ = require('./lib/rabbitmq');
const amql = new RabbitMQ(config);

app.use('/', (req, res) => {
    const queue = {
        queue: {
            name: 'queue-test'
        }
    }

    const data = {
        workspaceID: 'test'
    }

    amql.publish(queue, data);

    res.json(data);
});

app.listen(9000, () => {
    console.log(`http://localhost:9000`);
})