import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import authRouter from "./src/modules/auth/auth.route.js";
import errorMiddleware from "./src/middlewares/error.middleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRouter);

// Error handling middleware (must be registered last)
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
