import connectDB from "../../database/db.js";

// =========================
// TAMBAH BERITA
// =========================
export const createBerita = async (
  { judul, isi, foto },
  db = connectDB
) => {
  const [result] = await db.query(
    `INSERT INTO berita
    (
      judul,
      isi,
      foto
    )
    VALUES (?, ?, ?)`,
    [judul, isi, foto]
  );

  return result;
};

// =========================
// AMBIL SEMUA BERITA
// =========================
export const getSemuaBerita = async (
  limit,
  offset,
  db = connectDB
) => {
  const [rows] = await db.query(
    `SELECT
      id,
      judul,
      isi,
      foto,
      created_at,
      updated_at
    FROM berita
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?`,
    [limit, offset]
  );

  return rows;
};

// =========================
// HITUNG TOTAL BERITA
// =========================
export const getTotalBerita = async (
  db = connectDB
) => {
  const [rows] = await db.query(
    `SELECT COUNT(*) AS total
     FROM berita`
  );

  return rows[0].total;
};

// =========================
// AMBIL BERITA BERDASARKAN ID
// =========================
export const findBeritaById = async (
  id,
  db = connectDB
) => {
  const [rows] = await db.query(
    `SELECT
      id,
      judul,
      isi,
      foto,
      created_at,
      updated_at
    FROM berita
    WHERE id = ?`,
    [id]
  );

  return rows[0];
};

export const updateBerita = async (
  id,
  { judul, isi, foto },
  db = connectDB
) => {
  const [result] = await db.query(
    `UPDATE berita
     SET
       judul = ?,
       isi = ?,
       foto = ?
     WHERE id = ?`,
    [judul, isi, foto, id]
  );

  return result;
};

export const deleteBerita = async (
  id,
  db = connectDB
) => {
  const [result] = await db.query(
    `DELETE FROM berita
     WHERE id = ?`,
    [id]
  );

  return result;
};