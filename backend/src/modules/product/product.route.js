import express from "express";
import { getFilter, getProduct, getProductDetail, createProduct } from "./product.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import { createProductSchema } from "./product.schema.js";

const productRouter = express.Router();

productRouter.get("/filter", getFilter);
productRouter.get("/", getProduct);
productRouter.get("/:slug", getProductDetail);

// validate middleware sẽ parse + validate body bằng Zod trước khi vào controller
productRouter.post("/", validate(createProductSchema), createProduct);

export default productRouter;
