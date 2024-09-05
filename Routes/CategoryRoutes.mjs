import { Router } from "express";
import passport from "passport";
import AdminMiddleware from "../Middlewares/AdminMiddleware.mjs";
import { checkSchema } from "express-validator";
import CreateCategoryValidationSchema from "../Validation/CreateCategoryValidationSchema.mjs";
import * as CategoriesController from "../Controllers/CategoriesController.mjs";
import IDValidationSchema from "../Validation/IDValidationSchema.mjs";

const router = Router();

// Endpoints
router.get("/", CategoriesController.getCategories);
router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    AdminMiddleware,
    checkSchema(CreateCategoryValidationSchema),
    CategoriesController.createCategory
);
router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    AdminMiddleware,
    checkSchema(IDValidationSchema),
    CategoriesController.deleteCategory
);
router.put(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    AdminMiddleware,
    checkSchema(IDValidationSchema),
    checkSchema(CreateCategoryValidationSchema),
    CategoriesController.updateCategory
);

export default router;
