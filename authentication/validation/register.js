import Joi from "joi";

const schema = Joi.object().keys({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'vn'] } }).required(),

    password: Joi.string().required()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    repeat_password: Joi.ref('password'),

    first_name: Joi.string().required(),
    last_name: Joi.string()
})
    .with('password', 'repeat_password');

async function validateRegister(request) {
    return await schema.validateAsync(request);
    // return new Promise((resolve, reject) => {
    //     try {
    //         resolve(schema.validateAsync(request));
    //     } catch (error) {
    //         reject(error);
    //     }
    // });
}

module.exports = validateRegister;
// export default validateRegister;