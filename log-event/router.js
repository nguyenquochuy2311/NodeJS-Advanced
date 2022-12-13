const express = require('express');
const router = express.Router();
const createError = require('http-errors');

router.get("/", (req, res, next) => {
    return next(createError.InternalServerError("This is Error 500"));
})

module.exports = router;