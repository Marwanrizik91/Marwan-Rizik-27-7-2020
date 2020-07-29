const Joi = require('@hapi/joi');
const {emailSchema} = require('./constants')

const schema = {

    message: Joi.object({
        email: emailSchema,
        title: Joi.string().min(1).max(150).required(),
        content: Joi.string()
    })
}

module.exports = schema;