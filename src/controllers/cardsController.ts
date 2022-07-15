import { Request, Response } from "express";
import * as cardsService from "../services/cardsService.js";

export async function createCard(req: Request, res: Response) {

    const {title, name, number, securityCode,
    expirationDate, password, isVirtual, type } = req.body;

    const {user} = res.locals;

    const {userId} = user;

    await cardsService.registerCard({userId, title, name, number, securityCode,
        expirationDate, password, isVirtual, type});

    res.status(201).send("Rota de cards ativada");
}   

// export async function getNotes (req: Request, res: Response) {

//     const {id : paramsId} = req.params;

//     const {user} = res.locals;

//     const notes = await notesService.searchNotes(parseInt(paramsId), user.id);

//     res.send(notes);
// }

// export async function deleteNotes (req: Request, res: Response) {

//     const {id : credentialId} = req.params;

//     const {user} = res.locals;

//     await notesService.deleteNotes(parseInt(credentialId) , user.id);

//     res.sendStatus(200);
// }