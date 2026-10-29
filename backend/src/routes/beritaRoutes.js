import express from "express";

import {
  tambahBerita,
  getBeritaPublic,
  getDetailBerita,
  editBerita,
  hapusBerita
} from "../controller/beritaController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
import uploadBerita from "../middleware/uploadBerita.js";

const router = express.Router();

// =========================
// PUBLIC
// =========================

// Daftar berita untuk masyarakat
router.get("/", getBeritaPublic);

// Detail berita untuk masyarakat
router.get("/:id", getDetailBerita);

// =========================
// KELURAHAN / ADMIN
// =========================

// Tambah berita
router.post(
  "/",
  verifyToken,
  uploadBerita.single("foto"),
  tambahBerita
);
router.put(
  "/:id",
  verifyToken,
  uploadBerita.single("foto"),
  editBerita
);

router.delete(
  "/:id",
  verifyToken,
  hapusBerita
);
export default router;