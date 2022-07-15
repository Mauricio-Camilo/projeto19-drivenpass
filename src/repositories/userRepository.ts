import prisma from "./../config/database.js"
import { CreateUserData } from "./../services/userService.js";
import { CreateSessionData } from "./../services/userService.js";


export async function findEmail (email : string) {
    const users = await prisma.user.findUnique({where : {email}});
    return users;
}

export async function registerUser (user : CreateUserData) {
  await prisma.user.create({data : user})
}

export async function registerToken (login : CreateSessionData) {
    await prisma.session.create({data : login})

}