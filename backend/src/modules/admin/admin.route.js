import express from "express";
import isAdminMiddleware from "../../middlewares/admin.middleware.js";
import verifyToken from "../../middlewares/auth.middleware.js";
import attributeRouter from "./attribute/attribute.route.js";

const adminRouter = express.Router();

adminRouter.use(verifyToken, isAdminMiddleware);

adminRouter.get("/dashboard", (req, res) => {
    res.send("Welcome to admin dashboard");
});

adminRouter.use("/attributes", attributeRouter);

export default adminRouter;
