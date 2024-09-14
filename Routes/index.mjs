import { Router } from "express";
import AuthRoutes from "./AuthRoutes.mjs";
import ProfileRoutes from "./ProfileRoutes.mjs";
import CardRoutes from "./CardRoutes.mjs";
import AddressRoutes from "./AddressRoutes.mjs";
import ProductRoutes from "./ProductRoutes.mjs";
import CategoryRoutes from "./CategoryRoutes.mjs";
import CartRoutes from "./CartRoutes.mjs";
import OrderRoutes from "./OrderRoutes.mjs";

const router = Router();

router.use("/api/auth", AuthRoutes);
router.use("/api/profile", ProfileRoutes);
router.use("/api/cards", CardRoutes);
router.use("/api/addresses", AddressRoutes);
router.use("/api/products", ProductRoutes);
router.use("/api/categories", CategoryRoutes);
router.use("/api/cart", CartRoutes);
router.use("/api/orders", OrderRoutes);

export default router;
