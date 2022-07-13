import db from "./../config/database.js"

export async function findEmail (email : string) {
    const users = await db.query(
        `SELECT * FROM users WHERE email = $1`, [email]
    );
    return users.rows[0];
}

export async function registerUser (name : string, email : string , cryptPassword : string) {
    await db.query(
        `INSERT INTO users (name, email, password) 
        VALUES ($1, $2, $3)` , [name, email, cryptPassword]
    )
}