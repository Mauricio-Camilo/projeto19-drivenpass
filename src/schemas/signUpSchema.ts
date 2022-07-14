import joi from 'joi';

//FAZER A TIPAGEM DO JOI

const signUpSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required().pattern(/^[a-zA-Z0-9]{10,}$/)
});


export default signUpSchema;