import { Router } from "express";
import AuthRoutes from "./AuthRoutes.mjs";

const router = Router();

router.use("/api/auth", AuthRoutes);

export default router;
