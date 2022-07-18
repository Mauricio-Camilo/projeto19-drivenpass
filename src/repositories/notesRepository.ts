import prisma from "../config/database.js";
import { CreateNoteData } from "../services/notesService.js";

export async function checkTitleNote (title : string) {
    const checkTitle =  prisma.note.findUnique({where : {title}})
    return checkTitle;
}

export async function saveNote (credentials : CreateNoteData) {
    await prisma.note.create({data : credentials});
}

export async function getNotes (userId : number) {
    const notes = await prisma.note.findMany({where : {userId}})
    return notes;
}

export async function getNoteById (id : number) {

    const note = await prisma.note.findMany({where : {id}});
    return note[0];
}

export async function deleteNotes (id : number) {
    await prisma.note.delete({where : {id}});
}