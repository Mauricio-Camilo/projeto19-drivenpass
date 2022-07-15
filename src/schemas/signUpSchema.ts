import joi from 'joi';
import { CreateUserData } from '../services/userService';

const signUpSchema = joi.object<CreateUserData>({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required().pattern(/^[a-zA-Z0-9]{10,}$/)
});

export default signUpSchema;