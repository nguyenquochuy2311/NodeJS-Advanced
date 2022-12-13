const express = require('express');
const app = express();
const router = require('./router');
const logEvents = require('./logEvents');

app.use("/", router);

app.use((err, req, res, next) => {
    logEvents(`${req.url} --- ${req.method} --- ${err.message}`);
    res.status(err.status).json({
        status: err.status || 500,
        message: err.message
    })
})

app.listen(3000, () => {
    console.log("Port 3000 running");
})

module.exports = app;