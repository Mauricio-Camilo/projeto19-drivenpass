import { Request, Response } from "express";
import * as notesService from "../services/notesService.js";

export async function createNotes(req: Request, res: Response) {

    const {title, note} = req.body;

    const {user} = res.locals;

    const {userId} = user;

    await notesService.createNote({userId, title, note});

    res.status(201).send("Rota de notas ativada");
}