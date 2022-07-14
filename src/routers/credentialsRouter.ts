import { Router } from "express";
import { createCredentials } from "../controllers/credentialsController.js";
import { validateToken } from "../middlewares/tokenValidation.js";

const credentialsRouter = Router();

credentialsRouter.post("/credentials",validateToken, createCredentials);

export default credentialsRouter; 