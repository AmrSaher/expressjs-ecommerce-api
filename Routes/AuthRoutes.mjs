import { Router } from "express";
import * as AuthController from "../Controllers/AuthController.mjs";
import { checkSchema } from "express-validator";
import RegisterValidationSchema from "../Validation/RegisterValidationSchema.mjs";
import LoginValidationSchema from "../Validation/LoginValidationSchema.mjs";
import IDValidationSchema from "../Validation/IDValidationSchema.mjs";
import GuestMiddleware from "../Middlewares/GuestMiddleware.mjs";
import passport from "passport";
import AdminMiddleware from "../Middlewares/AdminMiddleware.mjs";

const router = Router();

// Endpoints
router.post(
    "/register",
    GuestMiddleware,
    checkSchema(RegisterValidationSchema),
    AuthController.register
);
router.post(
    "/",
    GuestMiddleware,
    checkSchema(LoginValidationSchema),
    AuthController.login
);
router.get(
    "/user",
    passport.authenticate("jwt", { session: false }),
    AuthController.getUser
);

// For Admins
router.patch(
    "/:id/admin",
    passport.authenticate("jwt", { session: false }),
    AdminMiddleware,
    checkSchema(IDValidationSchema),
    AuthController.makeUserAdmin
);

export default router;
