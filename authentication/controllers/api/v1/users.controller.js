import createError from 'http-errors';
import {
    Authentication,
    User
} from '../../../models/mongo/user.model';
import isMongoId from '../../../utils/isMongoId';

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const users = await User.find().lean();
            return res.status(200).send({
                success: true,
                "users": users
            });
        } catch (error) {
            next(error);
        }
    },

    getOne: async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!isMongoId(id))
                throw createError.NotFound('User does not exist');

            const user = await User.findById(id);

            return res.status(200).send({
                success: true,
                "user": user
            })
        } catch (error) {
            next(error);
        }
    },

    destroy: async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!isMongoId(id))
                throw createError.NotFound('User does not exist');

            User.findByIdAndRemove(id, (err) => {
                if (!err) {
                    return res.status(200).send({
                        success: true,
                        message: 'Delete success'
                    });
                }
                else
                    throw createError.BadRequest('Delete failed');
            });
        } catch (error) {
            next(error);
        }
    }
}