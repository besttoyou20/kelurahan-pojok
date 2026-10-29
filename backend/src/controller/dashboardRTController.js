import { getDashboardRT } from "../models/dashboardRTModel.js";

export const getDashboardRTData = async (req, res) => {
  try {
    const userId = req.user.id;

    const dashboard = await getDashboardRT(userId);

    if (!dashboard) {
      return res.status(404).json({
        message: "Data dashboard tidak ditemukan",
      });
    }

    return res.status(200).json({
      data: {
        namaKetuaRT: dashboard.nama_ketua_rt,
        totalPengajuan: Number(dashboard.total_pengajuan || 0),
        diajukan: Number(dashboard.diajukan || 0),
        selesai: Number(dashboard.selesai || 0),
      },
    });
  } catch (error) {
    console.error("Error mengambil dashboard RT:", error);

    return res.status(500).json({
      message: "Gagal mengambil data dashboard RT",
    });
  }
};