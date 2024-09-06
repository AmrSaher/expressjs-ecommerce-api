import { Router } from "express";
import { checkSchema } from "express-validator";
import passport from "passport";
import UpdateProfileValidationSchema from "../Validation/UpdateProfileValidationSchema.mjs";
import * as ProfilesController from "../Controllers/ProfilesController.mjs";
import upload from "../Middlewares/UploadMiddleware.mjs";

const router = Router();

// Middlewares
router.use(passport.authenticate("jwt", { session: false }));

// Endpoints
router.get("/", ProfilesController.getProfile);
router.put(
    "/",
    checkSchema(UpdateProfileValidationSchema),
    upload.single("image"),
    ProfilesController.updateProfile
);

export default router;
