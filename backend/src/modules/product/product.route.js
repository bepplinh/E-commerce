import express from "express";
import { getFilter, getProduct, getProductDetail } from "./product.controller.js";

const productRouter = express.Router();

productRouter.get("/filter", getFilter);
productRouter.get("/", getProduct);
productRouter.get("/:slug", getProductDetail);

export default productRouter;
