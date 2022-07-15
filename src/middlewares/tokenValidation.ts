import {Request, Response, NextFunction} from "express";
import prisma from "./../config/database.js"

export async function validateToken (req: Request, res: Response, next : NextFunction) {

const { authorization } = req.headers;

    const token = authorization?.replace('Bearer', '').trim();
    if (!token) {
        throw {
            name: "notFound",
            message: "Inexistent Token"
        }
    }

    const session = await prisma.session.findUnique({where : {token}})
    
    if (!session) {
        throw {
            name: "notAuthorized",
            message: "Invalid Token"
        }
    }

    const user = await prisma.session.findUnique({where : {id : session.userId}})

    if (!user) {
        throw {
            name: "notFound",
            message: "User not found"
        }
    }

    res.locals.user = user;
     
    next();
    
    }