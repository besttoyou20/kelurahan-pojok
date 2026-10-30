import bcrypt from "bcrypt";
import connectDB from "../database/db.js";
import uploadTandaTanganToCloudinary from "../utils/uploadTandaTanganToCloudinary.js";
import { createUserRT } from "../models/userRTModel.js";
import { useRegistrationCode } from "../models/registrationCodeModel.js";
import { updateTandaTanganRT, getProfilRTById, findUserRTById} from "../models/userRTModel.js";
export const registerRT = async (req, res) => {
  let connection;

  try {
    const {
      kodeRegistrasi,
      noRW,
      namaKetuaRT,
      noWhatsapp,
      username,
      password,
      confirmPassword,
    } = req.body;

    if (
      !kodeRegistrasi?.trim() ||
      !noRW?.trim() ||
      !namaKetuaRT?.trim() ||
      !noWhatsapp?.trim() ||
      !username?.trim() ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        message: "Semua data wajib diisi",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Konfirmasi password tidak sesuai",
      });
    }

    connection = await connectDB.getConnection();
    await connection.beginTransaction();

    // Periksa kode, masa berlaku, dan statusnya.
    const [rows] = await connection.query(
      `SELECT id, nomor_rt
       FROM registration_codes
       WHERE kode = ?
         AND status = 'unused'
         AND is_used = 0
         AND expires_at > NOW()
       FOR UPDATE`,
      [kodeRegistrasi.trim()]
    );

    if (rows.length === 0) {
      await connection.rollback();

      return res.status(400).json({
        message:
          "Kode registrasi tidak valid, sudah digunakan, dinonaktifkan, atau kedaluwarsa",
      });
    }

    // Nomor RT ditentukan oleh data kode di database.
    const noRT = String(rows[0].nomor_rt).padStart(2, "0");

    const hashedPassword = await bcrypt.hash(password, 10);

    await createUserRT(
      {
        namaKetuaRT: namaKetuaRT.trim(),
        noRT,
        noRW: noRW.trim(),
        noWhatsapp: noWhatsapp.trim(),
        username: username.trim(),
        password: hashedPassword,
      },
      connection
    );

    const result = await useRegistrationCode(
      kodeRegistrasi.trim(),
      connection
    );

    if (result.affectedRows === 0) {
      await connection.rollback();

      return res.status(400).json({
        message: "Kode registrasi sudah digunakan",
      });
    }

    await connection.commit();

    return res.status(201).json({
      message: "Akun RT berhasil dibuat",
      data: { noRT },
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }

    console.error("Error registering RT:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "Username sudah digunakan",
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  } finally {
    connection?.release();
  }
};

export const uploadTandaTanganRT = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "File tanda tangan wajib diupload",
      });
    }

    const userId = req.user.id;

    const uploadResult = await uploadTandaTanganToCloudinary(
      req.file.buffer
    );

    await updateTandaTanganRT(
      userId,
      uploadResult.public_id,
      uploadResult.format
    );

    return res.status(200).json({
      message: "Tanda tangan berhasil disimpan",
      namaFileAsli: req.file.originalname,
    });
  } catch (error) {
    console.error("Error upload tanda tangan RT:", error);

    return res.status(500).json({
      message: "Gagal menyimpan tanda tangan",
    });
  }
};

export const getProfilRT = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await getProfilRTById(userId);

    if (!user) {
      return res.status(404).json({
        message: "Profil RT tidak ditemukan",
      });
    }

    return res.status(200).json({
      message: "Profil RT berhasil diambil",
      data: user,
    });
  } catch (error) {
    console.error("Error mengambil profil RT:", error);

    return res.status(500).json({
      message: "Gagal mengambil profil RT",
    });
  }
};