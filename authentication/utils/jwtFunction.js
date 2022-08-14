import JWT from 'jsonwebtoken';

const signAccessToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId
        }

        const options = {
            expiresIn: '10s'
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
            expiresIn: '1m'
        }

        JWT.sign(payload, process.env.REFRESH_TOKEN_SECRET, options, (err, token) => {
            if (err) reject(err);
            resolve(token);
        })
    });
}

module.exports = {
    signAccessToken,
    signRefreshToken
}