import express from "express";
import { register, login, refresh, logout, getMe } from "./auth.controller.js";
import verifyToken from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { registerSchema, loginSchema } from "./auth.validation.js";
import loginByGoogle from "./google/google.controller.js";

const authRouter = express.Router();

authRouter.get("/me", verifyToken, getMe);
authRouter.post("/refresh", refresh);
authRouter.post("/logout", logout);
authRouter.post("/register", validate(registerSchema), register);
authRouter.post("/login", validate(loginSchema), login);
authRouter.post("/login/google", loginByGoogle);

export default authRouter;
