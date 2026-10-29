import {useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  FileText,
  Share2,
  Newspaper,
  ClipboardList,
  User,
  LogOut,
} from "lucide-react";
import Pojok from "../../assets/pojok.png";

function SidebarKelurahan() {
  const navigate = useNavigate();
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login-kelurahan");
  };

  return (
    <aside className="w-60 min-h-screen bg-[#faf9e8] border-r border-gray-200 rounded-xl px-4 py-6">

      {/* LOGO */}
      <div className="flex justify-center">
        <img src={Pojok} alt="Logo" className="w-30" />
      </div>

      {/* MENU */}
      <p className="text-[12px] text-[#8B0502] mb-1">
        Menu
      </p>

      <div className="space-y-2">

        {/* DASHBOARD */}
        <NavLink
          to="/dashboard-kelurahan"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 w-full h-9 bg-[#FFC83D] rounded-lg px-3 text-[12px] font-medium text-[#8B0502] shadow-[#8B0502] shadow-sm"
              : "flex items-center gap-2 w-full h-9 bg-[#FFFDE9] border border-[#E7B9A7] rounded-lg px-3 text-[12px] font-medium text-[#8B0502] shadow-[#8B0502] shadow-sm"
          }
        >
          <Home size={14} />
          Dashboard
        </NavLink>

        {/* PENGAJUAN SURAT */}
        <NavLink
          to="/pengajuan-surat-kelurahan"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 w-full h-9 bg-[#FFC83D] rounded-lg px-3 text-[12px] font-medium text-[#8B0502] shadow-[#8B0502] shadow-sm"
              : "flex items-center gap-2 w-full h-9 bg-[#FFFDE9] border border-[#E7B9A7] rounded-lg px-3 text-[12px] font-medium text-[#8B0502] shadow-[#8B0502] shadow-sm"
          }
        >
          <FileText size={14} />
          Pengajuan Surat
        </NavLink>
        {/* BERITA */}
        <NavLink
          to="/kelola-berita"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 w-full h-9 bg-[#FFC83D] rounded-lg px-3 text-[12px] font-medium text-[#8B0502] shadow-[#8B0502] shadow-sm"
              : "flex items-center gap-2 w-full h-9 bg-[#FFFDE9] border border-[#E7B9A7] rounded-lg px-3 text-[12px] font-medium text-[#8B0502] shadow-[#8B0502] shadow-sm"
          }
        >
          <Newspaper size={14} />
          Kelola Berita
        </NavLink>

        {/* CATATAN KEMATIAN */}
        <NavLink
          to="/catatan-kematian"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 w-full h-9 bg-[#FFC83D] rounded-lg px-3 text-[12px] font-medium text-[#8B0502] shadow-[#8B0502] shadow-sm"
              : "flex items-center gap-2 w-full h-9 bg-[#FFFDE9] border border-[#E7B9A7] rounded-lg px-3 text-[12px] font-medium text-[#8B0502] shadow-[#8B0502] shadow-sm"
          }
        >
          <ClipboardList size={14} />
          Catatan Kematian
        </NavLink>
           <NavLink
          to="/kelola-kode-registrasi"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 w-full h-9 bg-[#FFC83D] rounded-lg px-3 text-[12px] font-medium text-[#8B0502] shadow-[#8B0502] shadow-sm"
              : "flex items-center gap-2 w-full h-9 bg-[#FFFDE9] border border-[#E7B9A7] rounded-lg px-3 text-[12px] font-medium text-[#8B0502] shadow-[#8B0502] shadow-sm"
          }
        >
          <ClipboardList size={14} />
          Kelola Kode Registrasi
        </NavLink>

      </div>

      {/* OTHER */}
      <p className="text-[12px] text-[#8B0502] mt-5 mb-1 border-b border-[#E7B9A7] pb-1">
        Other
      </p>

      <div className="space-y-2">

        {/* PROFIL */}
        <NavLink
          to="/profil-kelurahan"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 w-full h-9 bg-[#FFC83D] rounded-lg px-3 text-[12px] font-medium text-[#8B0502]"
              : "flex items-center gap-2 w-full h-9 bg-[#FFFDE9] border border-[#E7B9A7] rounded-lg px-3 text-[12px] font-medium text-[#8B0502] shadow-[#8B0502] shadow-sm"
          }
        >
          <User size={14} />
          Profil
        </NavLink>

        {/* LOG OUT */}
        <button
          type="button"
          onClick={() => setShowLogoutPopup(true)}
          className="flex items-center gap-2 w-full h-9 bg-[#FFFDE9] border border-[#E7B9A7] rounded-lg px-3 text-[12px] font-medium text-[#8B0502] shadow-[#8B0502] shadow-sm cursor-pointer"
        >
          <LogOut size={14} />
          Log Out
        </button>

      </div>
      {showLogoutPopup && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
    <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
        <span className="text-3xl text-red-600">!</span>
      </div>

      <h2 className="mb-2 text-xl font-bold text-[#8B0502]">
        Konfirmasi Logout
      </h2>

      <p className="mb-6 text-sm text-gray-600">
        Apakah kamu yakin ingin keluar dari akun RT?
      </p>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setShowLogoutPopup(false)}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-600 hover:bg-gray-100"
        >
          Batal
        </button>

        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login-rt", { replace: true });
          }}
          className="flex-1 rounded-lg bg-[#8B0502] px-4 py-2.5 font-semibold text-white hover:bg-[#6F0401]"
        >
          Ya, Logout
        </button>
      </div>
    </div>
  </div>
)}

    </aside>
  );
}

export default SidebarKelurahan;