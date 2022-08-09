import validateRegister from "../../../validation/register";
import createError from 'http-errors';

module.exports = {
    register: async (req, res, next) => {
        try {
            await validateRegister(req.body);
            const response = structuredClone(req.body);
            return res.status(200).send({
                message: 'Register success',
                data: response
            });
        } catch (error) {
            next(createError.BadRequest(error.message));
        }
    }
}