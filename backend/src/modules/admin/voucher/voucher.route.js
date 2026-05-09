import express from "express";
import validate from "../../../middlewares/validate.middleware.js";
import { createVoucherSchema, updateVoucherSchema } from "./voucher.validation.js";
import * as voucherController from "./voucher.controller.js";

const router = express.Router();

router.get("/", voucherController.getVouchers);
router.get("/:id", voucherController.getVoucherDetail);
router.post("/", validate(createVoucherSchema), voucherController.createVoucher);
router.patch("/:id", validate(updateVoucherSchema), voucherController.updateVoucher);
router.delete("/:id", voucherController.deleteVoucher);

export default router;
