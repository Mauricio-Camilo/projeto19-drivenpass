import { Request, Response } from "express";
import * as userService from "../services/userService.js";

export async function createCredentials(req: Request, res: Response) {

    res.status(201).send("Rota de credenciais ativada");
}