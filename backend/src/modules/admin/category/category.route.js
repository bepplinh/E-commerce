import express from "express";
import validate from "../../../middlewares/validate.middleware.js";
import { createCategorySchema, updateCategorySchema } from "./category.validation.js";
import * as categoryController from "./category.controller.js";

const router = express.Router();

router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategoryDetail);
router.post("/", validate(createCategorySchema), categoryController.createCategory);
router.patch("/:id", validate(updateCategorySchema), categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

export default router;
