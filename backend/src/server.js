import express from "express";
import { PORT, NODE_ENV } from "./config/env.js";
import connectDB from "./database/db.js";
import cors from "cors";

import registrationCodeRoutes from "./routes/registrationCodeRoutes.js";
import userRTRoutes from "./routes/userRTRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import pengajuanSuratRoutes from "./routes/pengajuanSuratRoutes.js";
import dashboardRTRoutes from "./routes/dashboardRTRoutes.js"
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
app.use("/uploads/berita", express.static("src/uploads/berita"));

app.get('/', (req, res) => {
    res.send('Hello World!');
});
//START SERVER
const startServer = async () => {
    try{
        await connectDB.query('SELECT 1');

    console.log("Database connected successfully!");

        app.listen(PORT, () => {
            console.log(`Server is running on port http://localhost:${PORT} in ${NODE_ENV} enviroment`);
        })

    }catch(error){
        console.error('Failed to start server', error);
        process.exit(1);
    }
}
startServer();

export default app;