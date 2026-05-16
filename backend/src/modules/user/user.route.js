import express from "express";
import UserController from "./user.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { updateProfileSchema, changePasswordSchema } from "./user.validation.js";

const userRouter = express.Router();

userRouter.use(authMiddleware);

userRouter.get("/me", UserController.getProfile);
userRouter.patch("/me", validate(updateProfileSchema), UserController.updateProfile);
userRouter.patch("/me/password", validate(changePasswordSchema), UserController.changePassword);

export default userRouter;
