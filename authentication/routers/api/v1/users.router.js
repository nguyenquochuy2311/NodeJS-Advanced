import express from 'express';
import usersController from '../../../controllers/api/v1/users.controller';

const router = express.Router();

router.get('/', usersController.getAll);

module.exports = router;