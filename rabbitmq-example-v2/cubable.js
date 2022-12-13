const express = require('express');
const app = express();

const MessageBroker = require('./helpers/rabbitmq.helper');
const RMQProducer = await new MessageBroker().init();

app.use(async (req, res, next) => {
    try {
        req.RMQProducer = await RMQProducer;
        next();
    } catch (error) {
        process.exit(1);
    }
});

app.get("/", async (req, res) => {
    
})

const PORT = 9000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})
