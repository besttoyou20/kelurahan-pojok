import express from "express";
import cors from "cors";

import registrationCodeRoutes from "./routes/registrationCodeRoutes.js";
import userRTRoutes from "./routes/userRTRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import pengajuanSuratRoutes from "./routes/pengajuanSuratRoutes.js";
import dashboardRTRoutes from "./routes/dashboardRTRoutes.js";
import beritaRoutes from "./routes/beritaRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/auth", registrationCodeRoutes);
app.use("/api/auth", userRTRoutes);
app.use("/api/pengajuan-surat", pengajuanSuratRoutes);
app.use("/api/dashboard-rt", dashboardRTRoutes);
app.use("/api/berita", beritaRoutes);

app.use(
  "/uploads/berita",
  express.static("src/uploads/berita")
);

app.get("/", (req, res) => {
  res.send("Kelurahan Pojok API is running!");
});

export default app;