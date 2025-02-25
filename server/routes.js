import express from "express";
import {router as authController} from "./controllers/authController.js";
import {router as testController} from "./controllers/authController.js";

const router = express.Router();

router.use(authController);
router.use("/tests", testController);

export { router };
