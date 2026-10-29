
import connectDB from "../database/db.js";

// Mencari kode yang masih dapat digunakan
export const findRegistrationCode = async (kodeRegistrasi) => {
  const [rows] = await connectDB.query(
    `SELECT *
     FROM registration_codes
     WHERE kode = ?
       AND status = 'unused'
       AND is_used = 0
       AND expires_at > NOW()`,
    [kodeRegistrasi]
  );

  return rows[0];
};

// Menandai kode sebagai sudah digunakan
export const useRegistrationCode = async (
  kodeRegistrasi,
  db = connectDB
) => {
  const [result] = await db.query(
    `UPDATE registration_codes
     SET status = 'used',
         is_used = 1
     WHERE kode = ?
       AND is_used = 0
       AND status = 'unused'
       AND expires_at > NOW()`,
    [kodeRegistrasi]
  );

  return result;
};

// Mengambil semua kode registrasi
export const getRegistrationCodes = async () => {
  const [rows] = await connectDB.query(
    `SELECT
       id,
       kode,
       nomor_rt,
       is_used,
       created_at,
       expires_at,
       CASE
         WHEN status = 'unused' AND expires_at <= NOW()
           THEN 'expired'
         ELSE status
       END AS status
     FROM registration_codes
     ORDER BY created_at DESC, id DESC`
  );

  return rows;
};

// Membuat kode registrasi baru
export const createRegistrationCode = async (nomorRT, kode) => {
  const connection = await connectDB.getConnection();

  try {
    await connection.beginTransaction();

    // Satu RT tidak boleh memiliki kode yang masih aktif
    // atau kode yang sudah digunakan.
    const [existing] = await connection.query(
      `SELECT id
       FROM registration_codes
       WHERE nomor_rt = ?
         AND (
           status = 'used'
           OR (
             status = 'unused'
             AND expires_at > NOW()
           )
         )
       LIMIT 1
       FOR UPDATE`,
      [nomorRT]
    );

    if (existing.length > 0) {
      await connection.rollback();

      return {
        conflict: true,
      };
    }

    await connection.query(
      `INSERT INTO registration_codes
         (kode, nomor_rt, is_used, status, expires_at)
       VALUES (?, ?, 0, 'unused',
         DATE_ADD(NOW(), INTERVAL 7 DAY))`,
      [kode, nomorRT]
    );

    await connection.commit();

    return {
      conflict: false,
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

// Menonaktifkan kode yang masih aktif
export const disableRegistrationCode = async (id) => {
  const [result] = await connectDB.query(
    `UPDATE registration_codes
     SET status = 'disabled'
     WHERE id = ?
       AND status = 'unused'
       AND is_used = 0
       AND expires_at > NOW()`,
    [id]
  );

  return result;
};
