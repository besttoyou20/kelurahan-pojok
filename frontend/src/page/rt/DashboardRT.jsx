import {useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import ProfileBadge from "../../component/rt/ProfileBadge.jsx";
import {TriangleAlert, BadgeCheck, FileText } from "lucide-react"
import axios from "axios";
function DashboardRT(){
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;
const [dashboard, setDashboard] = useState({
    totalPengajuan: 0,
    diajukan: 0,
    selesai: 0,
});

const [loading, setLoading] = useState(true);
    const [profil, setProfil] = useState(null);

    const username = profil?.username || "User";
    const KetuaRT = profil?.namaKetuaRT || "Ketua RT";
    const sudahTandaTangan = Boolean(profil?.tandaTangan);
    
useEffect(() => {
    const fetchData = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const [hasilProfil, hasilDashboard] = await Promise.allSettled([
            axios.get(`${API_URL}/api/auth/me`, config),
            axios.get(`${API_URL}/api/dashboard-rt`, config),
        ]);

        if (hasilProfil.status === "fulfilled") {
            setProfil(hasilProfil.value.data.data);
        } else {
            console.error(
                "Error mengambil profil RT:",
                hasilProfil.reason
            );
        }

        if (hasilDashboard.status === "fulfilled") {
            setDashboard(hasilDashboard.value.data.data);
        } else {
            console.error(
                "Error mengambil data dashboard:",
                hasilDashboard.reason
            );
        }

        setLoading(false);
    };

    fetchData();
}, []);
   return(
    <div className="min-h-screen px-10  py-8">
       <div className="flex items-center justify-between mb-15">
        <h1 className="text-3xl font-semibold text-[#8B0502]  ">
          Dashboard
        </h1>

        <ProfileBadge/>
      </div>

      <div className="bg-[#FFFBCF] shadow-xs shadow-[#8B0502] rounded-xl px-6 py-5 pt-10 ">
        <h2 className="text-3xl font-medium text-[#8B0502] ">
            Selamat Datang, <span className="font-bold">{KetuaRT}</span>!
        </h2>

        {loading && !profil ? (
            <p className="mt-3 text-sm text-[#8B0502]">
                Memuat profil...
            </p>
        ) : !profil ? (
            <p className="mt-3 text-sm text-[#8B0502]">
                Profil gagal dimuat. Silakan muat ulang halaman.
            </p>
        ) : !sudahTandaTangan ? (
            <>
            <p className="mt-3 text-sm font-semibold text-[#8B0502]">
                <TriangleAlert size={16} className="inline-block mr-1" />
                Profil Belum Lengkap.
            </p>
            <p className="mt-1 text-xs text-[#8B0502]">
                Tanda tangan Ketua RT belum ditambahkan
            </p>
            <p className="mt-1 text-xs text-[#8B0502]">
                Tanda tangan diperlukan untuk pengajuan surat pengantar
            </p>
            <div className="flex justify-end mt-3">
                <button type="button" onClick={() => navigate("/profil-rt")} className="px-3 py-2 bg-[#FFC83D] border border-[#8B0502] text-[#8B0502] text-sm font-medium rounded-md cursor-pointer">
                    Tambahkan Tanda Tangan
                </button>
            </div>
            </>
        ) : (
            <>
            <p className="mt-5 text-xs text-[#8B0502]">
                <BadgeCheck size={16} className="inline-block mr-1" />
                Profil anda sudah lengkap. Tanda tangan Ketua RT telah ditambahkan.
            </p>
            <p className="text-[#8B0502] text-medium mt-3 font-semibold mb-6">
                Berikut ringkasan aktivitas pengajuan surat anda
            </p>
            <div className="grid grid-cols-3 mt-10 gap-5">

    {/* Total Pengajuan */}
    <div className="bg-white rounded-xl border border-[#E7B9A7] px-5 py-10">
        <div className="flex items-center gap-2 text-[#8B0502]">
            <FileText size={20} />
            <p className="text-sm font-medium">
                Total Pengajuan
            </p>
        </div>

        <p className="text-3xl font-bold text-[#8B0502] mt-3">
            {loading ? "..." : dashboard.totalPengajuan}
        </p>
    </div>

    {/* Diajukan */}
    <div className="bg-white rounded-xl border border-[#E7B9A7] px-5 py-10">
        <div className="flex  gap-2 text-[#8B0502]">
            <TriangleAlert size={20} />
            <p className="text-sm font-medium">
                Diajukan
            </p>
        </div>

        <p className="text-3xl items-center font-bold text-[#8B0502] mt-3">
            {loading ? "..." : dashboard.diajukan}
        </p>
    </div>

    {/* Selesai */}
    <div className="bg-white rounded-xl border border-[#E7B9A7] px-5 py-10">
        <div className="flex items-center gap-2 text-[#8B0502]">
            <BadgeCheck size={20} />
            <p className="text-sm font-medium">
                Selesai
            </p>
        </div>

        <p className="text-3xl font-bold text-[#8B0502] mt-3">
            {loading ? "..." : dashboard.selesai}
        </p>
    </div>

</div>

<div className="flex justify-end gap-3 mt-10">

    <button
        type="button"
        onClick={() => navigate("/pengajuan-surat")}
        className="px-4 py-2 bg-[#FFC83D] border border-[#8B0502] text-[#8B0502] text-sm font-medium rounded-md hover:bg-[#F2B82F] transition cursor-pointer"
    >
        Ajukan Surat Pengantar
    </button>

    <button
        type="button"
        onClick={() => navigate("/riwayat-pengajuan")}
        className="px-4 py-2 bg-[#FFC83D] border border-[#8B0502] text-[#8B0502] text-sm font-medium rounded-md hover:bg-[#F2B82F] transition cursor-pointer"
    >
        Riwayat Pengajuan
    </button>

</div>
            </>
            
           
        )}
      </div>
    </div>

   ) 
}
export default DashboardRT;