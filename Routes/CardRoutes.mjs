import { Router } from "express";
import passport from "passport";
import * as CardsController from "../Controllers/CardsController.mjs";
import { checkSchema } from "express-validator";
import CreateCardValidationSchema from "../Validation/CreateCardValidationSchema.mjs";
import IDValidationSchema from "../Validation/IDValidationSchema.mjs";

const router = Router();

// Middlewares
router.use(passport.authenticate("jwt", { session: false }));

// Endpoints
router.get("/", CardsController.getCards);
router.post(
    "/",
    checkSchema(CreateCardValidationSchema),
    CardsController.createCard
);
router.put(
    "/:id",
    checkSchema(IDValidationSchema),
    checkSchema(CreateCardValidationSchema),
    CardsController.updateCard
);
router.delete(
    "/:id",
    checkSchema(IDValidationSchema),
    CardsController.deleteCard
);

export default router;
