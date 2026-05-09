import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import {
    addProductToWishlist,
    clearWishlist,
    getWishlist,
    removeProductFromWishlist,
} from "./wishlist.controller.js";

const wishlistRouter = express.Router();

wishlistRouter.use(authMiddleware);
wishlistRouter.get("/", getWishlist);
wishlistRouter.post("/", addProductToWishlist);
wishlistRouter.delete("/", removeProductFromWishlist);
wishlistRouter.delete("/clear", clearWishlist);

export default wishlistRouter;
