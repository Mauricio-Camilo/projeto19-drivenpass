import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as userRepository from "./../repositories/userRepository.js";
import { User } from "@prisma/client";
import { Session } from "@prisma/client";

dotenv.config();

export type CreateUserData = Omit<User, "id"|"createdAt">;
export type CreateLoginData = Omit<User, "id"|"name"|"createdAt">;
export type CreateSessionData = Omit<Session, "id"|"createdAt">;

export async function registerUser (user : CreateUserData) {

    const {name, email, password} = user;

    const checkEmail = await userRepository.findEmail(email);

    if (checkEmail) {
        throw {
            name: "alreadyExists",
            message: "Email already exists"
        }
    }

    const cryptedPassword = cryptPassword(password);

    await userRepository.registerUser({...user, password : cryptedPassword});
}

export function cryptPassword (password : string) {
    const SALT = 10;
    const cryptedPassword = bcrypt.hashSync(password, SALT);
    return cryptedPassword;
}

export async function signIn (login : CreateLoginData) {

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

    const createToken : CreateSessionData = {
        userId : user.id,
        token
    }
    await userRepository.registerToken(createToken);

    return token;
}