import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ProfileBadge from "../../component/rt/ProfileBadge.jsx";
import { ArrowLeft } from "lucide-react";

function PreviewSurat() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const generatePDF = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:4000/api/pengajuan-surat/${id}/generate`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: "blob",
          }
        );

        const url = URL.createObjectURL(
          new Blob([response.data], {
            type: "application/pdf",
          })
        );

        setPdfUrl(url);
      } catch (error) {
        console.error("Error generate surat:", error);

        alert("Gagal menampilkan surat");
      }
    };

    generatePDF();

    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [id]);

  return (
    <div className="min-h-screen bg-[#FFFDE9] px-9 py-8">

      {/* Header */}
<div className="flex items-center justify-between mb-5">

  <div className="flex items-center gap-4">

    <button
      type="button"
      onClick={() => navigate("/riwayat-pengajuan")}
      className="
        flex
        items-center
        gap-2
        text-sm
        text-[#8B0502]
        hover:text-[#6F0402]
        transition
        cursor-pointer
      "
    >
      <ArrowLeft size={18} />
      Kembali
    </button>

    <h1 className="text-2xl font-semibold text-[#8B0502]">
      Pengajuan Surat
    </h1>

  </div>

  <ProfileBadge />

</div>

      {/* Status */}
      <div className="mb-4">

        <p className="text-xs text-[#8B0502]">
          Status :{" "}
          <span className="font-semibold">
            Berhasil Diajukan ke Kelurahan
          </span>
        </p>

      </div>

      {/* Preview Card */}
      <div className="border border-[#E7B9A7] rounded-xl bg-[#FFFDE9] p-5">

        <h2 className="text-sm font-semibold text-[#8B0502] mb-3">
          Preview Surat Pengantar
        </h2>

        {/* PDF */}
        <div className="w-full h-175 bg-white border border-gray-300">

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