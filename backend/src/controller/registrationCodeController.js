
import {
  findRegistrationCode,
  getRegistrationCodes,
  createRegistrationCode,
  disableRegistrationCode,
} from "../models/registrationCodeModel.js";


import { randomInt } from "node:crypto";

export const verifyRegistrationCode = async (req, res) => {
  try {
    const { kodeRegistrasi } = req.body;

    if (!kodeRegistrasi) {
      return res.status(400).json({
        message: "Kode registrasi tidak boleh kosong",
      });
    }

    const registrationCode =
      await findRegistrationCode(kodeRegistrasi);

    if (!registrationCode) {
      return res.status(404).json({
        message: "Kode registrasi tidak valid, kedaluwarsa, atau sudah digunakan",
      });
    }

    return res.status(200).json({
      message: "Kode registrasi valid",
      nomorRT: registrationCode.nomor_rt,
    });
  } catch (error) {
    console.error("Error verifying registration code:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// GET daftar kode
export const listRegistrationCodes = async (req, res) => {
  try {
    const data = await getRegistrationCodes();

    return res.status(200).json({ data });
  } catch (error) {
    console.error("Error listing registration codes:", error);

    return res.status(500).json({
      message: "Gagal mengambil daftar kode registrasi",
    });
  }
};

// POST generate kode
export const generateRegistrationCode = async (req, res) => {
  try {
    const { nomorRT } = req.body;

    if (!nomorRT || !/^\d{1,2}$/.test(String(nomorRT))) {
      return res.status(400).json({
        message: "Nomor RT tidak valid",
      });
    }

    const rt = String(Number(nomorRT)).padStart(2, "0");
    const karakter = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    const bagianAcak = Array.from(
      { length: 6 },
      () => karakter[randomInt(karakter.length)]
    ).join("");

    const kode = `RT${rt}-${bagianAcak}`;

    const result = await createRegistrationCode(rt, kode);

    if (result.conflict) {
      return res.status(409).json({
        message: `RT ${rt} sudah memiliki kode yang digunakan atau masih aktif.`,
      });
    }

    return res.status(201).json({
      message: "Kode registrasi berhasil dibuat",
      data: {
        kode,
        nomor_rt: rt,
      },
    });
  } catch (error) {
    console.error("Error generating registration code:", error);

    return res.status(500).json({
      message: "Gagal membuat kode registrasi",
    });
  }
};

// PATCH nonaktifkan kode
export const deactivateRegistrationCode = async (req, res) => {
  try {
    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
      return res.status(400).json({
        message: "ID kode tidak valid",
      });
    }

    const result = await disableRegistrationCode(Number(id));

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Kode tidak ditemukan, sudah digunakan, atau tidak lagi aktif",
      });
    }

    return res.status(200).json({
      message: "Kode registrasi berhasil dinonaktifkan",
    });
  } catch (error) {
    console.error("Error deactivating registration code:", error);

    return res.status(500).json({
      message: "Gagal menonaktifkan kode registrasi",
    });
  }
};
