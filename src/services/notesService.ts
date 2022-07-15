import * as notesRepository from "./../repositories/notesRepository.js";

import { Note } from '@prisma/client';

export type CreateNoteData = Omit<Note,"id">

export async function createNote (note : CreateNoteData) {

    const checkTitle = await notesRepository.checkTitleNote(note.title);

    if (checkTitle) {
        throw {
            name: "alreadyExists",
            message: "Title already exists"
        }
    }

    notesRepository.saveNote(note);
}

export async function searchNotes (paramsId : number, userId : number) {

    const checkId = await checkUserId(paramsId, userId);

    const notes = await notesRepository.getNotes(userId);

    return notes;
}

export async function checkUserId (paramsId : number, userId : number) {

    if (paramsId !== userId) {
         throw {
            name: "notAuthorized",
            message: "Invalid id"
        }
    }
}

export async function deleteNotes (paramsId : number, userId : number) {

    const note = await notesRepository.getNoteById(paramsId);

    if (!note) {
        throw {
            name: "notFound",
            message: "Note not found"
        }
    }

    if (note.userId !== userId) {
        throw {
            name: "notAuthorized",
            message: "Note not belong to user"
        }
    }

    await notesRepository.deleteNotes(note.id);
}