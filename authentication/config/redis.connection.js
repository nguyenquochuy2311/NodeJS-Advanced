import * as redis from 'redis';

const REDIS_HOST = '127.0.0.1';
const REDIS_PORT = 6379;

const client = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT
});

(async () => {
    // Connect to redis server
    await client.connect();
})();

client.on("error", function (error) {
    console.error(`Redis error:::${error}`);
});

client.on("connect", function () {
    console.log(`Redis connected`);
});

client.on("ready", function () {
    console.log(`Redis ready`);
});
module.exports = client;