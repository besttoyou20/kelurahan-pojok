import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileBadge from "../../component/rt/ProfileBadge.jsx";
import axios from "axios";

function PengajuanSurat() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    noSurat: "",
    tahun: "",
    namaLengkap: "",
    tempatLahir: "",
    tanggalLahir: "",
    nik: "",
    namaKK: "",
    alamat: "",
    jenisKelamin: "",
    statusPerkawinan: "",
    agama: "",
    pekerjaan: "",
    tujuanSurat: "",
  });

const [profil, setProfil] = useState(null);
const [loadingProfil, setLoadingProfil] = useState(true);
const [errorProfil, setErrorProfil] = useState(false);

const sudahTandaTangan = Boolean(profil?.tandaTangan);

useEffect(() => {
  const fetchProfil = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setErrorProfil(true);
        return;
      }

      const response = await axios.get(
        "http://localhost:4000/api/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfil(response.data.data);
    } catch (error) {
      console.error("Error mengambil profil RT:", error);
      setErrorProfil(true);
    } finally {
      setLoadingProfil(false);
    }
  };

  fetchProfil();
}, []);

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit pengajuan surat
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:4000/api/pengajuan-surat",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ID pengajuan dari backend
      const idPengajuan = response.data.id;

      // Setelah berhasil, langsung ke halaman preview surat
      navigate(`/preview-surat/${idPengajuan}`);
    } catch (error) {
      console.error("Error pengajuan surat:", error);

      alert(
        error.response?.data?.message ||
          "Gagal mengajukan surat"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDE9] px-9 py-8">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-[#8B0502]">
          Pengajuan Surat
        </h1>

        <ProfileBadge />
      </div>


      {/* ===================================================== */}
      {/* JIKA BELUM ADA TANDA TANGAN                          */}
      {/* ===================================================== */}

     {loadingProfil ? (
        <div className="bg-white rounded-xl border border-[#E7B9A7] p-8 text-center">
          <p className="text-sm text-[#8B0502]">
            Memuat profil...
          </p>
        </div>
      ) : errorProfil || !profil ? (
        <div className="bg-white rounded-xl border border-[#E7B9A7] p-8 text-center">
          <h2 className="text-lg font-semibold text-[#8B0502] mb-2">
            Gagal Memuat Profil
          </h2>

          <p className="text-sm text-gray-600">
            Data profil tidak dapat diambil. Silakan periksa koneksi atau login kembali.
          </p>
        </div>
      ) : !sudahTandaTangan ? (
        <div className="bg-white rounded-xl border border-[#E7B9A7] p-8 text-center">

          <h2 className="text-lg font-semibold text-[#8B0502] mb-2">
            Tanda Tangan Belum Ditambahkan
          </h2>

          <p className="text-sm text-gray-600 mb-6">
            Anda harus menambahkan tanda tangan Ketua RT
            terlebih dahulu sebelum membuat pengajuan surat.
          </p>

          <button
            type="button"
            onClick={() => navigate("/profil-rt")}
            className="bg-[#8B0502] text-white px-5 py-2.5 rounded-lg hover:bg-[#700402] transition"
          >
            Tambahkan Tanda Tangan
          </button>

        </div>
      ) : (

        /* ===================================================== */
        /* JIKA SUDAH ADA TANDA TANGAN → TAMPILKAN FORM         */
        /* ===================================================== */

        <div className="w-150 mx-auto bg-[#FFFDE9] border border-[#E7B9A7] rounded-xl px-6 py-8">

          <div className="w-125 mx-auto">

            {/* Judul Form */}
            <h2 className="text-lg font-semibold text-[#8B0502] mb-5">
              Form Surat Pengantar
            </h2>

            <form onSubmit={handleSubmit}>

              {/* ================= NO SURAT + TAHUN ================= */}
              <div className="flex gap-4">

                {/* No. Surat */}
                <div className="w-60">
                  <label className="block text-[11px] font-medium text-[#8B0502] mb-1">
                    No. Surat
                  </label>

                  <input
                    type="text"
                    name="noSurat"
                    value={formData.noSurat}
                    onChange={handleChange}
                    required
                    className="w-full h-9 px-3 border border-[#E7B9A7] rounded-md bg-white text-xs outline-none focus:border-[#FFC83D]"
                  />
                </div>

                {/* Tahun */}
                <div className="w-60">
                  <label className="block text-[11px] font-medium text-[#8B0502] mb-1">
                    Tahun
                  </label>

                  <input
                    type="text"
                    name="tahun"
                    value={formData.tahun}
                    onChange={handleChange}
                    required
                    className="w-full h-9 px-3 border border-[#E7B9A7] rounded-md bg-white text-xs outline-none focus:border-[#FFC83D]"
                  />
                </div>

              </div>


              {/* ================= NAMA LENGKAP ================= */}
              <div className="mt-4">
                <label className="block text-[11px] font-medium text-[#8B0502] mb-1">
                  Nama Lengkap
                </label>

                <input
                  type="text"
                  name="namaLengkap"
                  value={formData.namaLengkap}
                  onChange={handleChange}
                  required
                  className="w-full h-9 px-3 border border-[#E7B9A7] rounded-md bg-white text-xs outline-none focus:border-[#FFC83D]"
                />
              </div>


              {/* ================= TEMPAT + TANGGAL LAHIR ================= */}
              <div className="flex gap-4 mt-4">

                {/* Tempat Lahir */}
                <div className="w-60">
                  <label className="block text-[11px] font-medium text-[#8B0502] mb-1">
                    Tempat Lahir
                  </label>

                  <input
                    type="text"
                    name="tempatLahir"
                    value={formData.tempatLahir}
                    onChange={handleChange}
                    required
                    className="w-full h-9 px-3 border border-[#E7B9A7] rounded-md bg-white text-xs outline-none focus:border-[#FFC83D]"
                  />
                </div>

                {/* Tanggal Lahir */}
                <div className="w-60">
                  <label className="block text-[11px] font-medium text-[#8B0502] mb-1">
                    Tanggal Lahir
                  </label>

                  <input
                    type="date"
                    name="tanggalLahir"
                    value={formData.tanggalLahir}
                    onChange={handleChange}
                    required
                    className="w-full h-9 px-3 border border-[#E7B9A7] rounded-md bg-white text-xs outline-none focus:border-[#FFC83D]"
                  />
                </div>

              </div>


              {/* ================= NIK ================= */}
              <div className="mt-4">
                <label className="block text-[11px] font-medium text-[#8B0502] mb-1">
                  NIK
                </label>

                <input
                  type="text"
                  name="nik"
                  value={formData.nik}
                  onChange={handleChange}
                  required
                  className="w-full h-9 px-3 border border-[#E7B9A7] rounded-md bg-white text-xs outline-none focus:border-[#FFC83D]"
                />
              </div>


              {/* ================= NAMA KK ================= */}
              <div className="mt-4">
                <label className="block text-[11px] font-medium text-[#8B0502] mb-1">
                  Nama KK
                </label>

                <input
                  type="text"
                  name="namaKK"
                  value={formData.namaKK}
                  onChange={handleChange}
                  required
                  className="w-full h-9 px-3 border border-[#E7B9A7] rounded-md bg-white text-xs outline-none focus:border-[#FFC83D]"
                />
              </div>


              {/* ================= ALAMAT ================= */}
              <div className="mt-4">
                <label className="block text-[11px] font-medium text-[#8B0502] mb-1">
                  Alamat
                </label>

                <textarea
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  rows="3"
                  required
                  className="w-full px-3 py-2 border border-[#E7B9A7] rounded-md bg-white text-xs outline-none resize-none focus:border-[#FFC83D]"
                />
              </div>


              {/* ================= JENIS KELAMIN ================= */}
              <div className="mt-4">
                <label className="block text-[11px] font-medium text-[#8B0502] mb-1">
                  Jenis Kelamin
                </label>

                <select
                  name="jenisKelamin"
                  value={formData.jenisKelamin}
                  onChange={handleChange}
                  required
                  className="w-full h-9 px-3 border border-[#E7B9A7] rounded-md bg-white text-xs outline-none focus:border-[#FFC83D]"
                >
                  <option value="">
                    Pilih jenis kelamin
                  </option>

                  <option value="Laki-laki">
                    Laki-laki
                  </option>

                  <option value="Perempuan">
                    Perempuan
                  </option>
                </select>
              </div>


              {/* ================= STATUS PERKAWINAN ================= */}
              <div className="mt-4">
                <label className="block text-[11px] font-medium text-[#8B0502] mb-1">
                  Status Perkawinan
                </label>

                <select
                  name="statusPerkawinan"
                  value={formData.statusPerkawinan}
                  onChange={handleChange}
                  required
                  className="w-full h-9 px-3 border border-[#E7B9A7] rounded-md bg-white text-xs outline-none focus:border-[#FFC83D]"
                >
                  <option value="">
                    Pilih status perkawinan
                  </option>

                  <option value="Belum Kawin">
                    Belum Kawin
                  </option>

                  <option value="Kawin">
                    Kawin
                  </option>

                  <option value="Cerai Hidup">
                    Cerai Hidup
                  </option>

                  <option value="Cerai Mati">
                    Cerai Mati
                  </option>
                </select>
              </div>


              {/* ================= AGAMA ================= */}
              <div className="mt-4">
                <label className="block text-[11px] font-medium text-[#8B0502] mb-1">
                  Agama
                </label>

                <select
                  name="agama"
                  value={formData.agama}
                  onChange={handleChange}
                  required
                  className="w-full h-9 px-3 border border-[#E7B9A7] rounded-md bg-white text-xs outline-none focus:border-[#FFC83D]"
                >
                  <option value="">
                    Pilih agama
                  </option>

                  <option value="Islam">
                    Islam
                  </option>

                  <option value="Kristen">
                    Kristen
                  </option>

                  <option value="Katolik">
                    Katolik
                  </option>

                  <option value="Hindu">
                    Hindu
                  </option>

                  <option value="Buddha">
                    Buddha
                  </option>

                  <option value="Konghucu">
                    Konghucu
                  </option>
                </select>
              </div>


              {/* ================= PEKERJAAN ================= */}
              <div className="mt-4">
                <label className="block text-[11px] font-medium text-[#8B0502] mb-1">
                  Pekerjaan
                </label>

                <input
                  type="text"
                  name="pekerjaan"
                  value={formData.pekerjaan}
                  onChange={handleChange}
                  required
                  className="w-full h-9 px-3 border border-[#E7B9A7] rounded-md bg-white text-xs outline-none focus:border-[#FFC83D]"
                />
              </div>


              {/* ================= TUJUAN SURAT ================= */}
              <div className="mt-4">
                <label className="block text-[11px] font-medium text-[#8B0502] mb-1">
                  Tujuan Surat
                </label>

                <textarea
                  name="tujuanSurat"
                  value={formData.tujuanSurat}
                  onChange={handleChange}
                  rows="3"
                  required
                  className="w-full px-3 py-2 border border-[#E7B9A7] rounded-md bg-white text-xs outline-none resize-none focus:border-[#FFC83D]"
                />
              </div>


              {/* ================= BUTTON ================= */}
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="px-10 py-3 bg-[#FFC83D] border border-[#8B0502] rounded-lg text-md font-semibold text-[#8B0502] shadow-sm cursor-pointer hover:bg-[#f5bc25] transition"
                >
                  Ajukan Surat
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

export default PengajuanSurat;