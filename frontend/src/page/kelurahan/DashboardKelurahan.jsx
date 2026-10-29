import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Hand, FileText, ClipboardList } from "lucide-react";
import ProfileBadgeKelurahan from "../../component/kelurahan/ProfileBadgeKelurahan.jsx";

function DashboardKelurahan() {
  const [pengajuan, setPengajuan] = useState([]);
  const [loading, setLoading] = useState(true);

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
        console.error("Gagal mengambil ringkasan pengajuan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPengajuan();
  }, []);

  const totalPengajuan = pengajuan.length;
  const diajukan = pengajuan.filter(
    (item) => item.status === "diajukan"
  ).length;
  const selesai = pengajuan.filter(
    (item) => item.status === "selesai"
  ).length;

  return (
    <div className="min-h-screen bg-white
     px-6 py-6 lg:px-9 lg:py-8">
      {/* Header */}
      <div className="mb-10 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold text-[#8B0502]">
          Dashboard
        </h1>

        <ProfileBadgeKelurahan />
      </div>

      {/* Ringkasan */}
      <div className="rounded-xl border border-[#E7B9A7] bg-[#FFFBCF] p-5 sm:p-7 lg:p-8">
        <div className="mb-10 flex items-center gap-3">
          <h2 className="text-xl font-semibold text-[#8B0502] sm:text-2xl">
            Selamat Datang, Admin
          </h2>

          <Hand size={25} className="text-[#8B0502]" />
        </div>

        <div className="grid grid-cols-1 items-stretch gap-10 md:grid-cols-2">
          {/* Pengajuan Surat */}
          <div className=" border border-[#E7B9A7] bg-[#FFFDE4] p-5">
            <div className=" flex min-h-22 flex-col items-center text-center justify-center gap-2 text-[#8B0502]">
              <h3 className="text-lg font-medium">
                Pengajuan Surat Pengantar
              </h3>
            </div>

            <p className="mb-8 text-center text-3xl font-bold text-[#8B0502]">
              {loading ? "..." : totalPengajuan}
            </p>

            <div className="space-y-2 text-md text-[#8B0502] mb-10">
              <div className="flex justify-between border-b border-[#E7B9A7] pb-2">
                <span>Diajukan</span>
                <span>{loading ? "..." : diajukan}</span>
              </div>

              <div className="flex justify-between">
                <span>Selesai</span>
                <span>{loading ? "..." : selesai}</span>
              </div>
            </div>
          </div>
          

          {/* Catatan Kematian */}
          <div className=" border border-[#E7B9A7] bg-[#FFFDE4] p-5">
            <div className="mb-5 flex items-center text-center justify-center gap-2 text-[#8B0502]">
              <h3 className="text-lg font-medium">
                Catatan Kematian
              </h3>
            </div>

            <p className="py-6 text-center text-sm text-[#8B0502]">
              Data menunggu konfirmasi kelurahan.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 mt-6">
            <Link to="/pengajuan-surat" className="mt-5 block w-full  bg-[#FFC83D] py-2 text-center text-sm font-medium text-[#8B0502] hover:bg-[#8B0502]/90 hover:text-white">
              Lihat Semua Pengajuan
            </Link>
            <Link to="/pengajuan-surat" className="mt-5 block w-full  bg-[#FFC83D] py-2 text-center text-sm font-medium text-[#8B0502] hover:bg-[#8B0502]/90 hover:text-white">
              Lihat Data Catatan
            </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardKelurahan;