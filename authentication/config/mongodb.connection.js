import mongoose from 'mongoose';

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const cluster = process.env.MONGO_CLUSTER;
const dbname = process.env.MONGO_DB;
const connectionString = process.env.MONGO_CONNECTION_STRING;

const conn = mongoose.createConnection(
    connectionString ||
    `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`
);

conn.on('connected', function () {
    console.log(`Mongodb::: connected:::${this.name}`);
});

conn.on('disconnected', function () {
    console.log(`Mongodb::: disconnected:::${this.name}`);
});

conn.on('error', function (error) {
    console.log(`Mongodb::: error:::${JSON.stringify(error)}`);
});

process.on('SIGINT', async () => {
    await conn.close();
    process.exit(0);
})

module.exports = conn;
