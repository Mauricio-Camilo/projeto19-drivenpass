import { Request, Response } from "express";
import * as wifisService from "../services/wifisService.js";

export async function createWifi(req: Request, res: Response) {

    const {title, name, password} = req.body;

    const {user} = res.locals;

    const {userId} = user;

    await wifisService.createWifi({userId, title, name, password});

    res.status(201).send("Rota de wifis ativada");
}   

export async function getWifis (req: Request, res: Response) {

    const {id : paramsId} = req.params;

    const {user} = res.locals;

    const wifis = await wifisService.searchWifis(parseInt(paramsId), user.id);

    res.send(wifis);
}

// export async function deleteWifi (req: Request, res: Response) {

//     const {id : credentialId} = req.params;

//     const {user} = res.locals;

//     await notesService.deleteNotes(parseInt(credentialId) , user.id);

//     res.sendStatus(200);
// }