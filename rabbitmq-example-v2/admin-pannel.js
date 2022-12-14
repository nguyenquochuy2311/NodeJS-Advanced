const express = require('express');
const app = express();

const processSignup = require('./services/utilities/rabbitmq/consume_signup_workspace');

app.use('/', (req, res) => {
    res.send('OK');
})

processSignup();

const PORT = 9001;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});