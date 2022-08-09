import mongoose from "mongoose";
import 'dotenv/config';

function newConnection(uri) {
    const conn = mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    conn.on('connected', function () {
        console.log(`Mongodb::: connected:::${this.name}`);
    });

    conn.on('disconnected', function () {
        console.log(`Mongodb::: disconnected:::${this.name}`);
    });

    conn.on('error', function (error) {
        console.log(`Mongodb::: error:::${JSON.stringify(error)}`);
    });
    return conn;
}

//Define connection DB
const authConnection = newConnection(process.env.MONGO_CONNECTION_STRING);
const shipngayConnection = newConnection(process.env.MONGO_CONNECTION_STRING_01);

module.exports = {
    authConnection,
    shipngayConnection
}