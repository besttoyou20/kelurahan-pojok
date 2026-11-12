
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ProfileBadge from "../../component/rt/ProfileBadge.jsx";
import { ArrowLeft } from "lucide-react";

function PreviewSurat() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [pdfUrl, setPdfUrl] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    let objectUrl;

    const generatePDF = async () => {
      try {
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

        objectUrl = URL.createObjectURL(
          new Blob([response.data], {
            type: "application/pdf",
          })
        );

        setPdfUrl(objectUrl);
      } catch (error) {
        console.error("Error generate surat:", error);
        alert("Gagal menampilkan surat");
      }
    };

    generatePDF();

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [id]);

  return (
    <div className="min-h-screen bg-[#FFFDE9] px-3 py-5 sm:px-6 sm:py-8 lg:px-9">

      {/* Header */}
      <div className="flex flex-col gap-4 mb-5 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex flex-wrap items-center gap-3 sm:gap-4">

          <button
            type="button"
            onClick={() => navigate("/riwayat-pengajuan")}
            className="flex items-center gap-2 text-xs sm:text-sm text-[#8B0502] hover:text-[#6F0402] transition cursor-pointer"
          >
            <ArrowLeft size={18} />
            Kembali
          </button>

          <h1 className="text-lg sm:text-2xl font-semibold text-[#8B0502]">
            Pengajuan Surat
          </h1>

        </div>

        <div className="self-end sm:self-auto">
          <ProfileBadge />
        </div>

      </div>

      {/* Status */}
      <div className="mb-4">
        <p className="text-xs sm:text-sm text-[#8B0502]">
          Status :{" "}
          <span className="font-semibold">
            Berhasil Diajukan ke Kelurahan
          </span>
        </p>
      </div>

      {/* Preview Card */}
      <div className="w-full max-w-225 mx-auto border border-[#E7B9A7] rounded-xl bg-[#FFFDE9] p-3 sm:p-5">

        <h2 className="text-sm font-semibold text-[#8B0502] mb-3">
          Preview Surat Pengantar
        </h2>

        {/* PDF */}
        <div className="w-full h-125 sm:h-162.5 lg:h-175 bg-white border border-gray-300 overflow-hidden">

          {pdfUrl ? (
            <iframe
              src={pdfUrl}
              title="Preview Surat Pengantar"
              className="w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-sm text-gray-500">
                Memuat surat...
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default PreviewSurat;
