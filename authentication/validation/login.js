import Joi from "joi";

const schema = Joi.object().keys({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'vn'] } }).required(),

    password: Joi.string().required()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})

async function validateLogin(request) {
    return await schema.validateAsync(request);
}

module.exports = validateLogin;