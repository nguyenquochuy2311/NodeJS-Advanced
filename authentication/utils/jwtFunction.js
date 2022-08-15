import JWT from 'jsonwebtoken';
import redisClient from '../config/redis.connection';

const EXPIRES_ACCESS_TOKEN = '10s';
const EXPIRES_REFRESH_TOKEN = '10m';
const EXPIRES_REDIS = 60 * 60;//1h

const signAccessToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId
        }

        const options = {
            expiresIn: EXPIRES_ACCESS_TOKEN
        }

        JWT.sign(payload, process.env.ACCESS_TOKEN_SECRET, options, (err, token) => {
            if (err) reject(err);
            resolve(token);
        })
    });
}

const signRefreshToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId
        }

        const options = {
            expiresIn: EXPIRES_REFRESH_TOKEN
        }

        JWT.sign(payload, process.env.REFRESH_TOKEN_SECRET, options, (err, token) => {
            if (err) reject(err);
            redisClient.set(userId.toString(), token, 'EX', EXPIRES_REDIS, (err, reply) => {
                if (err) reject(err);
            })
            resolve(token);
        })
    });
}

module.exports = {
    signAccessToken,
    signRefreshToken
}