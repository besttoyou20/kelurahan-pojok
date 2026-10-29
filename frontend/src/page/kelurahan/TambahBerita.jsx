import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ProfileBadgeKelurahan from "../../component/kelurahan/ProfileBadgeKelurahan.jsx";

function TambahBerita() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [foto, setFoto] = useState(null);
  const [fotoLama, setFotoLama] = useState("");

  const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
  // =========================
  // AMBIL DATA JIKA EDIT
  // =========================
  useEffect(() => {
    if (!isEdit) return;

    const fetchBerita = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/berita/${id}`
        );

        const data = response.data.data;

        setJudul(data.judul || "");
        setIsi(data.isi || "");
        setFotoLama(data.foto || "");
      } catch (error) {
        console.error("Error mengambil detail berita:", error);

        alert(
          error.response?.data?.message ||
            "Gagal mengambil data berita"
        );

        navigate("/kelola-berita");
      }
    };

    fetchBerita();
  }, [id, isEdit, navigate]);

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!judul.trim() || !isi.trim()) {
      alert("Judul dan isi berita wajib diisi");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("judul", judul);
      formData.append("isi", isi);

      if (foto) {
        formData.append("foto", foto);
      }

      if (isEdit) {
  await axios.put(
    `http://localhost:4000/api/berita/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  setShowSuccess(true);
} else {
  await axios.post(
    "http://localhost:4000/api/berita",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  setShowSuccess(true);
}

    } catch (error) {
      console.error("Error menyimpan berita:", error);

      alert(
        error.response?.data?.message ||
          "Gagal menyimpan berita"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">

        <div>
          <h1 className="text-2xl font-semibold text-[#8B0502]">
            {isEdit ? "Edit Berita" : "Kelola Berita"}
          </h1>

          <button
            type="button"
            onClick={() => navigate("/kelola-berita")}
            className="text-sm text-[#8B0502] mt-3 cursor-pointer hover:underline"
          >
            ← Kembali ke Daftar Berita
          </button>
        </div>

        <ProfileBadgeKelurahan />

      </div>

      {/* FORM */}
      <div className="bg-[#FFFDE9] border border-[#E7B9A7] rounded-lg shadow-sm p-6 max-w-full">

        <h2 className="text-xl font-semibold text-[#8B0502] mb-5">
          {isEdit ? "Edit Berita" : "Tambah Berita"}
        </h2>

        <form onSubmit={handleSubmit}>

          {/* JUDUL */}
          <div className="mb-4">

            <label className="block text-xs font-medium text-[#8B0502] mb-1">
              Judul Berita / Kegiatan
            </label>

            <input
              type="text"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              className="w-full h-10 rounded-md border border-[#E7B9A7] bg-white px-3 text-sm outline-none focus:border-[#8B0502]"
            />

          </div>

          {/* ISI */}
          <div className="mb-4">

            <label className="block text-xs font-medium text-[#8B0502] mb-1">
              Isi Berita / Kegiatan
            </label>

            <textarea
    value={isi}
    onChange={(e) => {
      if (e.target.value.length <= 10000) {
        setIsi(e.target.value);
      }
    }}
    rows={8}
    placeholder="Tuliskan isi berita atau kegiatan..."
    className="w-full rounded-md border border-[#E7B9A7] bg-white px-3 py-2 text-sm outline-none resize-none focus:border-[#8B0502]"
  />

  <div className="flex justify-end mt-1">
    <span className="text-[11px] text-gray-400">
      {isi.length} / 10.000
    </span>
  </div>

          </div>

          {/* FOTO */}
          <div className="mb-6">

            <label className="block text-xs font-medium text-[#8B0502] mb-1">
              Foto Berita / Kegiatan
            </label>

            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={(e) => setFoto(e.target.files[0])}
              className="block w-full text-xs text-gray-600
                file:mr-3
                file:py-2
                file:px-3
                file:rounded-md
                file:border
                file:border-[#E7B9A7]
                file:bg-white
                file:text-[#8B0502]
                file:text-xs
                file:font-medium
                hover:file:bg-[#FFF8D6]"
            />

            {/* FOTO LAMA SAAT EDIT */}
            {isEdit && fotoLama && !foto && (
              <div className="mt-3">

                <p className="text-xs text-gray-500 mb-2">
                  Foto saat ini:
                </p>

                <img
                  src={`http://localhost:4000${fotoLama}`}
                  alt="Foto berita"
                  className="w-40 h-25 object-cover rounded-md border border-[#E7B9A7]"
                />

              </div>
            )}

            {/* FOTO BARU */}
            {foto && (
              <p className="text-xs text-gray-500 mt-2">
                File dipilih: {foto.name}
              </p>
            )}

          </div>

          {/* BUTTON */}
          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={() => navigate("/kelola-berita")}
              className="h-10 px-7 rounded-md bg-[#B94A3D] text-white text-xs font-medium hover:bg-[#9F3D32] transition cursor-pointer"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={loading}
              className="h-10 px-7 rounded-md bg-[#FFC83D] text-[#8B0502] text-xs font-medium hover:bg-[#FFB82E] transition cursor-pointer disabled:opacity-50"
            >
              {loading
                ? "Menyimpan..."
                : isEdit
                ? "Simpan Perubahan"
                : "Upload"}
            </button>

          </div>

        </form>

      </div>

      {showSuccess && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">

    <div className="w-95 bg-white rounded-xl border border-[#E7B9A7] shadow-lg p-6 text-center">

      {/* ICON */}
      <div className="w-12 h-12 mx-auto rounded-full bg-[#FFF4C2] border border-[#FFC83D] flex items-center justify-center mb-4">
        <span className="text-xl font-bold text-[#8B0502]">
          ✓
        </span>
      </div>

      {/* JUDUL */}
      <h3 className="text-lg font-semibold text-[#8B0502]">
        {isEdit
          ? "Berita Berhasil Diperbarui"
          : "Berita Berhasil Ditambahkan"}
      </h3>

      {/* PESAN */}
      <p className="text-xs text-gray-500 mt-2">
        {isEdit
          ? "Perubahan berita telah berhasil disimpan."
          : "Berita telah berhasil ditambahkan ke daftar berita."}
      </p>

      {/* BUTTON */}
      <button
        type="button"
        onClick={() => navigate("/kelola-berita")}
        className="mt-5 h-9 px-7 rounded-md bg-[#FFC83D] border border-[#8B0502] text-xs font-medium text-[#8B0502] hover:bg-[#FFB82E] transition cursor-pointer"
      >
        Oke
      </button>

    </div>

  </div>
)}

    </div>
  );
}

export default TambahBerita;