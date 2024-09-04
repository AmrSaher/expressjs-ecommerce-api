import { Router } from "express";
import AuthRoutes from "./AuthRoutes.mjs";
import ProfileRoutes from "./ProfileRoutes.mjs";
import CardRoutes from "./CardRoutes.mjs";
import AddressRoutes from "./AddressRoutes.mjs";
import ProductRoutes from "./ProductRoutes.mjs";

const router = Router();

router.use("/api/auth", AuthRoutes);
router.use("/api/profile", ProfileRoutes);
router.use("/api/cards", CardRoutes);
router.use("/api/addresses", AddressRoutes);
router.use("/api/products", ProductRoutes);

export default router;
