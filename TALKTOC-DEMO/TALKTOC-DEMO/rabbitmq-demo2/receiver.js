const amqp = require('amqplib/callback_api');

//Step 1: Create Connection
const SECRET_CONNECT = "talktoc:cafe24%40001"
const STR_CONNECT = `amqp://${SECRET_CONNECT}@talktoc.app4cafe24.com:5672`;

amqp.connect(STR_CONNECT, (connError, connection) => {
    if(connError) 
        throw connError;
    console.log("Rabbit Init");
    
    //Step 2: Create Channel
    connection.createChannel((channelError, channel) => {
        if (channelError)
            throw channelError;

        //Step 3: Assert Queue
        const QUEUE = 'sns-facebook-message-to-db';
        channel.assertQueue(QUEUE);

        //Step 4: Receive message from Queue
        channel.consume(QUEUE, (msg) => {
            console.log(`Message received: ${msg.content.toString()}`);
        }, {
            noAck: true
        });
    })
})