import { Plus , Search, Pencil, Trash2, ChevronRight, ChevronLeft} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProfileBadgeKelurahan from "../../component/kelurahan/ProfileBadgeKelurahan.jsx";
import axios from "axios";
function KelolaBerita() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
 const [berita, setBerita] = useState([]);
const [loading, setLoading] = useState(true);
const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedBerita, setSelectedBerita] = useState(null);
const [deleting, setDeleting] = useState(false);
useEffect(() => {
  const fetchBerita = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API_URL}/api/berita?page=${page}`
      );

      setBerita(response.data.data || []);
      setTotalPages(response.data.pagination?.totalPages || 1);
    } catch (error) {
      console.error("Error mengambil berita:", error);
      alert(
        error.response?.data?.message ||
        "Gagal mengambil data berita"
      );
    } finally {
      setLoading(false);
    }
  };

  fetchBerita();
}, [page]);
const formatTanggal = (tanggal) => {
  if (!tanggal) return "-";

  const date = new Date(tanggal);

  return date
    .toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, "-");
};
const handleDelete = async () => {
  if (!selectedBerita) return;

  try {
    setDeleting(true);

    const token = localStorage.getItem("token");

    await axios.delete(
      `${API_URL}/api/berita/${selectedBerita.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setShowDeleteModal(false);
    setSelectedBerita(null);

    // Refresh data halaman saat ini
    const response = await axios.get(
      `${API_URL}/api/berita?page=${page}`
    );

    setBerita(response.data.data || []);
    setTotalPages(response.data.pagination?.totalPages || 1);

  } catch (error) {
    console.error("Error menghapus berita:", error);

    alert(
      error.response?.data?.message ||
      "Gagal menghapus berita"
    );
  } finally {
    setDeleting(false);
  }
};
  return (
    <div className="min-h-screen bg-white p-6">

      {/* HEADER */}
<div className="flex items-center justify-between mb-6">

  {/* JUDUL */}
  <div>
    <h1 className="text-2xl font-semibold text-[#8B0502]">
      Kelola Berita
    </h1>

    
  </div>

  {/* PROFILE */}
  <ProfileBadgeKelurahan />

</div>

{/* FILTER + TAMBAH */}
<div className="flex items-center justify-between mb-4">

  {/* FILTER */}
  <div className="flex items-center gap-5">

    {/* CARI TANGGAL */}
    <div className="relative w-44">
      <input
        type="date"
        className="
          w-full
          h-10
          rounded-md
          border
          border-[#E7B9A7]
          bg-white
          px-3
          text-xs
          text-gray-600
          outline-none
          focus:border-[#8B0502]
        "
      />
    </div>

    {/* CARI JUDUL */}
    <div className="relative w-120">
      <input
        type="text"
        placeholder="Cari Judul"
        className="
          w-full
          h-10
          rounded-md
          border
          border-[#E7B9A7]
          bg-white
          px-3
          pr-8
          text-xs
          outline-none
          focus:border-[#8B0502]
        "
      />

      <Search
        size={16}
        className="
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          text-gray-400
          pointer-events-none
        "
      />
    </div>

  </div>

  {/* TAMBAH BERITA */}
  <button
    type="button"
    onClick={() => navigate("/tambah-berita")}
    className="
      flex
      items-center
      gap-2
      h-10
      px-4
      rounded-md
      bg-[#FFC83D]
      border
      border-[#8B0502]
      text-xs
      font-medium
      text-[#8B0502]
      hover:bg-[#FFB82E]
      transition
      cursor-pointer
    "
  >
    <Plus size={15} />
    Tambah Berita
  </button>

</div>

{/* GARIS */}
<div className="border-t border-[#E7B9A7] mb-4" />

     {/* LIST BERITA */}
<div className="overflow-x-auto">

  <table className="w-full border-collapse text-sm">

    {/* HEADER TABLE */}
    <thead>
      <tr className="bg-[#F9C63D] text-[#3F1D00] text-medium font-semibold">

        <th className="border border-[#E5D7B0] px-3 py-2 w-12">
          No
        </th>

        <th className="border border-[#E5D7B0] px-3 py-2 w-28">
          Tanggal
        </th>

        <th className="border border-[#E5D7B0] px-3 py-2">
          Judul Berita / Kegiatan
        </th>

        <th className="border border-[#E5D7B0] px-3 py-2 w-40">
          Foto
        </th>

        <th className="border border-[#E5D7B0] px-3 py-2 w-28">
          Aksi
        </th>

      </tr>
    </thead>

    {/* ISI TABLE */}
    <tbody>

  {loading ? (

    <tr>
      <td
        colSpan="5"
        className="border border-gray-200 text-center py-8 text-gray-500"
      >
        Memuat berita...
      </td>
    </tr>

  ) : berita.length === 0 ? (

    <tr>
      <td
        colSpan="5"
        className="border border-gray-200 text-center py-8 text-gray-500"
      >
        Belum ada berita
      </td>
    </tr>

  ) : (

    berita.map((item, index) => (

      <tr
        key={item.id}
        className="bg-white hover:bg-[#FFF8D6]"
      >

        {/* NO */}
        <td className="border border-gray-200 px-3 py-2 text-center">
          {index + 1}
        </td>

        {/* TANGGAL */}
        <td className="border border-gray-200 px-3 py-2 text-center whitespace-nowrap">
          {formatTanggal(item.created_at)}
        </td>

        {/* JUDUL */}
        <td className="border border-gray-200 px-3 py-2">
          {item.judul}
        </td>

        {/* FOTO */}
        <td className="border border-gray-200 px-1 py-2 text-center">

          {item.foto ? (
            <img
              src={`${API_URL}${item.foto}`}
              alt={item.judul}
              className="w-40 h-25 object-cover rounded-md mx-auto"
            />
          ) : (
            <span className="text-gray-400">
              Tidak ada foto
            </span>
          )}

        </td>

        {/* AKSI */}
        <td className="border border-gray-200 px-3 py-2">

          <div className="flex items-center justify-center gap-2">

            <button
              type="button"
              onClick={() => navigate(`/edit-berita/${item.id}`)}
              className="
                w-7 h-7
                flex items-center justify-center
                rounded-md
                bg-[#FFC83D]
                text-[#8B0502]
                hover:bg-[#FFB82E]
                transition
                cursor-pointer
              "
              title="Edit"
            >
              <Pencil size={13} />
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedBerita(item);
                setShowDeleteModal(true);
              }}
              className="
                w-7 h-7
                flex items-center justify-center
                rounded-md
                bg-[#8B0502]
                text-white
                hover:bg-[#6F0402]
                transition
                cursor-pointer
              "
              title="Hapus"
            >
              <Trash2 size={13} />
            </button>

          </div>

        </td>

      </tr>

    ))

  )}

</tbody>

  </table>

</div>

<div className="flex justify-center items-center mt-4">

  {/* CHEVRON LEFT */}
  {page > 1 && (
    <button
      type="button"
      onClick={() => setPage(page - 1)}
      className="w-10 h-8 flex items-center justify-center bg-white border border-[#E7B9A7] text-[#8B0502] hover:bg-[#FFF8D6] cursor-pointer"
    >
      <ChevronLeft size={16} />
    </button>
  )}

  {/* NOMOR HALAMAN */}
  {Array.from({ length: totalPages }, (_, index) => index + 1)
    .map((pageNumber) => (
      <button
        key={pageNumber}
        type="button"
        onClick={() => setPage(pageNumber)}
        className={`w-10 h-8 flex items-center justify-center text-xs border-y border-[#E7B9A7] ${
          page === pageNumber
            ? "bg-[#8B0502] text-white border-[#8B0502] cursor-pointer"
            : "bg-white text-[#8B0502] hover:bg-[#FFF8D6] cursor-pointer"
        }`}
      >
        {pageNumber}
      </button>
    ))}

  {/* CHEVRON RIGHT */}
  <button
    type="button"
    onClick={() => {
      if (page < totalPages) {
        setPage(page + 1);
      }
    }}
    disabled={page >= totalPages}
    className={`w-10 h-8 flex items-center justify-center rounded-r-md border border-[#8B0502] ${
      page >= totalPages
        ? "bg-white border border-[#E7B9A7] text-[#8B0502]  cursor-pointer"
        : "bg-white border border-[#E7B9A7] text-[#8B0502] hover:bg-[#8B0502] cursor-pointer"
    }`}
  >
    <ChevronRight size={16} />
  </button>

</div>
{showDeleteModal && selectedBerita && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <div className="w-95 bg-white rounded-xl border border-[#E7B9A7] shadow-lg p-6 text-center">

      <div className="w-12 h-12 mx-auto rounded-full bg-[#FFF4C2] border border-[#FFC83D] flex items-center justify-center mb-4">
        <Trash2 size={22} className="text-[#8B0502]" />
      </div>

      <h3 className="text-lg font-semibold text-[#8B0502]">
        Hapus Berita?
      </h3>

      <p className="text-xs text-gray-500 mt-2">
        Apakah Anda yakin ingin menghapus berita
        <br />
        <span className="font-medium text-gray-700">
          "{selectedBerita.judul}"
        </span>
        ?
      </p>

      <div className="flex justify-center gap-3 mt-6">

        <button
          type="button"
          onClick={() => {
            setShowDeleteModal(false);
            setSelectedBerita(null);
          }}
          disabled={deleting}
          className="h-9 px-6 rounded-md border border-[#8B0502] text-xs font-medium text-[#8B0502] hover:bg-[#FFF8D6] cursor-pointer"
        >
          Batal
        </button>

        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="h-9 px-6 rounded-md bg-[#8B0502] text-xs font-medium text-white hover:bg-[#6F0402] cursor-pointer"
        >
          {deleting ? "Menghapus..." : "Hapus"}
        </button>

      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default KelolaBerita;