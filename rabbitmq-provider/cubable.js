const express = require('express');
const app = express();

// const CubableRabbitMQ = require('./cubable.rabbitmq');
// const cubableRabbitMQ = new CubableRabbitMQ();
// (async () => {
//     await cubableRabbitMQ.init();
// });

const CubablePublisher = require('./rabbitmq/publisher');
const cubablePublisher = new CubablePublisher(); 

const { ADMIN_PANNEL_QUEUE } = require('./admin_pannel_constant');

app.use('/signup', async (req, res) => {
    const data = {
        workspaceID: 'huyws',
        emailOwner: 'huy@gmail.com'
    }

    await cubablePublisher.sendToQueue(ADMIN_PANNEL_QUEUE.WORKSPACE_SIGNUP, data);

    res.json(data);
});

// app.use('/signin', async (req, res) => {
//     const data = {
//         token: 'abc'
//     }

//     await cubableRabbitMQ.sendToQueue(ADMIN_PANNEL_QUEUE.WORKSPACE_SIGNIN, data);

//     res.json(data);
// });

const PORT = 9000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})