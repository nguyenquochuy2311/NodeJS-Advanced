import express from 'express';
import authController from '../../../controllers/api/v1/auth.controller';

const router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/refresh-token', (req, res, next) => {
    res.send('function refresh-token');
})

router.post('/logout', (req, res, next) => {
    res.send('function logout');
})

module.exports = router;