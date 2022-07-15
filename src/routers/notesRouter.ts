import { Router } from "express";
import { createNotes } from "../controllers/notesController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/tokenValidation.js";
import notesSchema from "../schemas/notesSchema.js";

const notesRouter = Router();

notesRouter.post("/notes",validateToken, 
validateSchema(notesSchema), createNotes);

// notesRouter.get("/credentials/:id",validateToken, getCredentials);

// notesRouter.delete("/credentials/:id",validateToken, deleteCredentials);

export default notesRouter; 