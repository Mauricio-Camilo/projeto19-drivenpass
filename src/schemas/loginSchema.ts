import joi from 'joi';
import { CreateLoginData } from '../services/userService';

const loginSchema = joi.object<CreateLoginData>({
  email: joi.string().email().required(),
  password: joi.string().required().pattern(/^[a-zA-Z0-9]{10,}$/)
});

export default loginSchema;