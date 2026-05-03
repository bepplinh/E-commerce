import express from "express";
import { uploadImages } from "./upload.controller.js";

const uploadRouter = express.Router();

uploadRouter.post("/", uploadImages);

export default uploadRouter;
