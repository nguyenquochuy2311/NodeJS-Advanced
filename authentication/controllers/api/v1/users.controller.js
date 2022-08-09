import createError from 'http-errors';

module.exports = {
    register: async (req, res, next) => {
        try {
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