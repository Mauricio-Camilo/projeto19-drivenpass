import { Request, Response } from "express";
import * as credentialsService from "../services/credentialsService.js";

export async function createCredentials(req: Request, res: Response) {

    const {title, url, name, password} = req.body;

    const {user} = res.locals;

    await credentialsService.createCredential(user.id, title, url, name, password);

    res.status(201).send("Rota de credenciais ativada");
}

export async function getCredentials (req: Request, res: Response) {

    const {id : paramsId} = req.params;

    const {user} = res.locals;

    const credentials = await credentialsService.searchCredentials(parseInt(paramsId), user.id);

    res.send(credentials);
}