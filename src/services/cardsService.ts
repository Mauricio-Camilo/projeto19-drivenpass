import Cryptr from 'cryptr';

import * as cardsRepository from "./../repositories/cardsRepository.js";
import { Card } from "@prisma/client";

export type CreateCardData = Omit<Card, "id">;

export async function registerCard (card : CreateCardData) {

    const {userId, title, name, number, securityCode,
        expirationDate, password, isVirtual, type } = card;

    const checkTitle = await cardsRepository.checkTitleCard(title);

    if (checkTitle) {
        throw {
            name: "alreadyExists",
            message: "Title already exists"
        }
    }
    const crypt = new Cryptr("password");
    const encryptedPassword = crypt.encrypt(password);

    cardsRepository.saveCard({...card, password : encryptedPassword});
}

export async function searchCards (paramsId : number, userId : number) {

    const checkId = await checkUserId(paramsId, userId);

    const cards = await cardsRepository.getCards(userId);

    const cardsDecryptedPassword : Card = await decryptPasswords(cards);

    return cardsDecryptedPassword;
}

export async function checkUserId (paramsId : number, userId : number) {

    if (paramsId !== userId) {
         throw {
            name: "notAuthorized",
            message: "Invalid id"
        }
    }
}

export async function decryptPasswords (cards) {

    const crypt = new Cryptr("password");
    cards.forEach(card => {
       const password = crypt.decrypt(card.password);
       card.password = password; 
    });

    return cards;
}

export async function deleteCard (paramsId : number, userId : number) {

    // const credential = await credentialRepository.getCredentialById(paramsId);

    // if (!credential) {
    //     throw {
    //         name: "notFound",
    //         message: "Credential not found"
    //     }
    // }

    // if (credential.userId !== paramsId) {
    //     throw {
    //         name: "notAuthorized",
    //         message: "Credential not belong to user"
    //     }
    // }

    // await credentialRepository.deletecards(credential.id);
}
