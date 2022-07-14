import bcrypt from 'bcrypt'; 
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as userRepository from "./../repositories/userRepository.js";
import { LoginRequestBody } from '../controllers/authController.js';

dotenv.config();


export type UserData = Omit<userRepository.GetUserData, "id"|"createdAt">;

export async function registerUser (user : UserData) {

    const {name, email, password} = user;

    const checkEmail = await userRepository.findEmail(email);

    console.log(checkEmail);

    if (checkEmail) {
        throw {
            name: "alreadyExists",
            message: "Email already exists"
        }
    }

    const cryptedPassword = cryptPassword(password);

    const saveUser = userRepository.registerUser(user);
}

export function cryptPassword (password : string) {
    const SALT = 10;
    const cryptedPassword = bcrypt.hashSync(password, SALT);
    return cryptedPassword;
}

export async function signIn (login : LoginRequestBody) {

    const { email , password } = login

    const user = await userRepository.findEmail(email);

    if (!user) {
        throw {
            name: "notFound",
            message: "Email not found"
        }
    }

    if (!bcrypt.compareSync(password, user.password)) {
        throw {
            name: "notAuthorized",
            message: "Incorrect password"
        }
    }

    const token = jwt.sign({ id : user.id }, process.env.SECRET, { expiresIn: 30000 });

    await userRepository.registerToken(user.id,token);

}