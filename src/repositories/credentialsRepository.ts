import prisma from "../config/database.js";
import { CreateCredentialData } from "../services/credentialsService.js";
import { Credential } from '@prisma/client';


export async function checkTitleCredential (title : string) {
    const checkTitle =  prisma.credential.findUnique({where : {title}})
    return checkTitle;
}

export async function saveCredential (credentials : CreateCredentialData) {
    console.log("Chegou aqui");
    await prisma.credential.create({data : credentials});
}

export async function getCredentials (userId : number) {
    const credentials = await prisma.credential.findMany({where : {userId}})
    return credentials;
}

export async function getCredentialById (id : number) {

    const credential = await prisma.credential.findMany({where : {id}});
    return credential[0];
}

export async function deleteCredentials (id : number) {
    await prisma.credential.delete({where : {id}});
}

