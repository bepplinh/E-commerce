import express from "express";
import PaymentController from "./payment.controller.js";
import verifyToken from "../../middlewares/auth.middleware.js";
import checkApiKey from "./middleware/webhookSepay.middleware.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-payment", verifyToken, PaymentController.createPayment);
paymentRouter.post("/webhook", checkApiKey, PaymentController.webhook);

export default paymentRouter;
