import { Request, Response } from "express";
import * as notesService from "../services/notesService.js";

export async function createNotes(req: Request, res: Response) {

    const {title, note} = req.body;

    const {user} = res.locals;

    const {userId} = user;

    await notesService.createNote({userId, title, note});

    res.status(201).send("Rota de notas ativada");
}

export async function getNotes (req: Request, res: Response) {

    const {id : paramsId} = req.params;

    const {user} = res.locals;

    const notes = await notesService.searchNotes(parseInt(paramsId), user.id);

    res.send(notes);
}

// export async function deleteCredentials (req: Request, res: Response) {

//     const {id : credentialId} = req.params;

//     const {user} = res.locals;

//     await credentialsService.deleteCredentials(parseInt(credentialId) , user.id);

//     res.status(200);
// }