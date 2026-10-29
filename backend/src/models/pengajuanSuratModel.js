import connectDB from "../database/db.js";

export const createPengajuanSurat = async (
  {
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
  },
  db = connectDB
) => {
  const [result] = await db.query(
    `INSERT INTO pengajuan_surat
    (
      user_id,
      no_surat,
      tahun,
      nama_lengkap,
      tempat_lahir,
      tanggal_lahir,
      nik,
      nama_kk,
      alamat,
      jenis_kelamin,
      status_perkawinan,
      agama,
      pekerjaan,
      tujuan_surat
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
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
    ]
  );

  return result;
};

export const findPengajuanSuratById = async (id, db = connectDB) => {
  const [rows] = await db.query(
    `SELECT 
      pengajuan_surat.*,
      users_rt.nama_ketua_rt,
      users_rt.nomor_rt,
      users_rt.nomor_rw,
      users_rt.tanda_tangan
    FROM pengajuan_surat
    JOIN users_rt 
      ON pengajuan_surat.user_id = users_rt.id
    WHERE pengajuan_surat.id = ?`,
    [id]
  );

  return rows[0];
};

export const getRiwayatPengajuanByUserId = async (
  userId,
  db = connectDB
) => {
  const [rows] = await db.query(
    `SELECT
      id,
      no_surat,
      tahun,
      nama_lengkap,
      nik,
      tujuan_surat,
      status,
      created_at
    FROM pengajuan_surat
    WHERE user_id = ?
    ORDER BY created_at DESC`,
    [userId]
  );

  return rows;
};

export const getSemuaPengajuanSurat = async (db = connectDB) => {
  const [rows] = await db.query(
    `SELECT
      pengajuan_surat.id,
      pengajuan_surat.no_surat,
      pengajuan_surat.tahun,
      pengajuan_surat.nama_lengkap,
      pengajuan_surat.tanggal_lahir,
      pengajuan_surat.tujuan_surat,
      pengajuan_surat.status,
      pengajuan_surat.created_at,
      users_rt.nomor_rt,
      users_rt.nomor_rw
    FROM pengajuan_surat
    JOIN users_rt
      ON pengajuan_surat.user_id = users_rt.id
    ORDER BY pengajuan_surat.created_at DESC`
  );

  return rows;
};

export const updateStatusPengajuan = async (
  id,
  status,
  db = connectDB
) => {
  const [result] = await db.query(
    `UPDATE pengajuan_surat
     SET status = ?
     WHERE id = ?`,
    [status, id]
  );

  return result;
};
