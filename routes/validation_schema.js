const Joi = require('joi');

const authSchema = Joi.object({
    firstName: Joi.string().required(), 
    lastName: Joi.string().required(),
    email: Joi.string().email().required(), 
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.ref('password'),
    role: Joi.any().optional()
});

module.exports = {
    authSchema,
}