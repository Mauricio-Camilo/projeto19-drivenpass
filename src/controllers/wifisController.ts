import { Request, Response } from "express";
import * as wifisService from "../services/wifisService.js";

export async function createWifi(req: Request, res: Response) {

    const {title, name, password} = req.body;

    const {user} = res.locals;

    const userId = user.id;

    await wifisService.createWifi({userId, title, name, password});

    res.status(201).send("Wifi created");
}   

export async function getWifis (req: Request, res: Response) {

    const {id : paramsId} = req.params;

    const {user} = res.locals;

    const wifis = await wifisService.searchWifis(parseInt(paramsId), user.id);

    res.send(wifis);
}

export async function deleteWifi (req: Request, res: Response) {

    const {id : wifiId} = req.params;

    const {user} = res.locals;

    await wifisService.deleteWifis(parseInt(wifiId) , user.id);

    res.status(200).send("Wifi deleted");
}