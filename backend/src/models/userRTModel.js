import connectDB from "../database/db.js";

export const createUserRT = async (
  {
    namaKetuaRT,
    noRT,
    noRW,
    noWhatsapp,
    username,
    password,
  },
  db = connectDB
) => {
  const [result] = await db.query(
    `INSERT INTO users_rt
    (
      nama_ketua_rt,
      nomor_rt,
      nomor_rw,
      no_whatsapp,
      username,
      password
    )
    VALUES (?, ?, ?, ?, ?, ?)`,
    [
      namaKetuaRT,
      noRT,
      noRW,
      noWhatsapp,
      username,
      password,
    ]
  );

  return result;
};

export const findUserRTByUsername = async (username, db = connectDB) => {
  const [rows] = await db.query(
    `SELECT * FROM users_rt WHERE username = ?`,
    [username]
  );    
  return rows[0];
};

export const updateTandaTanganRT = async (
  userId,
  tandaTangan,
  db = connectDB
) => {
  const [result] = await db.query(
    `UPDATE users_rt
     SET tanda_tangan = ?
     WHERE id = ?`,
    [tandaTangan, userId]
  );

  return result;
};

export const findUserRTById = async (id, db = connectDB) => {
  const [rows] = await db.query(
    `SELECT id, tanda_tangan
     FROM users_rt
     WHERE id = ?`,
    [id]
  );

  return rows[0];
};

export const getProfilRTById = async (id, db = connectDB) => {
  const [rows] = await db.query(
    `SELECT
      id,
      nama_ketua_rt AS namaKetuaRT,
      nomor_rt AS noRT,
      nomor_rw AS noRW,
      no_whatsapp AS noWhatsapp,
      username,
      tanda_tangan AS tandaTangan
    FROM users_rt
    WHERE id = ?`,
    [id]
  );

  return rows[0];
};
