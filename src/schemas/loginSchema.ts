import joi from 'joi';

//FAZER A TIPAGEM DO JOI
const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required().pattern(/^[a-zA-Z0-9]{10,}$/)
});

export default loginSchema;