import { Router } from "express";
import passport from "passport";
import * as OrdersController from "../Controllers/OrdersController.mjs";
import AdminMiddleware from "../Middlewares/AdminMiddleware.mjs";

const router = Router();

// Middlewares
router.use(passport.authenticate("jwt", { session: false }));

// Endpoints
router.get("/", OrdersController.getOrders);
router.get("/all", AdminMiddleware, OrdersController.getAllOrders);

export default router;
