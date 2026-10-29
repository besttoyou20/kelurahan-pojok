import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


function DetailBerita() {
  const navigate = useNavigate();
  const { id } = useParams();
  const API_URL = import.meta.env.VITE_API_URL;
  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetailBerita = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${API_URL}/api/berita/${id}`
        );

        setBerita(response.data.data);
      } catch (error) {
        console.error(
          "Error mengambil detail berita:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDetailBerita();
  }, [id]);

  const formatTanggal = (tanggal) => {
    if (!tanggal) return "-";

    return new Date(tanggal).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFDE4]">


        <div className="max-w-275 mx-auto px-6 py-12">
          <div className="bg-white border border-[#E7B9A7] rounded-lg p-10 text-center">
            <p className="text-xs text-gray-500">
              Memuat berita...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!berita) {
    return (
      <div className="min-h-screen bg-[#FFFDE4]">

        <div className="max-w-275 mx-auto px-6 py-12">
          <div className="bg-white border border-[#E7B9A7] rounded-lg p-10 text-center">
            <p className="text-sm text-[#8B0502]">
              Berita tidak ditemukan.
            </p>

            <button
              type="button"
              onClick={() => navigate("/berita")}
              className="mt-4 text-xs text-[#8B0502] font-medium hover:underline cursor-pointer"
            >
              Kembali ke Daftar Berita
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDE4] text-[#111]">


      {/* CONTENT */}
      <main className="max-w-225 mx-auto px-6 pt-8 pb-12">

        {/* HEADER */}
        <div className="mb-4">

          <h1 className="text-2xl font-semibold text-[#8B0502]">
            Berita & Kegiatan
          </h1>

          <p className="text-[11px] text-[#8B0502] max-w-80 leading-relaxed">
            Informasi terbaru mengenai berita dan kegiatan
            terkini dari Kelurahan Pojok
          </p>

          {/* KEMBALI */}
          <button
            type="button"
            onClick={() => navigate("/berita")}
            className="flex items-center gap-1 mt-3 text-[11px] text-[#8B0502] font-medium hover:underline cursor-pointer"
          >
            <ArrowLeft size={14} />
            Kembali ke Daftar Berita
          </button>

        </div>


        {/* DETAIL BERITA */}
        <article className="bg-white border border-[#E7B9A7] rounded-lg overflow-hidden">

          {/* FOTO */}
          {berita.foto ? (
            <div className="w-full h-75 overflow-hidden bg-gray-100">
              <img
                src={`${API_URL}${berita.foto}`}
                alt={berita.judul}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-full h-60 bg-gray-100 flex items-center justify-center">
              <p className="text-xs text-gray-400">
                Tidak ada foto
              </p>
            </div>
          )}


          {/* ISI */}
          <div className="px-7 py-6">

            {/* JUDUL */}
            <h2 className="text-xl font-semibold text-[#111] leading-snug">
              {berita.judul}
            </h2>

            {/* TANGGAL */}
            <p className="text-[10px] text-gray-500 mt-1">
              {formatTanggal(berita.created_at)}
            </p>


            <div className="mt-6 max-w-225 text-[13px] text-[#333] leading-[1.8]">

  {berita.isi
    ?.split(/\r?\n/)
    .filter((paragraf) => paragraf.trim() !== "")
    .map((paragraf, index) => (
      <p
        key={index}
        className="mb-5 text-justify"
      >
        {paragraf.trim()}
      </p>
    ))}

</div>

          </div>

        </article>

      </main>
    </div>
  );
}

export default DetailBerita;