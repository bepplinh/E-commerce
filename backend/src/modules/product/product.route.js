import express from "express";
import { getFilter, getProduct, getProductDetail } from "./product.controller.js";
import { validateQuery } from "../../middlewares/validate.middleware.js";

const productRouter = express.Router();

productRouter.get("/filter", getFilter);
productRouter.get("/:slug", getProductDetail);

export default productRouter;
