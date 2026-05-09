import express from "express";
import validate from "../../../middlewares/validate.middleware.js";
import { createBrandSchema, updateBrandSchema } from "./brand.validation.js";
import * as brandController from "./brand.controller.js";

const router = express.Router();

router.get("/", brandController.getBrands);
router.get("/:id", brandController.getBrandDetail);
router.post("/", validate(createBrandSchema), brandController.createBrand);
router.patch("/:id", validate(updateBrandSchema), brandController.updateBrand);
router.delete("/:id", brandController.deleteBrand);

export default router;
