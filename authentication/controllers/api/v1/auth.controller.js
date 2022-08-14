import {
    Authentication,
    User
} from '../../../models/mongo/user.model';
import createError from 'http-errors';
import validateRegister from '../../../validation/register';
import validateLogin from '../../../validation/login';
import { removePropertyObj } from '../../../utils/removePropertyObj';
import { signAccessToken } from '../../../utils/jwtFunction';

module.exports = {
    register: async (req, res, next) => {
        try {
            await validateRegister(req.body);

            let user = await User.findOne({ email: req.body.email });
            if (user)
                throw createError.Conflict(`${req.body.email} already exists`);

            const propsToRemove = ['repeat_password'];
            user = await removePropertyObj(structuredClone(req.body), structuredClone(propsToRemove));
            const userSaved = await User.create(user);

            return res.status(200).send({
                success: true,
                message: 'Register success',
                data: userSaved
            });
        } catch (error) {
            next(error);
        }
    },

    login: async (req, res, next) => {
        try {
            await validateLogin(req.body);
            const { email, password } = req.body;

            const user = await User.findOne({ email: email });
            if (!user)
                throw createError.BadRequest(`${email} does not exists`);

            const isPassword = await user.comparePassword(password);
            if (!isPassword)
                throw createError.Unauthorized();

            const accessToken = await signAccessToken(user._id);
            return res.status(200).send({
                success: true,
                message: 'Login success',
                access_token: accessToken
            });
        } catch (error) {
            next(error);
        }
    }
}