import express from 'express';
import verifyAccessToken from '../../../middleware/authentication/bearer.token';
import usersController from '../../../controllers/api/v1/users.controller';

const router = express.Router();

router.get('/test', verifyAccessToken, (req, res, next) => {
    console.log(req.headers);
    res.json("OK");
});

router.get('/', usersController.getAll);

router.get('/:id', usersController.getOne);

router.delete('/:id', usersController.destroy);

module.exports = router;