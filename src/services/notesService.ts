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

// export async function searchNotes (paramsId : number, userId : number) {

//     const checkId = await checkUserId(paramsId, userId);

//     const credentials = await credentialRepository.getCredentials(userId);

//     const credentialsDecryptedPassword : Credential = await decryptPasswords(credentials);

//     return credentialsDecryptedPassword;
// }

export async function checkUserId (paramsId : number, userId : number) {

    if (paramsId !== userId) {
         throw {
            name: "notAuthorized",
            message: "Invalid id"
        }
    }
}

// export async function deleteNotes (paramsId : number, userId : number) {

//     const credential = await credentialRepository.getCredentialById(paramsId);

//     if (!credential) {
//         throw {
//             name: "notFound",
//             message: "Credential not found"
//         }
//     }

//     if (credential.userId !== userId) {
//         throw {
//             name: "notAuthorized",
//             message: "Credential not belong to user"
//         }
//     }

//     await credentialRepository.deleteCredentials(credential.id);
// }