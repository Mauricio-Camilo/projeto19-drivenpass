import { UserData } from "../services/userService.js";
import db from "./../config/database.js"

export interface GetUserData {
    id : number;
    name : string;
    email : string;
    password : string;
    createdAt : any; // verificar
}

export async function findEmail (email : string) {
    const users = await db.query<GetUserData>(
        `SELECT * FROM users WHERE email = $1`, [email]
    );
    return users.rows[0];
}

export async function registerUser (user : UserData) {
    const {name, email, password} = user;
    await db.query(
        `INSERT INTO users (name, email, password) 
        VALUES ($1, $2, $3)` , [name, email, password]
    )
}

export async function registerToken (userId : number, token : string) {
    await db.query(
        `INSERT INTO sessions ("userId", token) 
        VALUES ($1, $2)` , [userId, token]
    )
}