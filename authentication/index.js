import express from 'express';
import 'dotenv/config'
import cors from 'cors';
import createError from 'http-errors';
import bodyParser from 'body-parser';
import multer from 'multer';

import {
    v1ApiRouters
} from './routers/api';

const app = express();

require('./config');

const port = process.env.PORT || 3000;

const corsOptions = {
    origin: [
        `http://localhost:${port}`,
        `http://localhost:4000`,
        `http://localhost:5000`,
        `http://localhost:8080`
    ],
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(multer().array());

v1ApiRouters(app);

/* Handle Error API */
app.use((req, res, next) => {
    next(createError.NotFound('The API does not exist or has not been published in an environment.'));
})
app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
        message: err.message
    })
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(port, () => {
    console.log(`Server started: ${corsOptions.origin[0]}`)
});

module.exports = app;




