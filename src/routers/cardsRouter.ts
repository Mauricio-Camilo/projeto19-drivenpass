import { Router } from "express";
import { createCard } from "../controllers/cardsController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/tokenValidation.js";
import cardsSchema from "../schemas/cardSchema.js";

const cardsRouter = Router();

cardsRouter.post("/cards",validateToken, 
validateSchema(cardsSchema),createCard);

// cardsRouter.get("/cards/:id",validateToken);

// cardsRouter.delete("/cards/:id",validateToken);

export default cardsRouter; 