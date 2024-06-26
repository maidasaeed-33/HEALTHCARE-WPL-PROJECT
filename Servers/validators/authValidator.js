const Joi = require('joi');

const validateSignup = (data) => {
  const schema = Joi.object({
    name: Joi.string().name(),
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .required()
      .messages({
        'string.pattern.base': 'Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
      }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
      'any.only': 'Confirm password does not match password',
    }),
  });

  return schema.validate(data);
};

const validateLogin = (data) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  return schema.validate(data);
};

module.exports = { validateSignup, validateLogin };
