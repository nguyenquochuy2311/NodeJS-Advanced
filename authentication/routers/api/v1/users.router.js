import express from 'express';
import { verifyAccessToken, autoRefreshAccessToken } from '../../../middleware/authentication/bearer.token';
import usersController from '../../../controllers/api/v1/users.controller';

const router = express.Router();

router.get('/', autoRefreshAccessToken, usersController.getAll);

router.get('/:id', verifyAccessToken, usersController.getOne);

router.delete('/:id', verifyAccessToken, usersController.destroy);

module.exports = router;