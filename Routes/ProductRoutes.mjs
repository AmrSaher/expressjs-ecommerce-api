import { Router } from "express";
import passport from "passport";
import * as ProductsController from "../Controllers/ProductsController.mjs";
import AdminMiddleware from "../Middlewares/AdminMiddleware.mjs";
import { checkSchema } from "express-validator";
import CreateProductValidationSchema from "../Validation/CreateProductValidationSchema.mjs";
import IDValidationSchema from "../Validation/IDValidationSchema.mjs";
import FilterProductsValidationSchema from "../Validation/FilterProductsValidationSchema.mjs";
import RateProductValidationSchema from "../Validation/RateProductValidationSchema.mjs";

const router = Router();

// Endpoints
router.get(
    "/",
    checkSchema(FilterProductsValidationSchema),
    ProductsController.getProducts
);
router.get(
    "/:id",
    checkSchema(IDValidationSchema),
    ProductsController.getProduct
);
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
router.post(
    "/rate/:id",
    passport.authenticate("jwt", { session: false }),
    checkSchema(IDValidationSchema),
    checkSchema(RateProductValidationSchema),
    ProductsController.rateProduct
);

export default router;
