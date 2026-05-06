import express from "express";
import PaymentController from "./payment.controller.js";
import { idempotencyMiddleware } from "../../middlewares/idempotency.middleware.js";

const router = express.Router();

router.post("/create-payment", idempotencyMiddleware, PaymentController.createPayment);

export default router;
