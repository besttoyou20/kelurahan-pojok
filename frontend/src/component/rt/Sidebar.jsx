
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  FileText,
  History,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Pojok from "../../assets/pojok.png";

function Sidebar() {
  const navigate = useNavigate();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login-rt", { replace: true });
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  const menuContent = (
    <>
      <p className="text-[12px] text-[#8B0502] mb-2 lg:mb-1">
        Menu
      </p>

      <div className="flex flex-col gap-2">
        <NavLink
          to="/dashboard-rt"
          onClick={closeMobileMenu}
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 w-full min-h-9 bg-[#FFC83D] rounded-lg px-2 sm:px-3 text-[11px] sm:text-[12px] font-medium text-[#8B0502] shadow-[#8B0502] shadow-sm"
              : "flex items-center gap-2 w-full min-h-9 bg-[#FFFDE9] border border-[#E7B9A7] rounded-lg px-2 sm:px-3 text-[11px] sm:text-[12px] font-medium text-[#8B0502] shadow-[#8B0502] shadow-sm"
          }
        >
          <Home size={14} className="shrink-0" />
          Dashboard
        </NavLink>

        <NavLink
          to="/pengajuan-surat"
          onClick={closeMobileMenu}
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 w-full min-h-9 bg-[#FFC83D] rounded-lg px-2 sm:px-3 text-[11px] sm:text-[12px] font-medium text-[#8B0502] shadow-[#8B0502] shadow-sm"
              : "flex items-center gap-2 w-full min-h-9 bg-[#FFFDE9] border border-[#E7B9A7] rounded-lg px-2 sm:px-3 text-[11px] sm:text-[12px] font-medium text-[#8B0502] shadow-[#8B0502] shadow-sm"
          }
        >
          <FileText size={14} className="shrink-0" />
          Pengajuan Surat
        </NavLink>

        <NavLink
          to="/riwayat-pengajuan"
          onClick={closeMobileMenu}
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 w-full min-h-9 bg-[#FFC83D] rounded-lg px-2 sm:px-3 text-[11px] sm:text-[12px] font-medium text-[#8B0502] shadow-[#8B0502] shadow-sm"
              : "flex items-center gap-2 w-full min-h-9 bg-[#FFFDE9] border border-[#E7B9A7] rounded-lg px-2 sm:px-3 text-[11px] sm:text-[12px] font-medium text-[#8B0502] shadow-[#8B0502] shadow-sm"
          }
        >
          <History size={14} className="shrink-0" />
          Riwayat Pengajuan
        </NavLink>
      </div>

      <p className="text-[12px] text-[#8B0502] mt-5 mb-2 lg:mb-1 border-b border-[#E7B9A7] pb-1">
        Other
      </p>

      <div className="flex flex-col gap-2">
        <NavLink
          to="/profil-rt"
          onClick={closeMobileMenu}
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 w-full min-h-9 bg-[#FFC83D] rounded-lg px-2 sm:px-3 text-[11px] sm:text-[12px] font-medium text-[#8B0502]"
              : "flex items-center gap-2 w-full min-h-9 bg-[#FFFDE9] border border-[#E7B9A7] rounded-lg px-2 sm:px-3 text-[11px] sm:text-[12px] font-medium text-[#8B0502] shadow-[#8B0502] shadow-sm"
          }
        >
          <User size={14} className="shrink-0" />
          Profil
        </NavLink>

        <button
          type="button"
          onClick={() => {
            setShowMobileMenu(false);
            setShowLogoutPopup(true);
          }}
          className="flex items-center gap-2 w-full min-h-9 bg-[#FFFDE9] border border-[#E7B9A7] rounded-lg px-2 sm:px-3 text-[11px] sm:text-[12px] font-medium text-[#8B0502] shadow-[#8B0502] shadow-sm cursor-pointer"
        >
          <LogOut size={14} className="shrink-0" />
          Log Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* HEADER MOBILE */}
      <div className="flex items-center justify-between w-full px-4 py-2 bg-[#FFFBCF] border border-[#8B0502] rounded-xl lg:hidden">
        <img
          src={Pojok}
          alt="Logo"
          className="w-16 h-12 object-contain"
        />

        <button
          type="button"
          onClick={() => setShowMobileMenu(true)}
          className="flex items-center justify-center rounded-lg p-1.5 text-[#8B0502] hover:bg-[#FFC83D] transition cursor-pointer"
          aria-label="Buka menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* OVERLAY MOBILE */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* BACKDROP */}
          <button
            type="button"
            onClick={closeMobileMenu}
            aria-label="Tutup menu"
            className="absolute inset-0 w-full h-full bg-black/40"
          />

          {/* SIDEBAR PANEL */}
          <div className="absolute top-0 right-0 w-[85%] max-w-[320px] h-full overflow-y-auto bg-[#FFFBCF] border-r border-[#8B0502] rounded-r-xl px-4 py-3 shadow-xl">
            <div className="flex items-center justify-between mb-5">
             

              <button
                type="button"
                onClick={closeMobileMenu}
                className="flex items-center justify-center rounded-lg p-1.5 text-[#8B0502] hover:bg-[#FFC83D] transition cursor-pointer"
                aria-label="Tutup menu"
              >
                <X size={24} />
              </button>
            </div>

            {menuContent}
          </div>
        </div>
      )}

      {/* SIDEBAR DESKTOP */}
      <aside className="hidden lg:flex lg:flex-col lg:w-50 lg:min-h-screen shrink-0 bg-[#FFFBCF] border-r border-[#8B0502] rounded-xl px-3 py-6">
        <div className="flex justify-center mb-5">
          <img
            src={Pojok}
            alt="Logo"
            className="w-30 h-auto object-contain"
          />
        </div>

        {menuContent}
      </aside>

      {/* POPUP LOGOUT */}
      {showLogoutPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 sm:p-6 text-center shadow-2xl">
            <div className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-red-100">
              <span className="text-3xl text-red-600">!</span>
            </div>

            <h2 className="mb-2 text-lg sm:text-xl font-bold text-[#8B0502]">
              Konfirmasi Logout
            </h2>

            <p className="mb-6 text-sm text-gray-600">
              Apakah kamu yakin ingin keluar dari akun RT?
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowLogoutPopup(false)}
                className="flex-1 rounded-lg border border-gray-300 px-3 sm:px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="flex-1 rounded-lg bg-[#8B0502] px-3 sm:px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#6F0401]"
              >
                Ya, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
