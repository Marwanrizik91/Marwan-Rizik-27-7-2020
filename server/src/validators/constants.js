const Joi = require('@hapi/joi');

exports.idSchema = Joi.alternatives(Joi.string(), Joi.number())
exports.emailSchema = Joi.string().email().required()
exports.firstNameSchema = Joi.string().min(1).max(50)
exports.lastNameSchema = Joi.string().min(1).max(50).required()