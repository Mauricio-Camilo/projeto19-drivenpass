import {Request, Response, NextFunction} from "express";
import db from "./../config/database.js"

export async function validateToken (req: Request, res: Response, next : NextFunction) {

const { authorization } = req.headers;

    const token = authorization?.replace('Bearer', '').trim();
    if (!token) {
        throw {
            name: "notFound",
            message: "Inexistent Token"
        }
    }
    
    const session = await db.query(
        `SELECT * FROM sessions WHERE token = $1`, [token]);

    if (session.rowCount === 0) {
        throw {
            name: "notAuthorized",
            message: "Invalid Token"
        }
    }

    const user = await db.query(
         `SELECT * FROM users WHERE id = $1`, [session.rows[0].userId]
    )
    
    if (!user) {
        throw {
            name: "notFound",
            message: "User not found"
        }
    }

    res.locals.id = user.rows[0].id;
     
    next();
    
    }