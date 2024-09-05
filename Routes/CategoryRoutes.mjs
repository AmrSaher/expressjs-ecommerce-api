import { Router } from "express";
import passport from "passport";
import AdminMiddleware from "../Middlewares/AdminMiddleware.mjs";
import { checkSchema } from "express-validator";
import CreateCategoryValidationSchema from "../Validation/CreateCategoryValidationSchema.mjs";
import * as CategoriesController from "../Controllers/CategoriesController.mjs";

const router = Router();

router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    AdminMiddleware,
    checkSchema(CreateCategoryValidationSchema),
    CategoriesController.createCategory
);

export default router;
