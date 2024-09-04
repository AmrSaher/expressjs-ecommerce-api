import { Router } from "express";
import passport from "passport";
import * as ProductsController from "../Controllers/ProductsController.mjs";
import AdminMiddleware from "../Middlewares/AdminMiddleware.mjs";
import { checkSchema } from "express-validator";
import CreateProductValidationSchema from "../Validation/CreateProductValidationSchema.mjs";
import IDValidationSchema from "../Validation/IDValidationSchema.mjs";

const router = Router();

// Endpoints
router.get("/", ProductsController.getProducts);
router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    AdminMiddleware,
    checkSchema(CreateProductValidationSchema),
    ProductsController.createProduct
);
router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    AdminMiddleware,
    checkSchema(IDValidationSchema),
    ProductsController.deleteProduct
);
router.put(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    AdminMiddleware,
    checkSchema(IDValidationSchema),
    checkSchema(CreateProductValidationSchema),
    ProductsController.updateProduct
);

export default router;
