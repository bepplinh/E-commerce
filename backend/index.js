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
app.use("/api/v1/upload", uploadRouter);
app.use("/api/v1/orders", orderRouter);

// Error handling middleware (must be registered last)
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
