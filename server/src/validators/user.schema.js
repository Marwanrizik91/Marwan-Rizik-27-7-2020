const Joi = require('@hapi/joi');
const { emailSchema , lastNameSchema, firstNameSchema } = require('./constants')

const schema = {

    addUser: Joi.object({
        email: emailSchema.required(),
        firstName: firstNameSchema.required(),
        lastName: lastNameSchema.required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        confirmPassword: Joi.any().valid(Joi.ref('password')).required()
    }),

    editUser: Joi.object({
        firstName: firstNameSchema.required(),
        lastName: lastNameSchema.required()
    })
    
}

module.exports = schema;