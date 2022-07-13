import joi from 'joi';

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required().pattern(/^[a-zA-Z0-9]{10,}$/)
});

export default loginSchema;