import bcrypt from 'bcrypt'; 
import * as userRepository from "./../repositories/userRepository.js";

export async function registerUser (name : string, email : string , password : string) {

    const checkEmail = await userRepository.findEmail(email);

    if (checkEmail) {
        throw {
            name: "alreadyExists",
            message: "Email already exists"
        }
    }

    const cryptedPassword = cryptPassword(password);

    const saveUser = userRepository.registerUser(name, email, cryptedPassword);
}

export function cryptPassword (password : string) {
    const SALT = 10;
    const cryptedPassword = bcrypt.hashSync(password, SALT);
    return cryptedPassword;
}

export async function signIn (email : string , password : string) {

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

    

}