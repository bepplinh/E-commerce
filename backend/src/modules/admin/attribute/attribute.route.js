import express from "express";
import * as attributeController from "./attribute.controller.js";

const router = express.Router();

router.get("/", attributeController.getAttributes);
router.get("/:id", attributeController.getAttributeDetail);
router.post("/", attributeController.createAttribute);
router.patch("/:id", attributeController.updateAttribute);
router.delete("/:id", attributeController.deleteAttribute);

export default router;
