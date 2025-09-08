const Joi = require('joi');

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(100).required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('STUDENT', 'TEACHER', 'ADMIN').required(),
  class: Joi.number().optional(),
  name: Joi.string().required()
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const logoutSchema = Joi.object({
  username: Joi.string().required()
});

module.exports = { registerSchema, loginSchema ,logoutSchema };
