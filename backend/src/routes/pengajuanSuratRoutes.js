import express from "express";
import {
  tambahPengajuanSurat,
  generateSurat,
  getRiwayatPengajuan,
  getSemuaPengajuanSuratKelurahan,
  getDetailPengajuan,
  tandaiSelesai
} from "../controller/pengajuanSuratController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post(
  "/",
  verifyToken,
  tambahPengajuanSurat
);
router.get(
  "/riwayat",
  verifyToken,
  getRiwayatPengajuan
);
router.get(
  "/kelurahan",
  verifyToken,
  getSemuaPengajuanSuratKelurahan
);
router.get(
  "/:id",
  verifyToken,
  getDetailPengajuan
);
router.get(
  "/:id/generate",
  verifyToken,
  generateSurat
);
router.put(
  "/:id/status",
  verifyToken,
  tandaiSelesai
);

export default router;