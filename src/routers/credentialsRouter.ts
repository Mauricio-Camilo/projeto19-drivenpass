import { Router } from "express";
import { createCredentials } from "../controllers/credentialsController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/tokenValidation.js";
import credentialsSchema from "../schemas/credentialsSchema.js";

const credentialsRouter = Router();

credentialsRouter.post("/credentials",validateToken, 
validateSchema(credentialsSchema), createCredentials);

export default credentialsRouter; 