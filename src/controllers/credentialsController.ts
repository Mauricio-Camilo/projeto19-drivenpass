import { Request, Response } from "express";
import * as credentialsService from "../services/credentialsService.js";

export async function createCredentials(req: Request, res: Response) {

    const {title, url, name, password} = req.body;

    const {id} = res.locals;

    await credentialsService.createCredential(id, title, url, name, password);

    res.status(201).send("Rota de credenciais ativada");
}