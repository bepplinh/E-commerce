import express from "express";
import isAdminMiddleware from "../../middlewares/admin.middleware.js";
import verifyToken from "../../middlewares/auth.middleware.js";
import brandRouter from "./brand/brand.route.js";
import categoryRouter from "./category/category.route.js";
import attributeRouter from "./attribute/attribute.route.js";
import voucherRouter from "./voucher/voucher.route.js";
import adminProductRouter from "../product/admin/product.route.js";

const adminRouter = express.Router();

adminRouter.use(verifyToken, isAdminMiddleware);

adminRouter.get("/dashboard", (req, res) => {
    res.send("Welcome to admin dashboard");
});

adminRouter.use("/attributes", attributeRouter);
adminRouter.use("/brands", brandRouter);
adminRouter.use("/categories", categoryRouter);
adminRouter.use("/vouchers", voucherRouter);
adminRouter.use("/products", adminProductRouter);

export default adminRouter;
