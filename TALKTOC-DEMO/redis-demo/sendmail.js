const express = require('express');
const app = express();
const redis = require('redis');

//subcribe channel
(async () => {
    const subscriber = redis.createClient();

    await subscriber.connect();

    await subscriber.subscribe('orderSystem', (channel, message) => {
        console.log('::Send mail ', channel, message);
    });
})();

app.listen(3002, () => {
    console.log("The sendmail running at 3002");
});