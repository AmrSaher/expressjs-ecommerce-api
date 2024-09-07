import { Router } from "express";
import { checkSchema, body } from "express-validator";
import passport from "passport";
import * as CartController from "../Controllers/CartController.mjs";
import AddProductToCartValidationSchema from "../Validation/AddProductToCartValidationSchema.mjs";
import IDValidationSchema from "../Validation/IDValidationSchema.mjs";

const router = Router();

// Middlewares
router.use(passport.authenticate("jwt", { session: false }));

// Endpoints
router.get("/", CartController.getCart);
router.post(
    "/",
    checkSchema(AddProductToCartValidationSchema),
    CartController.addProduct
);
router.delete(
    "/:id",
    checkSchema(IDValidationSchema),
    CartController.deleteProduct
);
router.patch(
    "/:id",
    checkSchema(IDValidationSchema),
    body("quantity")
        .isInt({ min: 1 })
        .withMessage("Must be an integer.")
        .notEmpty()
        .withMessage("Must be not empty."),
    CartController.updateQuantity
);

export default router;
