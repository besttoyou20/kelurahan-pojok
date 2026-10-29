import express from "express";
import { getDashboardRTData } from "../controller/dashboardRTController.js";
import {verifyToken} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  verifyToken,
  getDashboardRTData
);

export default router;