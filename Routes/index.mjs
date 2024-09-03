import { Router } from "express";
import AuthRoutes from "./AuthRoutes.mjs";
import ProfileRoutes from "./ProfileRoutes.mjs";

const router = Router();

router.use("/api/auth", AuthRoutes);
router.use("/api/profile", ProfileRoutes);

export default router;
