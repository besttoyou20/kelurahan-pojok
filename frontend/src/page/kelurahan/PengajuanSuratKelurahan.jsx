import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CalendarDays,
  Search,
  FileText,
} from "lucide-react";
import ProfileBadgeKelurahan from "../../component/kelurahan/ProfileBadgeKelurahan.jsx";

function PengajuanSuratKelurahan() {
  const navigate = useNavigate();

  const [pengajuan, setPengajuan] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // Filter
  // =========================
  const [tanggal, setTanggal] = useState("");
  const [nomorRT, setNomorRT] = useState("");
  const [namaPemohon, setNamaPemohon] = useState("");
  const [nomorRW, setNomorRW] = useState("");
  const [status, setStatus] = useState("");

  // =========================
  // Ambil semua pengajuan
  // =========================
  useEffect(() => {
    const fetchPengajuan = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:4000/api/pengajuan-surat/kelurahan",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPengajuan(response.data.data || []);
      } catch (error) {
        console.error(
          "Error mengambil pengajuan surat:",
          error
        );

        alert(
          error.response?.data?.message ||
            "Gagal mengambil pengajuan surat"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPengajuan();
  }, []);

  // =========================
  // Format tanggal
  // =========================
  const formatTanggal = (tanggal) => {
    if (!tanggal) return "-";

    const date = new Date(tanggal);

    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // =========================
  // Filter data
  // =========================
  const dataFiltered = pengajuan.filter((item) => {
    const tanggalItem = item.created_at
      ? new Date(item.created_at)
          .toISOString()
          .split("T")[0]
      : "";

    const cocokTanggal =
      !tanggal || tanggalItem === tanggal;

    const cocokRT =
      !nomorRT ||
      item.nomor_rt
        ?.toLowerCase()
        .includes(nomorRT.toLowerCase());

    const cocokNama =
      !namaPemohon ||
      item.nama_lengkap
        ?.toLowerCase()
        .includes(namaPemohon.toLowerCase());

    const cocokRW =
      !nomorRW ||
      item.nomor_rw
        ?.toLowerCase()
        .includes(nomorRW.toLowerCase());

    const cocokStatus =
      !status || item.status === status;

    return (
      cocokTanggal &&
      cocokRT &&
      cocokNama &&
      cocokRW &&
      cocokStatus
    );
  });

  // =========================
  // Badge status
  // =========================
  const getStatusStyle = (status) => {
    if (status === "selesai") {
      return "bg-green-100 text-green-700";
    }

    return "bg-[#FFF0A8] text-[#8B0502]";
  };

  const getStatusText = (status) => {
    if (status === "selesai") {
      return "Selesai";
    }

    return "Diajukan";
  };

  return (
    <div className="min-h-screen bg-white px-9 py-8">

      {/* =========================
          HEADER
      ========================= */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-[#8B0502]">
          Riwayat Pengajuan
        </h1>

        <ProfileBadgeKelurahan />
      </div>

      {/* =========================
          FILTER
      ========================= */}
      <div className="flex flex-wrap items-center gap-5 mb-4">

        {/* Cari Tanggal */}
        <div className="relative w-33.75">
          <input
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
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

          <CalendarDays
            size={16}
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-gray-500
              pointer-events-none
            "
          />
        </div>

        {/* Cari RT */}
        <div className="relative w-31.5">
          <input
            type="text"
            placeholder="Cari RT"
            value={nomorRT}
            onChange={(e) => setNomorRT(e.target.value)}
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
            "
          />
        </div>

        {/* Cari Pemohon */}
        <div className="relative w-31.5">
          <input
            type="text"
            placeholder="Cari Pemohon"
            value={namaPemohon}
            onChange={(e) => setNamaPemohon(e.target.value)}
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
            "
          />
        </div>

        {/* Cari RW */}
        <div className="relative w-31.5">
          <input
            type="text"
            placeholder="Cari RW"
            value={nomorRW}
            onChange={(e) => setNomorRW(e.target.value)}
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
            "
          />
        </div>

        {/* Filter Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="
            w-33.75
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
        >
          <option value="">Semua Status</option>
          <option value="diajukan">Diajukan</option>
          <option value="selesai">Selesai</option>
        </select>

      </div>

      {/* Garis */}
      <div className="border-t border-[#E7B9A7] mb-4" />

      {/* =========================
          TABEL
      ========================= */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs">

          <thead>
            <tr className="bg-[#F9C63D] text-[#3F1D00]">

              <th className="border border-[#E5D7B0] px-3 py-2 w-11.25">
                No
              </th>

              <th className="border border-[#E5D7B0] px-3 py-2">
                RT/RW
              </th>

              <th className="border border-[#E5D7B0] px-3 py-2">
                Pemohon
              </th>

              <th className="border border-[#E5D7B0] px-3 py-2">
                Tanggal
              </th>

              <th className="border border-[#E5D7B0] px-3 py-2">
                Status
              </th>

              <th className="border border-[#E5D7B0] px-3 py-2">
                Tujuan Surat
              </th>

              <th className="border border-[#E5D7B0] px-3 py-2 w-20">
                Lihat
                <br />
                Surat
              </th>

            </tr>
          </thead>

          <tbody>

            {loading ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-8 text-gray-500"
                >
                  Memuat pengajuan...
                </td>
              </tr>

            ) : dataFiltered.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-8 text-gray-500"
                >
                  Belum ada pengajuan surat
                </td>
              </tr>

            ) : (
              dataFiltered.map((item, index) => (

                <tr
                  key={item.id}
                  className="bg-white hover:bg-[#FFF8D6]"
                >

                  {/* No */}
                  <td className="border border-gray-200 px-3 py-2 text-center">
                    {index + 1}
                  </td>

                  {/* RT/RW */}
                  <td className="border border-gray-200 px-3 py-2 text-center whitespace-nowrap">
                    RT {item.nomor_rt || "-"} / RW{" "}
                    {item.nomor_rw || "-"}
                  </td>

                  {/* Pemohon */}
                  <td className="border border-gray-200 px-3 py-2 text-center">
                    {item.nama_lengkap}
                  </td>

                  {/* Tanggal */}
                  <td className="border border-gray-200 px-3 py-2 text-center whitespace-nowrap">
                    {formatTanggal(item.created_at)}
                  </td>

                  {/* Status */}
                  <td className="border border-gray-200 px-3 py-2 text-center">

                    <span
                      className={`
                        inline-block
                        rounded-full
                        px-3
                        py-2
                        text-[12px]
                        font-medium
                        ${getStatusStyle(item.status)}
                      `}
                    >
                      {getStatusText(item.status)}
                    </span>

                  </td>

                  {/* Tujuan */}
                  <td className="border border-gray-200 px-3 py-2 text-center">
                    {item.tujuan_surat}
                  </td>

                  {/* Lihat Surat */}
                  <td className="border border-gray-200 px-3 py-2 text-center">

                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/detail-pengajuan/${item.id}`
                        )
                      }
                      className="
                        inline-flex
                        items-center
                        gap-1
                        rounded-md
                        bg-[#8B0502]
                        px-3
                        py-2
                        text-[12px]
                        text-white
                        hover:bg-[#6F0402]
                        transition
                        cursor-pointer
                      "
                    >
                      <FileText size={12} />
                      Lihat
                    </button>

                  </td>

                </tr>

              ))
            )}

          </tbody>

        </table>
      </div>

    </div>
  );
}

export default PengajuanSuratKelurahan;