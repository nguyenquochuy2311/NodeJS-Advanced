import {
    Authentication,
    User
} from '../../../models/mongo/user.model';
import createError from 'http-errors';
import validateRegister from '../../../validation/register';
import validateLogin from '../../../validation/login';
import removePropertyObj from '../../../utils/removePropertyObj';
import { signAccessToken, signRefreshToken } from '../../../utils/jwtFunction';
import { verifyRefreshToken } from '../../../middleware/authentication/bearer.token';

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
            const refreshToken = await signRefreshToken(user._id);
            return res.status(200).send({
                success: true,
                message: 'Login success',
                access_token: accessToken,
                refresh_token: refreshToken
            });
        } catch (error) {
            next(error);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const { refresh_token } = req.body;
            if (!refresh_token)
                throw createError.BadRequest('refresh_token is required');

            const { userId } = await verifyRefreshToken(refresh_token);

            const newAccessToken = await signAccessToken(userId);
            const newRefreshToken = await signRefreshToken(userId);

            return res.status(200).send({
                success: true,
                message: 'Refresh token success',
                access_token: newAccessToken,
                refresh_token: newRefreshToken
            });
        } catch (error) {
            next(error);
        }
    }
}