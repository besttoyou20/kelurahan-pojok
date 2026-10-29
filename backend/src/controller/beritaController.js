import fs from "fs";
import path from "path";
import {
  createBerita,
  getSemuaBerita,
  getTotalBerita,
  findBeritaById,
  updateBerita,
  deleteBerita,
} from "../models/kelurahan/beritaModel.js";


// =========================
// TAMBAH BERITA
// =========================
export const tambahBerita = async (req, res) => {
  try {
    const { judul, isi } = req.body;

    if (!judul || !isi) {
      return res.status(400).json({
        message: "Judul dan isi berita wajib diisi",
      });
    }

    const foto = req.file
      ? `/uploads/berita/${req.file.filename}`
      : null;

    const result = await createBerita({
      judul,
      isi,
      foto,
    });

    return res.status(201).json({
      message: "Berita berhasil ditambahkan",
      data: {
        id: result.insertId,
      },
    });
  } catch (error) {
    console.error("Error menambahkan berita:", error);

    return res.status(500).json({
      message: "Gagal menambahkan berita",
    });
  }
};

// =========================
// AMBIL BERITA UNTUK PUBLIC
// =========================
export const getBeritaPublic = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const data = await getSemuaBerita(limit, offset);
    const total = await getTotalBerita();

    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error mengambil berita:", error);

    return res.status(500).json({
      message: "Gagal mengambil data berita",
    });
  }
};

// =========================
// DETAIL BERITA
// =========================
export const getDetailBerita = async (req, res) => {
  try {
    const { id } = req.params;

    const berita = await findBeritaById(id);

    if (!berita) {
      return res.status(404).json({
        message: "Berita tidak ditemukan",
      });
    }

    return res.status(200).json({
      data: berita,
    });
  } catch (error) {
    console.error("Error mengambil detail berita:", error);

    return res.status(500).json({
      message: "Gagal mengambil detail berita",
    });
  }
};

export const editBerita = async (req, res) => {
  try {
    const { id } = req.params;
    const { judul, isi } = req.body;

    if (!judul || !isi) {
      return res.status(400).json({
        message: "Judul dan isi berita wajib diisi",
      });
    }

    const berita = await findBeritaById(id);

    if (!berita) {
      return res.status(404).json({
        message: "Berita tidak ditemukan",
      });
    }

    const foto = req.file
      ? `/uploads/berita/${req.file.filename}`
      : berita.foto;

    await updateBerita(id, {
      judul,
      isi,
      foto,
    });

    return res.status(200).json({
      message: "Berita berhasil diperbarui",
    });
  } catch (error) {
    console.error("Error mengedit berita:", error);

    return res.status(500).json({
      message: "Gagal mengedit berita",
    });
  }
};

export const hapusBerita = async (req, res) => {
  try {
    const { id } = req.params;

    const berita = await findBeritaById(id);

    if (!berita) {
      return res.status(404).json({
        message: "Berita tidak ditemukan",
      });
    }

    // Hapus data berita dari database
    await deleteBerita(id);

    // Hapus foto jika berita memiliki foto
 if (berita.foto) {
  const filePath = path.resolve(`src${berita.foto}`);

  console.log("Foto yang akan dihapus:", filePath);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log("Foto berhasil dihapus");
  } else {
    console.log("File foto tidak ditemukan:", filePath);
  }
}

    return res.status(200).json({
      message: "Berita berhasil dihapus",
    });
  } catch (error) {
    console.error("Error menghapus berita:", error);

    return res.status(500).json({
      message: "Gagal menghapus berita",
    });
  }
};