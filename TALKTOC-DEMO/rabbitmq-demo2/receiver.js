const amqp = require('amqplib/callback_api');

//Step 1: Create Connection
const STR_CONNECT = 'amqp://localhost';

amqp.connect(STR_CONNECT, (connError, connection) => {
    if(connError) 
        throw connError;
    console.log("Rabbit Init");
    
    //Step 2: Create Channel
    connection.createChannel((channelError, channel) => {
        if (channelError) throw channelError;

        //Step 3: Assert Queue
        const QUEUE = 'queueTest';
        channel.assertQueue(QUEUE);

        //Step 4: Receive message from Queue
        channel.consume(QUEUE, (msg) => {
            console.log(`Message received: ${msg.content.toString()}`);
            channel.ack(msg);
        })
        // {
        //     noAck: true
        // });
    })
})