import express from "express";
import { addToCart, removeFromCart, getCart, updateQuantity } from "./cart.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const cartRouter = express.Router();

cartRouter.use(authMiddleware);
cartRouter.get("/", getCart);
cartRouter.post("/", addToCart);
cartRouter.delete("/", removeFromCart);
cartRouter.patch("/item", updateQuantity); // PATCH /api/cart/item

export default cartRouter;

