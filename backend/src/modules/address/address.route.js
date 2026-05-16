import express from "express";
import AddressController from "./address.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { createAddressSchema, updateAddressSchema } from "./address.validation.js";

const addressRouter = express.Router();

addressRouter.use(authMiddleware);

addressRouter.get("/", AddressController.getListAddress);
addressRouter.get("/:id", AddressController.getAddressDetail);
addressRouter.post("/", validate(createAddressSchema), AddressController.createAddress);
addressRouter.patch("/:id", validate(updateAddressSchema), AddressController.updateAddress);
addressRouter.delete("/:id", AddressController.deleteAddress);
addressRouter.patch("/:id/default", AddressController.setDefaultAddress);

export default addressRouter;
