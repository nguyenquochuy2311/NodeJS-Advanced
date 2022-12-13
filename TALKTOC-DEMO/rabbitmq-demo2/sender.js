const amqp = require('amqplib/callback_api');

//Step 1: Create Connection
amqp.connect('amqp://localhost', (connError, connection) => {
    if(connError) throw connError;

    //Step 2: Create Channel
    connection.createChannel((channelError, channel) => {
        if(channelError)
            throw channelError;

        //Step 3: Assert Queue
        const QUEUE = 'queueTest';
        channel.assertQueue(QUEUE);

        //Step 4: Send message to Queue
        for (let index = 0; index < 500; index++) {
            channel.sendToQueue(QUEUE, Buffer.from(`${index} Hello World!!!!`));
            console.log(`${index} Message send ${QUEUE}`);
        }
    })
})