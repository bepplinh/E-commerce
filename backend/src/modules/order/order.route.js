import express from "express";
import OrderController from "./order.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const orderRouter = express.Router();

orderRouter.get("/", authMiddleware, OrderController.getOrderById);

export default orderRouter;
