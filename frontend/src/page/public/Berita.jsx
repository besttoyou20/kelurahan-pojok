import { useEffect, useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Berita() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${API_URL}/api/berita?page=${page}`
        );

        setBerita(response.data.data || []);
        setTotalPages(
          response.data.pagination?.totalPages || 1
        );
      } catch (error) {
        console.error("Error mengambil berita:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, [page]);

  const formatTanggal = (tanggal) => {
    if (!tanggal) return "-";

    return new Date(tanggal)
      .toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
      .replace(/ /g, " ");
  };

  const potongIsi = (isi) => {
    if (!isi) return "";

    const text = isi.replace(/\s+/g, " ").trim();

    if (text.length <= 120) {
      return text;
    }

    return text.substring(0, 120) + "...";
  };

  const beritaFiltered = berita.filter((item) =>
    item.judul
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FFFDE4] text-[#111]">
      

      {/* CONTENT */}
      <main className="max-w-275 mx-auto px-6 pt-8 pb-12">

        {/* HEADER */}
        <div className="flex items-start justify-between mb-5">

          <div>
            <h1 className="text-2xl font-semibold text-[#8B0502]">
              Berita & Kegiatan
            </h1>

            <p className="text-[11px] text-[#8B0502] max-w-80 leading-relaxed">
              Informasi terbaru mengenai berita dan kegiatan
              terkini dari Kelurahan Pojok
            </p>

           
          </div>

          {/* SEARCH */}
          <div className="relative w-100 mt-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder=""
              className="w-full h-9 bg-white border border-[#E7B9A7] rounded-lg px-3 pr-9 text-xs outline-none focus:border-[#8B0502]"
            />

            <Search
              size={15}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

        </div>


        {/* DAFTAR BERITA */}
        <div className="space-y-4">

          {loading ? (
            <div className="bg-white border border-[#E7B9A7] rounded-lg p-8 text-center">
              <p className="text-xs text-gray-500">
                Memuat berita...
              </p>
            </div>
          ) : beritaFiltered.length === 0 ? (
            <div className="bg-white border border-[#E7B9A7] rounded-lg p-8 text-center">
              <p className="text-xs text-gray-500">
                Tidak ada berita ditemukan.
              </p>
            </div>
          ) : (
            beritaFiltered.map((item) => (
              <article
                key={item.id}
                className="bg-white border border-[#E7B9A7] rounded-lg px-4 py-4 flex items-center gap-5"
              >

                {/* TEXT */}
                <div className="flex-1 min-w-0">

                  <h2 className="text-sm font-semibold text-[#111] line-clamp-1">
                    {item.judul}
                  </h2>

                  <p className="text-[9px] text-gray-500 mt-1">
                    {formatTanggal(item.created_at)}
                  </p>

                  <p className="text-[10px] text-gray-700 leading-relaxed mt-2 max-w-145">
                    {potongIsi(item.isi)}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/berita/${item.id}`)
                    }
                    className="text-[10px] text-[#8B0502] font-medium mt-3 hover:underline cursor-pointer"
                  >
                    Baca Selengkapnya →
                  </button>

                </div>


                {/* FOTO */}
                <div className="w-60 h-33 shrink-0 overflow-hidden rounded-md bg-gray-100">

                  {item.foto ? (
                    <img
                      src={`${API_URL}${item.foto}`}
                      alt={item.judul}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">
                      Tidak ada foto
                    </div>
                  )}

                </div>

              </article>
            ))
          )}

        </div>


        {/* PAGINATION */}
        <div className="flex justify-center items-center gap-1 mt-6">

          {page > 1 && (
            <button
              type="button"
              onClick={() => setPage(page - 1)}
              className="w-7 h-7 flex items-center justify-center rounded-md bg-[#8B0502] text-white cursor-pointer"
            >
              <ChevronLeft size={14} />
            </button>
          )}

          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => setPage(pageNumber)}
              className={`w-7 h-7 rounded-md text-[10px] font-medium ${
                page === pageNumber
                  ? "bg-[#8B0502] text-white"
                  : "bg-white border border-[#E7B9A7] text-[#8B0502]"
              }`}
            >
              {pageNumber}
            </button>
          ))}

          <button
            type="button"
            onClick={() => {
              if (page < totalPages) {
                setPage(page + 1);
              }
            }}
            disabled={page >= totalPages}
            className={`w-7 h-7 flex items-center justify-center rounded-md ${
              page >= totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-[#8B0502] text-white cursor-pointer"
            }`}
          >
            <ChevronRight size={14} />
          </button>

        </div>

      </main>

    </div>
  );
}

export default Berita;