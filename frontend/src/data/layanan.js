export const daftarLayanan = [
  {
    id: "domisili",
    nama: "Surat Keterangan Domisili",
    deskripsi:
      "Surat keterangan untuk keperluan administrasi terkait tempat tinggal pemohon sesuai ketentuan yang berlaku.",
    persyaratan: [
      "Surat pengantar RT.",
      "Fotokopi KTP.",
      "Fotokopi Kartu Keluarga (KK).",
    ],
    prosedur: [
      "Siapkan dokumen persyaratan.",
      "Ajukan permohonan melalui RT setempat.",
      "Serahkan berkas kepada Kelurahan sesuai mekanisme yang berlaku.",
      "Petugas memeriksa kelengkapan dokumen.",
      "Surat diproses apabila persyaratan terpenuhi.",
    ],
  },
  {
    id: "sktm",
    nama: "Surat Keterangan Miskin (SKM)",
    deskripsi:
      "Surat keterangan untuk mendukung kebutuhan administrasi tertentu sesuai ketentuan yang berlaku.",
    persyaratan: [
      "Surat pengantar RT sesuai ketentuan.",
      "Fotokopi KTP.",
      "Fotokopi Kartu Keluarga (KK).",
      "Surat pernyataan bermeterai jika dipersyaratkan.",
    ],
    prosedur: [
      "Tentukan tujuan pengurusan surat.",
      "Siapkan dokumen sesuai kebutuhan.",
      "Ajukan permohonan melalui RT setempat.",
      "Serahkan berkas kepada Kelurahan.",
      "Petugas memeriksa dan memproses permohonan.",
    ],
  },
  {
    id: "kematian",
    nama: "Surat Keterangan Kematian",
    deskripsi:
      "Surat keterangan untuk mendukung administrasi pelaporan kematian warga.",
    persyaratan: [
      "Surat pengantar RT.",
      "Fotokopi KTP dan KK orang yang meninggal.",
      "Fotokopi KTP pelapor.",
      "Fotokopi KTP dua orang saksi.",
      "Surat pernyataan sesuai ketentuan.",
    ],
    prosedur: [
      "Siapkan dokumen almarhum dan identitas pelapor.",
      "Hubungi RT setempat untuk mendapatkan pengantar.",
      "Lengkapi dokumen saksi dan surat pernyataan.",
      "Serahkan berkas kepada Kelurahan.",
      "Petugas memeriksa dan memproses permohonan.",
    ],
  },
   {
    id: "belum-menikah",
    nama: "Surat Keterangan Belum Menikah",
    deskripsi:
      "Surat keterangan yang digunakan untuk keperluan administrasi yang membutuhkan keterangan status belum menikah.",
    persyaratan: [
      "Surat pengantar RT.",
      "Fotokopi KTP pemohon.",
      "Fotokopi Kartu Keluarga (KK).",
      "Surat pernyataan belum menikah.",
      "Saksi dan dokumen tambahan sesuai ketentuan Kelurahan.",
    ],
    prosedur: [
      "Pemohon menyiapkan KTP, KK, dan dokumen pendukung.",
      "Pemohon meminta pengantar RT.",
      "Pemohon membuat surat pernyataan sesuai ketentuan.",
      "Pemohon menyerahkan berkas kepada Kelurahan.",
      "Petugas memeriksa dan memproses surat.",
    ],
  },
  {
    id: "penghasilan",
    nama: "Surat Keterangan Penghasilan",
    deskripsi:
      "Surat keterangan untuk mendukung keperluan administrasi yang membutuhkan informasi penghasilan pemohon.",
    persyaratan: [
      "Surat pengantar RT.",
      "Fotokopi KTP pemohon.",
      "Fotokopi Kartu Keluarga (KK).",
      "Slip gaji atau bukti penghasilan jika tersedia.",
      "Dokumen pendukung sesuai tujuan pengurusan.",
    ],
    prosedur: [
      "Pemohon menentukan tujuan pengurusan surat.",
      "Pemohon menyiapkan identitas dan bukti penghasilan.",
      "Pemohon mengurus pengantar RT.",
      "Pemohon menyerahkan berkas kepada Kelurahan.",
      "Petugas memeriksa dan memproses permohonan.",
    ],
  },
  {
    id: "kartu-keluarga",
    nama: "Penerbitan Kartu Keluarga",
    deskripsi:
      "Layanan administrasi kependudukan untuk penerbitan KK baru atau pembaruan data keluarga sesuai kebutuhan.",
    persyaratan: [
      "Formulir administrasi kependudukan yang diperlukan.",
      "KK lama untuk perubahan atau penggantian jika tersedia.",
      "Dokumen pendukung sesuai alasan pengurusan.",
      "Surat kehilangan dari kepolisian jika dipersyaratkan untuk KK hilang.",
    ],
    prosedur: [
      "Pemohon menentukan jenis pengurusan KK.",
      "Pemohon menyiapkan formulir dan dokumen pendukung.",
      "Pemohon mengajukan berkas melalui mekanisme pelayanan yang berlaku.",
      "Petugas memeriksa kelengkapan dan kesesuaian data.",
      "Berkas diproses melalui mekanisme administrasi kependudukan.",
      "Pemohon mengikuti informasi penyelesaian dari petugas.",
    ],
  },
  {
    id: "akta-kelahiran",
    nama: "Pembuatan Akta Kelahiran",
    deskripsi:
      "Layanan administrasi pencatatan kelahiran untuk mendukung penerbitan akta kelahiran.",
    persyaratan: [
      "Formulir administrasi kependudukan yang diperlukan.",
      "Surat keterangan kelahiran dari fasilitas kesehatan atau dokumen pengganti yang sah.",
      "Fotokopi KTP dan KK orang tua.",
      "Dokumen perkawinan orang tua atau dokumen pengganti sesuai ketentuan.",
      "Dokumen pendukung lainnya jika diperlukan.",
    ],
    prosedur: [
      "Orang tua atau pelapor menyiapkan dokumen kelahiran.",
      "Pemohon melengkapi formulir dan dokumen pendukung.",
      "Berkas disampaikan melalui mekanisme pelayanan yang berlaku.",
      "Petugas memeriksa kelengkapan dan kesesuaian data.",
      "Permohonan diproses oleh instansi yang berwenang.",
      "Pemohon mengikuti informasi penyelesaian dokumen.",
    ],
  },
  {
    id: "akta-kematian",
    nama: "Pembuatan Akta Kematian",
    deskripsi:
      "Layanan administrasi pencatatan kematian untuk mendukung penerbitan akta kematian.",
    persyaratan: [
      "Formulir administrasi kependudukan yang diperlukan.",
      "Surat keterangan kematian dari pihak yang berwenang.",
      "Fotokopi KTP pelapor.",
      "Dokumen identitas dan KK orang yang meninggal jika dipersyaratkan.",
      "Dokumen pendukung lainnya sesuai ketentuan.",
    ],
    prosedur: [
      "Keluarga atau pelapor menyiapkan dokumen kematian.",
      "Pemohon melengkapi formulir dan dokumen pendukung.",
      "Berkas disampaikan melalui mekanisme pelayanan yang berlaku.",
      "Petugas memeriksa kelengkapan dokumen.",
      "Permohonan diproses oleh instansi yang berwenang.",
      "Pemohon mengikuti informasi penyelesaian akta.",
    ],
  },
   {
    id: "pindah-keluar",
    nama: "Administrasi Pindah Keluar",
    deskripsi:
      "Layanan administrasi kependudukan bagi warga yang mengurus perpindahan dari wilayah asal ke wilayah lain.",
    persyaratan: [
      "Formulir perpindahan penduduk yang diperlukan.",
      "Kartu Keluarga dan KTP.",
      "Alamat tujuan perpindahan.",
      "Dokumen pendukung jika terdapat perubahan data.",
    ],
    prosedur: [
      "Pemohon menyiapkan dokumen kependudukan.",
      "Pemohon melengkapi formulir dan informasi alamat tujuan.",
      "Berkas disampaikan melalui mekanisme pelayanan yang berlaku.",
      "Petugas memeriksa kelengkapan dan kesesuaian data.",
      "Permohonan diproses sesuai ketentuan administrasi kependudukan.",
      "Pemohon mengikuti petunjuk untuk tahap selanjutnya.",
    ],
  },
];