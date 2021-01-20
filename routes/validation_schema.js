const Joi = require('joi');

const authSchema = Joi.object({
    firstName: Joi.string().required(), 
    lastName: Joi.string().required(),
    email: Joi.string().email().required(), 
    password: Joi.string().min(7).required(),
    confirmPassword: Joi.ref('password'),
    role: Joi.any().optional()
});

const projectSchema = Joi.object({
    creatorID: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    stage: Joi.string().required(),
    types: Joi.required(),
    interests: Joi.required()
});

module.exports = {
    authSchema,
    projectSchema
}