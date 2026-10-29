
import express from "express";
import {
  registerRT,
  uploadTandaTanganRT,
  getProfilRT,
} from "../controller/userRTController.js";
import uploadTandaTangan from "../middleware/uploadTandaTangan.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register-rt", registerRT);

router.get("/me", verifyToken, getProfilRT);

router.put(
  "/tanda-tangan",
  verifyToken,
  uploadTandaTangan.single("tandaTangan"),
  uploadTandaTanganRT
);

export default router;
