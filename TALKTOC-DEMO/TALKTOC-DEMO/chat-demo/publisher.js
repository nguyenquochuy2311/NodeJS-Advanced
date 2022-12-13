const amqp = require("amqplib")
connect();
async function connect(){
    try {
        const connection = amqp.connect("amqp://localhost:5672");
        const channel = await (await connection).createChannel();

        const result = await channel.assertQueue("jobs");
        channel.sendToQueue("jobs", Buffer.from("Hi it works"))
        console.log("jobs sent successfully")
    }
    catch(ex) {
        console.error(ex)
    }
}
