import { Request, Response } from "express";
import * as cardsService from "../services/cardsService.js";

export async function createCard(req: Request, res: Response) {

    const {title, name, number, securityCode,
    expirationDate, password, isVirtual, type } = req.body;

    const {user} = res.locals;

    const userId = user.id;

    await cardsService.registerCard({userId, title, name, number, securityCode,
        expirationDate, password, isVirtual, type});

    res.status(201).send("Card created");
}   

export async function getCards (req: Request, res: Response) {

    const {id : paramsId} = req.params;

    const {user} = res.locals;

    const cards = await cardsService.searchCards(parseInt(paramsId), user.id);

    res.send(cards);
}

export async function deleteCard (req: Request, res: Response) {

    const {id : credentialId} = req.params;

    const {user} = res.locals;

    await cardsService.deleteCard(parseInt(credentialId) , user.id);

    res.status(200).send("Card deleted");
}