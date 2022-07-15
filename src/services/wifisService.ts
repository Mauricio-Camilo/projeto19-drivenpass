import Cryptr from 'cryptr';

import * as wifisRepository from "./../repositories/wifisRepository.js";
import { Wifi } from '@prisma/client';

export type CreateWifiData = Omit<Wifi,"id">

export async function createWifi (wifi : CreateWifiData) {

    const checkTitle = await wifisRepository.checkTitleWifi(wifi.title);

    if (checkTitle) {
        throw {
            name: "alreadyExists",
            message: "Title already exists"
        }
    }

    const crypt = new Cryptr("password");
    const encryptedPassword = crypt.encrypt(wifi.password);

    wifisRepository.saveWifi({...wifi, password : encryptedPassword});
}

// export async function searchNotes (paramsId : number, userId : number) {

//     const checkId = await checkUserId(paramsId, userId);

//     const notes = await notesRepository.getNotes(userId);

//     return notes;
// }

// export async function checkUserId (paramsId : number, userId : number) {

//     if (paramsId !== userId) {
//          throw {
//             name: "notAuthorized",
//             message: "Invalid id"
//         }
//     }
// }

// export async function deleteNotes (paramsId : number, userId : number) {

//     const note = await notesRepository.getNoteById(paramsId);

//     if (!note) {
//         throw {
//             name: "notFound",
//             message: "Note not found"
//         }
//     }

//     if (note.userId !== userId) {
//         throw {
//             name: "notAuthorized",
//             message: "Note not belong to user"
//         }
//     }

//     await notesRepository.deleteNotes(note.id);
// }