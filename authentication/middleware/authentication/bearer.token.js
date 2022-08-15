import JWT from 'jsonwebtoken';
import createHttpError from "http-errors";
import redisClient from '../../config/redis.connection';
import axios from 'axios';
import {
    Authentication,
    User
} from '../../models/mongo/user.model';
import jwtDecode from 'jwt-decode';

const verifyAccessToken = async (req, res, next) => {
    if (!req.headers['Authorization'] && !req.headers['authorization'])
        return next(createHttpError.Unauthorized());

    const valueHeader = req.headers['Authorization'] ?? req.headers['authorization'];
    const nameToken = valueHeader.split(' ')[0];
    if (nameToken !== 'Bearer')
        return next(createHttpError.Unauthorized());

    const token = valueHeader.split(' ')[1];

    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
        if (err) {
            if (err.name === 'TokenExpiredError')
                return next(createHttpError.Unauthorized('Token expired'));
            return next(createHttpError.Unauthorized(err.message));
        }

        const user = User.findById(payload.userId);
        if (user) {
            return next();
        }
    });

    return next(createHttpError.Unauthorized());
};

const verifyRefreshToken = async (refreshToken) => {
    return new Promise((resolve, reject) => {
        JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
            if (err) return reject(err);

            User.findById(payload.userId)
                .then(async (user) => {
                    if (!user)
                        return reject(createHttpError.Unauthorized());

                    //still get payload redis
                    await redisClient.get(payload.userId, async (err, reply) => {
                        if (err) return reject(err);
                        if (refreshToken === reply) return resolve(payload);
                        return reject(createHttpError.Unauthorized());
                    });

                    return resolve(payload);
                })
                .catch(error => {
                    reject(error);
                });
        });
    });
};

const autoRefreshAccessToken = async (req, res, next) => {
    if (!req.headers['Authorization'] && !req.headers['authorization'])
        return next(createHttpError.Unauthorized());

    const valueHeader = req.headers['Authorization'] ?? req.headers['authorization'];
    const nameToken = valueHeader.split(' ')[0];
    if (nameToken !== 'Bearer')
        return next(createHttpError.Unauthorized());

    const token = valueHeader.split(' ')[1];

    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err_access, payload_access) => {
        if (err_access) {
            if (!payload_access || payload_access === undefined || err_access.name === 'TokenExpiredError') {
                /* Auto refresh token */
                const decodeToken = jwtDecode(token);
                const userId = decodeToken.userId;
                const user = await User.findById(userId);
                if (user) {
                    redisClient.get(userId, async (err, reply) => {
                        if (err) return next(err);
                        JWT.verify(reply, process.env.REFRESH_TOKEN_SECRET, async (err_refresh, payload_refresh) => {
                            if (err_refresh) next(createHttpError.Unauthorized(err_refresh.message))
                            if (userId === payload_refresh.userId) {
                                return next();
                            }
                        });
                    });
                }
            } else {
                return next(createHttpError.Unauthorized(err_access.message));
            }
        }
    });

    return next(createHttpError.Unauthorized());
};

module.exports = {
    verifyAccessToken,
    verifyRefreshToken,
    autoRefreshAccessToken
}