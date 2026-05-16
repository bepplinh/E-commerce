import express from "express";
import validate from "../../../middlewares/validate.middleware.js";
import { createProductSchema, updateProductSchema } from "../product.schema.js";
import { createProduct, updateProduct } from "./product.controller.js";

const adminProductRouter = express.Router();

// validate middleware sẽ parse + validate body bằng Zod trước khi vào controller
adminProductRouter.post("/", validate(createProductSchema), createProduct);
adminProductRouter.patch("/:id", validate(updateProductSchema), updateProduct);

export default adminProductRouter;
