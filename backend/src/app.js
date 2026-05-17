import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";

// ── Routers ─────────────────────────────────────────────────────────────────
import authRouter from "./modules/auth/auth.route.js";
import productRouter from "./modules/product/product.route.js";
import cartRouter from "./modules/cart/cart.route.js";
import wishlistRouter from "./modules/wishlist/wishlist.route.js";
import uploadRouter from "./modules/upload/upload.route.js";
import orderRouter from "./modules/order/order.route.js";
import rbacRouter from "./modules/rbac/rbac.route.js";
import paymentRouter from "./modules/payment/payment.route.js";
import addressRouter from "./modules/address/address.route.js";
import userRouter from "./modules/user/user.route.js";
import reviewRouter from "./modules/review/review.route.js";
import voucherRouter from "./modules/voucher/voucher.route.js";
import adminRouter from "./modules/admin/admin.route.js";

// ── Middlewares ──────────────────────────────────────────────────────────────
import verifyToken from "./middlewares/auth.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

// ── Security & parsing middleware ────────────────────────────────────────────
app.use(
    cors({
        origin: process.env.CLIENT_ORIGIN ?? "*",
        credentials: true,
    }),
);
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Public routes (no auth required) ────────────────────────────────────────
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

// ── Protected routes (require valid JWT) ─────────────────────────────────────
app.use("/api/v1/admin", verifyToken, adminRouter);

// ── Global error handler (must be last) ──────────────────────────────────────
app.use(errorMiddleware);

export default app;
