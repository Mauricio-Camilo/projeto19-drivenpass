import { Request, Response } from "express";

import * as userService from "../services/userService.js";

export interface LoginRequestBody {
    email : string;
    password : string;
}

export async function createUser (req: Request, res: Response) {

    const {name, email, password} : userService.UserData = req.body;

    await userService.registerUser(req.body);
    
    res.status(201).send("Rota de cadastro ativa")
}

export async function login (req: Request, res: Response) {

    const { email, password } : LoginRequestBody  = req.body;

    const token = await userService.signIn(req.body);

    res.status(200).send("Rota de login ativa")

}