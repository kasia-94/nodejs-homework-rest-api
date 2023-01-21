const Joi = require("joi");

const contactAddSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const contactUpdateStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const registerUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required().min(8),
});

module.exports = {
  contactAddSchema,
  contactUpdateStatusSchema,
  registerUserSchema,
};
