import prisma from "../config/database.js";
import { CreateWifiData } from "../services/wifisService.js";
import { Wifi } from '@prisma/client';


export async function checkTitleWifi (title : string) {
    const checkTitle =  prisma.wifi.findUnique({where : {title}})
    return checkTitle;
}

export async function saveWifi (wifis : CreateWifiData) {
    await prisma.wifi.create({data : wifis});
}

export async function getWifis (userId : number) {
    const wifis = await prisma.wifi.findMany({where : {userId}})
    return wifis;
}

export async function getWifiById (id : number) {

    const note = await prisma.wifi.findMany({where : {id}});
    return note[0];
}

export async function deleteWifi (id : number) {
    await prisma.wifi.delete({where : {id}});
}