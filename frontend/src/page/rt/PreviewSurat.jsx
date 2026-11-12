
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ProfileBadge from "../../component/rt/ProfileBadge.jsx";
import { ArrowLeft, FileText, Download, ExternalLink } from "lucide-react";

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

        {pdfUrl ? (
          <>
            {/* Tampilan HP */}
            <div className="md:hidden w-full min-h-100 bg-white border border-gray-300 rounded-md p-5 flex flex-col items-center justify-center text-center">

              <FileText
                size={55}
                className="text-[#8B0502] mb-4"
              />

              <p className="text-sm font-semibold text-[#8B0502] mb-2">
                Surat Pengantar Berhasil Dibuat
              </p>

              <p className="text-xs text-gray-500 mb-6">
                Silakan buka atau unduh surat untuk melihat dokumen PDF.
              </p>

              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-70 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-4 rounded-xl transition"
              >
                <ExternalLink size={18} />
                Buka PDF
              </a>

              <a
                href={pdfUrl}
                download={`surat-pengantar-${id}.pdf`}
                className="w-full max-w-70 flex items-center justify-center gap-2 mt-3 border border-[#8B0502] text-[#8B0502] hover:bg-[#FFF5D6] text-sm font-semibold py-4 rounded-xl transition"
              >
                <Download size={18} />
                Download PDF
              </a>

            </div>

            {/* Tampilan Tablet dan Desktop */}
            <div className="hidden md:block w-full h-162.5 lg:h-175 bg-white border border-gray-300 overflow-hidden">

              <iframe
                src={pdfUrl}
                title="Preview Surat Pengantar"
                className="w-full h-full"
              />

            </div>
          </>
        ) : (
          <div className="w-full h-125 flex items-center justify-center bg-white border border-gray-300">
            <p className="text-sm text-gray-500">
              Memuat surat...
            </p>
          </div>
        )}

      </div>

    </div>
  );
}

export default PreviewSurat;
