import { Router } from "express";
import { createWifi } from "../controllers/wifisController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/tokenValidation.js";
import wifiSchema from "../schemas/wifiSchema.js";

const wifiRouter = Router();

wifiRouter.post("/wifis",validateToken, 
validateSchema(wifiSchema), createWifi);

// wifiRouter.get("/wifis/:id",validateToken, getwifis);

// wifiRouter.delete("/wifis/:id",validateToken, deletewifis);

export default wifiRouter; 