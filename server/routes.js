import express from "express";
import {router as authController} from "./controllers/authController.js";

const router = express.Router();

router.use(authController);

export { router };
