import express from 'express';

const router = express.Router();

router.get('/', authController.register);

module.exports = router;