import prisma from "../config/database.js";
import { CreateNoteData } from "../services/notesService.js";
import { Note } from '@prisma/client';


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

// export async function getCredentialById (id : number) {

//     const credential = await prisma.credential.findMany({where : {id}});
//     return credential[0];
// }

// export async function deleteCredentials (id : number) {
//     await prisma.credential.delete({where : {id}});
// }