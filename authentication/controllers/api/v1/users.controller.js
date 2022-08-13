import createError from 'http-errors';
import {
    Authentication,
    User
} from '../../../models/mongo/user.model';

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const users = await User.find().lean();
            return res.status(200).send({
                "users": users
            });
        } catch (error) {
            next(createError.BadRequest(error.message));
        }
    }
}