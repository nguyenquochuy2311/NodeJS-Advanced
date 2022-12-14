const express = require('express');
const app = express();

const MessageBroker = require('./helpers/rabbitmq.helper');
const RMQProducer = new MessageBroker().init();
const publishWorkspace = require('./services/rabbitmq/publish_workspace');

app.use(async (req, res, next) => {
    try {
        req.RMQProducer = await RMQProducer;
        next();
    } catch (error) {
        process.exit(1);
    }
});

for (let index = 0; index < array.length; index++) {
    app.get("/signup", async (req, res) => {
        const data = {
            workspaceID: 'ws1',
            email: 'test@gmail.com'
        }
    
        await publishWorkspace(req.RMQProducer, data, 'workspace_signup');
    
        res.json(data);
    });
}

app.get("/signin", async (req, res) => {
    const data = {
        workspaceID: 'ws2',
        email: 'test1@gmail.com'
    }

    await publishWorkspace(req.RMQProducer, data, 'workspace_signin');

    res.json(data);
})

const PORT = 9000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

process.on("SIGINT", async () => {
    process.exit(1);
});
process.on("exit", () => {
    if (RMQProducer.channel) RMQProducer.channel.close();
    if (RMQProducer.connection) RMQProducer.connection.close();
});
