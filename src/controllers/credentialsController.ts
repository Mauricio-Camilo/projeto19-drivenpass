import { Request, Response } from "express";
import * as credentialsService from "../services/credentialsService.js";

export async function createCredentials(req: Request, res: Response) {

    const {title, url, name, password} = req.body;

    const {user} = res.locals;

    const {userId} = user;

    await credentialsService.createCredential({userId, title, url, name, password});

    res.status(201).send("Credential created");
}

export async function getCredentials (req: Request, res: Response) {

    const {id : paramsId} = req.params;

    const {user} = res.locals;

    const credentials  = await credentialsService.searchCredentials(parseInt(paramsId), user.id);

    res.send(credentials);
}

export async function deleteCredentials (req: Request, res: Response) {

    const {id : credentialId} = req.params;

    const {user} = res.locals;

    await credentialsService.deleteCredentials(parseInt(credentialId) , user.id);

    res.status(200).send("Credential deleted");
}
