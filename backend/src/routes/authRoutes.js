import express from "express";
import { loginRT, loginKelurahan } from "../controller/authController.js";

const router = express.Router();

router.post("/login-rt", loginRT);
router.post("/login-kelurahan", loginKelurahan);

export default router;