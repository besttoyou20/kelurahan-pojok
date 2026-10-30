import PDFDocument from "pdfkit";

const formatTanggal = (tanggal) => {
  if (!tanggal) return "....................";

  const date = new Date(tanggal);

  if (isNaN(date.getTime())) return tanggal;

  const bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  return `${String(date.getDate()).padStart(2, "0")} ${
    bulan[date.getMonth()]
  } ${date.getFullYear()}`;
};
const tanggalSurat = formatTanggal(new Date());

const generateSuratPDF = (res, data, tandaTanganBuffer) => {
  const doc = new PDFDocument({
    size: "A4",
    margin: 50,
  });

  // =========================
  // RESPONSE PDF
  // =========================

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `inline; filename="Surat-Pengantar-${data.no_surat}.pdf"`
  );

  doc.pipe(res);

  // =========================
  // HEADER
  // =========================

  doc
    .font("Helvetica-Bold")
    .fontSize(13)
    .text(`RUKUN TETANGGA (RT) ${data.nomor_rt} RUKUN WARGA (RW) ${data.nomor_rw}`, {
      align: "center",
    });

  doc
    .font("Helvetica-Bold")
    .fontSize(13)
    .text("KELURAHAN POJOK KECAMATAN MOJOROTO", {
      align: "center",
    });

  doc.font("Helvetica-Bold").fontSize(13).text("KOTA KEDIRI", {
    align: "center",
  });

  // Garis header
  doc
    .moveTo(50, 105)
    .lineTo(545, 105)
    .stroke();

  // =========================
  // TANGGAL & TUJUAN
  // =========================

  doc.moveDown(2);

  doc
    .font("Helvetica")
    .fontSize(11)
    .text(`Kediri, ${tanggalSurat}`, {
      align: "right",
    });

  doc.moveDown(0.5);

  doc.text("K e p a d a :");
  doc.text("Yth. Kepala Kelurahan Pojok");
  doc.text("Di -");
  doc.text("     KEDIRI", {
    underline: true,
  });

  // =========================
  // JUDUL
  // =========================

  doc.moveDown(1.3);

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .text("SURAT PENGANTAR", {
      align: "center",
    });

  doc.moveDown(0.3);

  doc
    .font("Helvetica")
    .fontSize(11)
    .text(`Nomor : ${data.no_surat} / SP-RT / ${data.tahun}`, {
      align: "center",
    });

  // =========================
  // PEMBUKA
  // =========================

  doc.moveDown(0.5);

  doc
    .font("Helvetica")
    .fontSize(11)
    .text(
      `Yang bertanda tangan dibawah ini kami Ketua RT ${data.nomor_rt} RW ${data.nomor_rw} Kelurahan Pojok, berdasarkan pengakuan dari yang bersangkutan maka dengan ini kami menerangkan bahwa :`,
      {
        align: "justify",
        lineGap: 1,
      }
    );

  // =========================
  // DATA PENDUDUK
  // =========================

  doc.moveDown(0.6);

  const labelX = 70;
  const valueX = 190;

  const dataPenduduk = [
    ["Nama", data.nama_lengkap],
    [
      "Tempat tanggal lahir",
      `${data.tempat_lahir}, ${formatTanggal(data.tanggal_lahir)}`,
    ],
    ["NIK", data.nik],
    ["Nama KK", data.nama_kk],
    ["Jenis kelamin", data.jenis_kelamin],
    ["Status Perkawinan", data.status_perkawinan],
    ["Agama", data.agama],
    ["Pekerjaan", data.pekerjaan],
    ["Alamat", data.alamat],
  ];

  dataPenduduk.forEach(([label, value]) => {
    doc.font("Helvetica").fontSize(11);

    const currentY = doc.y;

    doc.text(label, labelX, currentY, {
      width: 110,
    });

    doc.text(`: ${value}`, valueX, currentY, {
      width: 350,
    });

    doc.moveDown(0.35);
  });

  // =========================
  // TUJUAN SURAT
  // =========================

  doc.moveDown(0.4);

  
doc.text(
  `Yang bersangkutan betul-betul warga RT ${data.nomor_rt} RW ${data.nomor_rw} Kelurahan Pojok dan bermaksud mencari surat ${data.tujuan_surat}.`,
  50,
  doc.y,
  {
    width: 495,
    align: "left",
    lineGap: 1,
  }
);
  // =========================
  // PENUTUP
  // =========================

  doc.moveDown(1.3);

  doc.text("Demikian untuk menjadi periksa.");

  // =========================
  // TANDA TANGAN
  // =========================

  const signatureY = doc.y + 15;

  // -------------------------
  // PEMOHON
  // -------------------------

  doc.text("Pemohon", 100, signatureY, {
    width: 150,
    align: "center",
  });

  doc.text(data.nama_lengkap, 100, signatureY + 80, {
    width: 150,
    align: "center",
  });

  // -------------------------
  // KETUA RT
  // -------------------------

  doc.text(`Ketua RT ${data.nomor_rt} RW ${data.nomor_rw}`, 370, signatureY, {
    width: 150,
    align: "center",
  });

  // Tanda tangan RT
if (tandaTanganBuffer) {
  try {
    doc.image(tandaTanganBuffer, 385, signatureY + 20, {
      fit: [120, 50],
      align: "center",
    });
  } catch (error) {
    console.log(
      "Tanda tangan tidak dapat dimuat:",
      error.message
    );
  }
}

  doc.text(
    data.nama_ketua_rt || "____________________",
    370,
    signatureY + 80,
    {
      width: 150,
      align: "center",
    }
  );

  // =========================
  // MENGETAHUI RW
  // =========================

  const rwY = signatureY + 125;

  doc.text("Mengetahui", 230, rwY, {
    width: 150,
    align: "center",
  });

  doc.text(`Ketua RW ${data.nomor_rw}`, 230, rwY + 20, {
    width: 150,
    align: "center",
  });

  doc.text("________________________", 230, rwY + 75, {
    width: 150,
    align: "center",
  });

  // =========================
  // SELESAI
  // =========================

  doc.end();
};

export default generateSuratPDF;