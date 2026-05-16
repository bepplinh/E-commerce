import express from "express";
import VoucherController from "./voucher.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const voucherRouter = express.Router();

// Public route to validate (might need optional auth to check user usage)
voucherRouter.get("/validate/:code", authMiddleware, VoucherController.validateVoucher);

// Protected routes
voucherRouter.use(authMiddleware);
voucherRouter.get("/my", VoucherController.getMyVouchers);
voucherRouter.post("/claim", VoucherController.claimVoucher);

export default voucherRouter;
