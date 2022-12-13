const express = require('express');
const app = express();

const MessageBroker = require('./helpers/rabbitmq.helper');
const RMQConsumer = await new MessageBroker().init();

app.use(async (req, res, next) => {
    try {
        
    } catch (error) {
        process.exit(1);
    }
})

const PORT = 9001;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})
