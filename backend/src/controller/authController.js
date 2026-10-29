import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserRTByUsername } from "../models/userRTModel.js";
import {findUserKelurahanByUsername} from "../models/kelurahan/userKelurahanModel.js"
export const loginRT = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username dan password wajib diisi",
      });
    }

    const user = await findUserRTByUsername(username);

    if (!user) {
      return res.status(401).json({
        message: "Username atau password salah",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Username atau password salah",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      message: "Login berhasil",
      token,
      user: {
  id: user.id,
  namaKetuaRT: user.nama_ketua_rt,
  nomorRT: user.nomor_rt,
  nomorRW: user.nomor_rw,
  noWhatsapp: user.no_whatsapp,
  username: user.username,
  tandaTangan: user.tanda_tangan,
},
    });

  } catch (error) {
    console.error("Error login RT:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const loginKelurahan = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username dan password wajib diisi",
      });
    }

    const user = await findUserKelurahanByUsername(username);

    if (!user) {
      return res.status(401).json({
        message: "Username atau password salah",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Username atau password salah",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: "kelurahan",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        namaAdmin: user.nama_admin,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Error login Kelurahan:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};