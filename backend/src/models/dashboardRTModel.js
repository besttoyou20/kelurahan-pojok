import connectDB from "../database/db.js";

export const getDashboardRT = async (
  userId,
  db = connectDB
) => {
  const [rows] = await db.query(
    `SELECT
      users_rt.nama_ketua_rt,

      COUNT(pengajuan_surat.id) AS total_pengajuan,

      SUM(
        CASE
          WHEN pengajuan_surat.status = 'diajukan'
          THEN 1
          ELSE 0
        END
      ) AS diajukan,

      SUM(
        CASE
          WHEN pengajuan_surat.status = 'selesai'
          THEN 1
          ELSE 0
        END
      ) AS selesai

    FROM users_rt

    LEFT JOIN pengajuan_surat
      ON users_rt.id = pengajuan_surat.user_id

    WHERE users_rt.id = ?

    GROUP BY users_rt.id, users_rt.nama_ketua_rt`,
    [userId]
  );

  return rows[0];
};