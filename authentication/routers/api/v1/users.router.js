import express from 'express';
import usersController from '../../../controllers/api/v1/users.controller';

const router = express.Router();

router.get('/', usersController.getAll);

router.get('/:id', usersController.getOne);

router.delete('/:id', usersController.destroy);

module.exports = router;