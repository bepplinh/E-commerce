import express from "express";
import { register, login } from "./auth.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import { registerSchema, loginSchema } from "./auth.validation.js";

const authRouter = express.Router();

authRouter.post("/register", validate(registerSchema), register);
authRouter.post("/login", validate(loginSchema), login);

export default authRouter;
