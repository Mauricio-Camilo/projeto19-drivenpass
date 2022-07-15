import { Router } from "express";
import { createNotes, deleteNotes, getNotes } from "../controllers/notesController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/tokenValidation.js";
import notesSchema from "../schemas/notesSchema.js";

const notesRouter = Router();

notesRouter.post("/notes",validateToken, 
validateSchema(notesSchema), createNotes);

notesRouter.get("/notes/:id",validateToken, getNotes);

notesRouter.delete("/notes/:id",validateToken, deleteNotes);

export default notesRouter; 