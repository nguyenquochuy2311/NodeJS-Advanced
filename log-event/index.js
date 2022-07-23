const express = require('express');
const app = express();
const router = express.Router();
const createError = require('http-errors');
const logEvents = require('./logEvents');

router.get("/", (req, res, next) => {
    return next(createError.InternalServerError("Error 500"));
    res.send("Error 500");
})

app.use("/", (err, req, res, next) => {
    if (err) logEvents(err.message);
    res.status(err.status).send({
        status: err.status || 500,
        message: err.message
    })
})

app.listen(3000, () => console.log("http://localhost:3000"));

module.exports = app;