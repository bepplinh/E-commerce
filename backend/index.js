import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./src/modules/auth/auth.route.js";
import errorMiddleware from "./src/middlewares/error.middleware.js";
import productRouter from "./src/modules/product/product.route.js";
import cartRouter from "./src/modules/cart/cart.route.js";
import uploadRouter from "./src/modules/upload/upload.route.js";
import orderRouter from "./src/modules/order/order.route.js";
import rbacRouter from "./src/modules/rbac/rbac.route.js";
import adminRouter from "./src/modules/admin/admin.route.js";
import verifyToken from "./src/middlewares/auth.middleware.js";
import paymentRouter from "./src/modules/payment/payment.route.js";
import wishlistRouter from "./src/modules/wishlist/wishlist.route.js";
import addressRouter from "./src/modules/address/address.route.js";
import userRouter from "./src/modules/user/user.route.js";
import reviewRouter from "./src/modules/review/review.route.js";
import voucherRouter from "./src/modules/voucher/voucher.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/wishlist", wishlistRouter);
app.use("/api/v1/upload", uploadRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/rbac", rbacRouter);
app.use("/api/v1/payments", paymentRouter);
app.use("/api/v1/address", addressRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/vouchers", voucherRouter);

app.use(verifyToken);
app.use("/api/v1/admin", adminRouter);

// Error handling middleware (must be registered last)
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
