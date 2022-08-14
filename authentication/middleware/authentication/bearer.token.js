import createHttpError from "http-errors";
import JWT from 'jsonwebtoken';
import {
    Authentication,
    User
} from '../../models/mongo/user.model';

const verifyAccessToken = async (req, res, next) => {

    if (!req.headers['Authorization'] && !req.headers['authorization'])
        return next(createHttpError.Unauthorized());

    const valueHeader = req.headers['Authorization'] ?? req.headers['authorization'];
    const nameToken = valueHeader.split(' ')[0];
    if (nameToken !== 'Bearer')
        return next(createHttpError.Unauthorized());

    const token = valueHeader.split(' ')[1];

    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
            if (err.name === 'TokenExpiredError')
                return next(createHttpError.Unauthorized('Token expired'));
            return next(createHttpError.Unauthorized(err.message));
        }

        User.findById(payload.userId)
            .then(async (user) => {
                if (!user)
                    return next(createHttpError.Unauthorized());
                next();
            })
            .catch(error => {
                return next(error);
            });
    });
};

const verifyRefreshToken = async (refreshToken) => {
    return new Promise((resolve, reject) => {
        JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
            if (err) reject(err);

            User.findById(payload.userId)
                .then(async (user) => {
                    if (!user)
                        reject(null);
                    resolve(user._id);
                })
                .catch(error => {
                    return reject(error);
                });
        });
    });
};

module.exports = {
    verifyAccessToken,
    verifyRefreshToken
}