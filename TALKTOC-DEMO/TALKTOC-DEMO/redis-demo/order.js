const express = require('express');
const app = express();
const redis = require('redis');
const publisher = redis.createClient(6379);

(async () => {
    // Connect to redis server
    await publisher.connect();
})();

app.get('/order', async(req, res) => {

    const order = [
        {
            proId: 1,
            price: 5000
        },
        {
            proId: 2,
            price: 10000
        }
    ];

    //publish channel
    await publisher.publish('orderSystem', JSON.stringify(order));

    // Step 1 : Payment, Step 2: Send mail 
    return res.json({
        status: 'success',
        messsage: 'Get Orders success',
        data: order
    })
});

app.listen(3000, async () => {
    console.log("The order running at 3000");
});