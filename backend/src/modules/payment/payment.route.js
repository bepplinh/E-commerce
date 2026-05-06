import express from "express";
import PaymentController from "./payment.controller.js";

const router = express.Router();

router.post("/create-payment", PaymentController.createPayment);

export default router;
