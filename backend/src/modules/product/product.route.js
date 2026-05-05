import express from "express";
import { getFilter, getProduct, getProductDetail, createProduct, updateProduct } from "./product.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import { createProductSchema, updateProductSchema } from "./product.schema.js";

const productRouter = express.Router();

productRouter.get("/filter", getFilter);
productRouter.get("/", getProduct);
productRouter.get("/:slug", getProductDetail);

// validate middleware sẽ parse + validate body bằng Zod trước khi vào controller
productRouter.post("/", validate(createProductSchema), createProduct);
productRouter.patch("/:id", validate(updateProductSchema), updateProduct);

export default productRouter;
