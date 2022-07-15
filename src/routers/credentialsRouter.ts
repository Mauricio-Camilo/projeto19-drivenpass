import { Router } from "express";
import { createCredentials, deleteCredentials, getCredentials } from "../controllers/credentialsController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/tokenValidation.js";
import credentialsSchema from "../schemas/credentialsSchema.js";

const credentialsRouter = Router();

credentialsRouter.post("/credentials",validateToken, 
validateSchema(credentialsSchema), createCredentials);

credentialsRouter.get("/credentials/:id",validateToken, getCredentials);

credentialsRouter.delete("/credentials/:id",validateToken, deleteCredentials);

export default credentialsRouter; 