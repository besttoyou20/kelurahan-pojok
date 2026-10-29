
import multer from "multer";
import path from "node:path";
import fs from "node:fs";

const uploadDir = process.env.VERCEL
  ? "/tmp/uploads/berita"
  : path.resolve(process.cwd(), "src/uploads/berita");

fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const namaFile = `berita-${Date.now()}${ext}`;

    cb(null, namaFile);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Format foto harus JPG, JPEG, PNG, atau WEBP"), false);
  }
};

const uploadBerita = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default uploadBerita;
