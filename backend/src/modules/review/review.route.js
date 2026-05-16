import express from "express";
import ReviewController from "./review.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { createReviewSchema, updateReviewSchema } from "./review.validation.js";

const reviewRouter = express.Router();

// Public route to get reviews
reviewRouter.get("/product/:productId", ReviewController.getProductReviews);

// Protected routes
reviewRouter.post("/", authMiddleware, validate(createReviewSchema), ReviewController.createReview);
reviewRouter.patch("/:id", authMiddleware, validate(updateReviewSchema), ReviewController.updateReview);
reviewRouter.delete("/:id", authMiddleware, ReviewController.deleteReview);

export default reviewRouter;
