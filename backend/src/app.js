import express from "express";
import cors from "cors";
import path from "node:path";
import registrationCodeRoutes from "./routes/registrationCodeRoutes.js";
import userRTRoutes from "./routes/userRTRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import pengajuanSuratRoutes from "./routes/pengajuanSuratRoutes.js";
import dashboardRTRoutes from "./routes/dashboardRTRoutes.js";
import beritaRoutes from "./routes/beritaRoutes.js";

const app = express();
const corsOptions = {
  origin: [
    "https://kelurahan-pojok.vercel.app",
    "http://localhost:5173",
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/auth", registrationCodeRoutes);
app.use("/api/auth", userRTRoutes);
app.use("/api/pengajuan-surat", pengajuanSuratRoutes);
app.use("/api/dashboard-rt", dashboardRTRoutes);
app.use("/api/berita", beritaRoutes);

const uploadDir = process.env.VERCEL
  ? "/tmp/uploads/berita"
  : path.resolve(process.cwd(), "src/uploads/berita");

app.use(
  "/uploads/berita",
  express.static(uploadDir)
);

app.get("/", (req, res) => {
  res.send("Kelurahan Pojok API is running!");
});

export default app;