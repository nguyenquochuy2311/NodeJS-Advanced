import validateRegister from '../../../validation/register';
import createError from 'http-errors';
import removePropertyObj from '../../../utils/removePropertyObj';
import {
    Authentication,
    User
} from '../../../models/mongo/user.model';

module.exports = {
    register: async (req, res, next) => {
        try {
            await validateRegister(req.body);

            const emailExists = await User.findOne({ ...req.body.email });
            if (emailExists)
                throw createError.Conflict(`${req.body.email} already exists`);

            const propsToRemove = ['repeat_password'];
            const user = await removePropertyObj(structuredClone(req.body), structuredClone(propsToRemove));
            const userSaved = await User.create(user);

            return res.status(200).send({
                message: 'Register success',
                data: userSaved
            });
        } catch (error) {
            next(createError.BadRequest(error.message));
        }
    }
}