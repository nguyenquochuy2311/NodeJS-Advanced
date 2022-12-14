const express = require('express');
const app = express();
const config = require('./config');
const RabbitMQClient = require('node-rabbitmq-client');

app.use('/', (req, res) => {
    const data = {
        workspaceID: 'test'
    }
    
    const client = new RabbitMQClient(config);
    client.publish({ queue: { name: 'queue-test' } }, data);

    res.json(data);
});

app.listen(9000, () => {
    console.log(`http://localhost:9000`);
})