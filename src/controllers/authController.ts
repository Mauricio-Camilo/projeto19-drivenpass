import { Request, Response } from "express";

import * as userService from "../services/userService.js";

export async function createUser (req: Request, res: Response) {

    const {name, email, password} = req.body;

    await userService.registerUser({name, email, password});
    
    res.status(201).send("Rota de cadastro ativa")
}

export async function login (req: Request, res: Response) {

    const { email, password } = req.body;

    const token = await userService.signIn({email, password});

    res.status(200).send("Rota de login ativa")

}