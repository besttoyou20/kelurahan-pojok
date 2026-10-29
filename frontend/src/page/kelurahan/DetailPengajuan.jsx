import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import ProfileBadgeKelurahan from "../../component/kelurahan/ProfileBadgeKelurahan";

function DetailPengajuan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const [pengajuan, setPengajuan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  // =========================
  // PDF
  // =========================
  const [pdfUrl, setPdfUrl] = useState("");
  const [loadingPdf, setLoadingPdf] = useState(true);

  // =========================
  // AMBIL DETAIL PENGAJUAN
  // =========================
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${API_URL}/api/pengajuan-surat/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPengajuan(response.data.data);
      } catch (error) {
        console.error(
          "Error mengambil detail pengajuan:",
          error
        );

        alert(
          error.response?.data?.message ||
            "Gagal mengambil detail pengajuan"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  // =========================
  // AMBIL PDF
  // =========================
  useEffect(() => {
    let blobUrl = "";

    const fetchPdf = async () => {
      try {
        setLoadingPdf(true);

        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${API_URL}/api/pengajuan-surat/${id}/generate`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: "blob",
          }
        );

        blobUrl = URL.createObjectURL(response.data);

        setPdfUrl(blobUrl);
      } catch (error) {
        console.error(
          "Error mengambil PDF:",
          error
        );
      } finally {
        setLoadingPdf(false);
      }
    };

    fetchPdf();

    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [id]);

  // =========================
  // TANDAI SELESAI
  // =========================
  const handleTandaiSelesai = async () => {
  try {
    setLoadingStatus(true);

    const token = localStorage.getItem("token");

    await axios.put(
      `${API_URL}/api/pengajuan-surat/${id}/status`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setPengajuan((prev) => ({
      ...prev,
      status: "selesai",
    }));

    setShowConfirmModal(false);

    alert("Pengajuan surat berhasil ditandai selesai");
  } catch (error) {
    console.error(
      "Error mengubah status pengajuan:",
      error
    );

    alert(
      error.response?.data?.message ||
        "Gagal mengubah status pengajuan"
    );
  } finally {
    setLoadingStatus(false);
  }
};

  // =========================
  // LOADING DETAIL
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen bg-white px-9 py-8">
        <div className="text-sm text-gray-500">
          Memuat detail surat...
        </div>
      </div>
    );
  }

  // =========================
  // DATA TIDAK DITEMUKAN
  // =========================
  if (!pengajuan) {
    return (
      <div className="min-h-screen bg-white px-9 py-8">
        <button
          type="button"
          onClick={() =>
            navigate("/pengajuan-surat-kelurahan")
          }
          className="flex items-center gap-2 text-sm text-[#8B0502] cursor-pointer"
        >
          <ArrowLeft size={18} />
          Kembali
        </button>

        <p className="mt-6 text-sm text-gray-500">
          Data pengajuan tidak ditemukan.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-9 py-8">

      {/* =========================
          HEADER
      ========================= */}
      <div className="flex items-center justify-between mb-7">

        <div className="flex items-center gap-3">

          <button
            type="button"
            onClick={() =>
              navigate("/pengajuan-surat-kelurahan")
            }
            className="
              flex
              items-center
              justify-center
              w-9
              h-9
              rounded-lg
              text-[#8B0502]
              hover:bg-[#FFFBCF]
              transition
              cursor-pointer
            "
            title="Kembali"
          >
            <ArrowLeft size={22} />
          </button>

          <h1 className="text-2xl font-semibold text-[#8B0502]">
            Detail Surat
          </h1>

        </div>

        <ProfileBadgeKelurahan />

      </div>

      {/* =========================
          INFORMASI PENGAJUAN
      ========================= */}
      <div className="flex items-start justify-between mb-5">

        {/* INFORMASI */}
        <div className="text-sm text-[#8B0502] space-y-2">

          {/* RT / RW */}
          <div className="flex items-center">
            <span className="w-24 font-semibold">
              RT / RW
            </span>

            <span className="font-medium ">
              {pengajuan.nomor_rt || "-"} /{" "}
              {pengajuan.nomor_rw || "-"}
            </span>
          </div>

          {/* PEMOHON */}
          <div className="flex items-center">
            <span className="w-24 font-semibold">
              Pemohon
            </span>

            <span className="font-medium ">
              {pengajuan.nama_lengkap || "-"}
            </span>
          </div>

        </div>

        {/* =========================
            STATUS + BUTTON
        ========================= */}
        <div className="flex items-center gap-3">

          {/* STATUS SELESAI */}
          {pengajuan.status === "selesai" && (
            <span
              className="
                inline-flex
                items-center
                rounded-full
                px-4
                py-2
                text-xs
                font-medium
                bg-green-100
                text-green-700
              "
            >
              Selesai
            </span>
          )}

          {/* TANDAI SELESAI */}
          {pengajuan.status === "diajukan" && (
            <button
              type="button"
              onClick={() => setShowConfirmModal(true)}
              disabled={loadingStatus}
              className="
                px-5
                py-2
                bg-[#FFC83D]
                border
                border-[#8B0502]
                rounded-lg
                text-xs
                font-medium
                text-[#8B0502]
                hover:bg-[#FFB82E]
                transition
                cursor-pointer
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {loadingStatus
                ? "Memproses..."
                : "Tandai Selesai"}
            </button>
          )}

        </div>

      </div>

      {/* =========================
          PREVIEW SURAT
      ========================= */}
      <div className="border border-[#D6D6D6] rounded-lg overflow-hidden">

        {/* JUDUL PREVIEW */}
        

        {/* PDF */}
        <div className="bg-[#F3F3F3] flex justify-center px-6 py-4">

          {loadingPdf && (
            <div className="w-full max-w-3xl h-175 bg-white flex items-center justify-center">
              <p className="text-sm text-gray-500">
                Memuat preview surat...
              </p>
            </div>
          )}

          {!loadingPdf && pdfUrl && (
            <iframe
  src={pdfUrl}
  title="Detail Surat Pengantar"
  className="
    w-full
    h-175
    bg-white
  "
/>
          )}

          {!loadingPdf && !pdfUrl && (
            <div className="w-full max-w-3xl h-175 bg-white flex items-center justify-center">
              <p className="text-sm text-red-500">
                Gagal memuat preview surat.
              </p>
            </div>
          )}

        </div>

      </div>

      {/* =========================
    CONFIRMATION MODAL
========================= */}
{showConfirmModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">

    {/* Overlay */}
    <div
      className="absolute inset-0 bg-black/30"
      onClick={() => {
        if (!loadingStatus) {
          setShowConfirmModal(false);
        }
      }}
    />

    {/* Modal */}
    <div className="relative w-100 bg-white rounded-2xl border border-[#8B0502] shadow-xl px-7 py-6">

      {/* Judul */}
      <h2 className="text-lg font-semibold text-[#8B0502]">
        Tandai Pengajuan Selesai
      </h2>

      {/* Deskripsi */}
      <p className="mt-3 text-sm text-gray-600 leading-relaxed">
        Apakah pengajuan surat ini sudah selesai?
      </p>

      {/* Info pemohon */}
      <div className="mt-4 bg-[#FFFBCF] rounded-lg px-4 py-3">
        <p className="text-xs text-gray-500">
          Pemohon
        </p>

        <p className="text-sm font-medium text-[#8B0502] mt-1">
          {pengajuan.nama_lengkap}
        </p>
      </div>

      {/* Button */}
      <div className="flex justify-end gap-3 mt-6">

        {/* Batal */}
        <button
          type="button"
          onClick={() => setShowConfirmModal(false)}
          disabled={loadingStatus}
          className="
            px-5
            py-2
            rounded-lg
            border
            border-[#E7B9A7]
            bg-white
            text-xs
            font-medium
            text-[#8B0502]
            hover:bg-[#FFFBCF]
            transition
            cursor-pointer
            disabled:opacity-60
          "
        >
          Batal
        </button>

        {/* Konfirmasi */}
        <button
          type="button"
          onClick={handleTandaiSelesai}
          disabled={loadingStatus}
          className="
            px-5
            py-2
            rounded-lg
            bg-[#FFC83D]
            border
            border-[#8B0502]
            text-xs
            font-medium
            text-[#8B0502]
            hover:bg-[#FFB82E]
            transition
            cursor-pointer
            disabled:opacity-60
            disabled:cursor-not-allowed
          "
        >
          {loadingStatus
            ? "Memproses..."
            : "Tandai Selesai"}
        </button>

      </div>

    </div>

  </div>
)}

    </div>
  );
}

export default DetailPengajuan;