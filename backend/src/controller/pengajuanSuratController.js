import generateSuratPDF from "../utils/generateSuratPDF.js";
import { findUserRTById} from "../models/userRTModel.js";
import {
  createPengajuanSurat,
  findPengajuanSuratById,
  getRiwayatPengajuanByUserId,
  getSemuaPengajuanSurat,
  updateStatusPengajuan
} from "../models/pengajuanSuratModel.js";
import getTandaTanganFromCloudinary from "../utils/getTandaTanganFromCloudinary.js";
export const tambahPengajuanSurat = async (req, res) => {
  try {
    const {
      noSurat,
      tahun,
      namaLengkap,
      tempatLahir,
      tanggalLahir,
      nik,
      namaKK,
      alamat,
      jenisKelamin,
      statusPerkawinan,
      agama,
      pekerjaan,
      tujuanSurat,
    } = req.body;

    const userId = req.user.id;

    const userRT = await findUserRTById(userId);

    if (!userRT) {
      return res.status(404).json({
        message: "Data Ketua RT tidak ditemukan",
      });
    }

    if (!userRT.tanda_tangan) {
      return res.status(400).json({
        message: "Silakan tambahkan tanda tangan Ketua RT terlebih dahulu",
      });
    }

    const result = await createPengajuanSurat({
      userId,
      noSurat,
      tahun,
      namaLengkap,
      tempatLahir,
      tanggalLahir,
      nik,
      namaKK,
      alamat,
      jenisKelamin,
      statusPerkawinan,
      agama,
      pekerjaan,
      tujuanSurat,
      tandaTanganSnapshot: userRT.tanda_tangan,
      tandaTanganFormatSnapshot: userRT.tanda_tangan_format,
    });

    res.status(201).json({
      message: "Pengajuan surat berhasil dibuat",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error tambah pengajuan surat:", error);

    res.status(500).json({
      message: "Gagal membuat pengajuan surat",
      error: error.message,
    });
  }
};

export const generateSurat = async (req, res) => {
  try {
    const { id } = req.params;

    const pengajuan = await findPengajuanSuratById(id);

    if (!pengajuan) {
      return res.status(404).json({
        message: "Pengajuan surat tidak ditemukan",
      });
    }

    let tandaTanganBuffer = null;

    if (
      pengajuan.tanda_tangan_snapshot &&
      pengajuan.tanda_tangan_format_snapshot
    ) {
      tandaTanganBuffer = await getTandaTanganFromCloudinary(
        pengajuan.tanda_tangan_snapshot,
        pengajuan.tanda_tangan_format_snapshot
      );
    }

    generateSuratPDF(
      res,
      pengajuan,
      tandaTanganBuffer
    );
  } catch (error) {
    console.error("Error generate surat:", error);

    return res.status(500).json({
      message: "Gagal generate surat",
    });
  }
};
export const getRiwayatPengajuan = async (req, res) => {
  try {
    const userId = req.user.id;

    const riwayat = await getRiwayatPengajuanByUserId(userId);

    return res.status(200).json({
      data: riwayat,
    });
  } catch (error) {
    console.error("Error mengambil riwayat pengajuan:", error);

    return res.status(500).json({
      message: "Gagal mengambil riwayat pengajuan",
    });
  }
};

export const getSemuaPengajuanSuratKelurahan = async (req, res) => {
  try {
    const pengajuan = await getSemuaPengajuanSurat();

    return res.status(200).json({
      data: pengajuan,
    });
  } catch (error) {
    console.error(
      "Error mengambil semua pengajuan surat:",
      error
    );

    return res.status(500).json({
      message: "Gagal mengambil data pengajuan surat",
    });
  }
};

export const getDetailPengajuan = async (req, res) => {
  try {
    const { id } = req.params;

    const pengajuan = await findPengajuanSuratById(id);

    if (!pengajuan) {
      return res.status(404).json({
        message: "Pengajuan surat tidak ditemukan",
      });
    }

    return res.status(200).json({
      data: pengajuan,
    });
  } catch (error) {
    console.error(
      "Error mengambil detail pengajuan:",
      error
    );

    return res.status(500).json({
      message: "Gagal mengambil detail pengajuan",
    });
  }
};

export const tandaiSelesai = async (req, res) => {
  try {
    const { id } = req.params;

    const pengajuan = await findPengajuanSuratById(id);

    if (!pengajuan) {
      return res.status(404).json({
        message: "Pengajuan surat tidak ditemukan",
      });
    }

    if (pengajuan.status === "selesai") {
      return res.status(400).json({
        message: "Pengajuan surat sudah selesai",
      });
    }

    await updateStatusPengajuan(id, "selesai");

    return res.status(200).json({
      message: "Pengajuan surat berhasil ditandai selesai",
    });
  } catch (error) {
    console.error(
      "Error menandai pengajuan selesai:",
      error
    );

    return res.status(500).json({
      message: "Gagal mengubah status pengajuan",
    });
  }
};

