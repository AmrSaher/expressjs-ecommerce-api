import { Router } from "express";
import passport from "passport";
import * as AddressesController from "../Controllers/AddressesController.mjs";
import { checkSchema } from "express-validator";
import CreateAddressValidationSchema from "../Validation/CreateAddressValidationSchema.mjs";
import IDValidationSchema from "../Validation/IDValidationSchema.mjs";

const router = Router();

// Middlewares
router.use(passport.authenticate("jwt", { session: false }));

// Endpoints
router.get("/", AddressesController.getAddresses);
router.post(
    "/",
    checkSchema(CreateAddressValidationSchema),
    AddressesController.createAddress
);
router.put(
    "/:id",
    checkSchema(IDValidationSchema),
    checkSchema(CreateAddressValidationSchema),
    AddressesController.updateAddress
);
router.delete(
    "/:id",
    checkSchema(IDValidationSchema),
    AddressesController.deleteAddress
);

export default router;
