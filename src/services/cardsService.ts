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
