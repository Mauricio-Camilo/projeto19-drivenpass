import prisma from "../config/database.js";
import { CreateCardData } from "../services/cardsService.js";

export async function checkTitleCard (title : string) {
    const checkTitle =  prisma.card.findUnique({where : {title}})
    return checkTitle;
}

export async function saveCard (card : CreateCardData) {
    await prisma.card.create({data : card});
}

export async function getCards (userId : number) {
    const cards = await prisma.card.findMany({where : {userId}})
    return cards;
}

export async function getCardById (id : number) {
    const card = await prisma.card.findMany({where : {id}});
    return card[0];
}

export async function deleteCards (id : number) {
    await prisma.card.delete({where : {id}});
}