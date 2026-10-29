import Pojok from "../assets/pojok.png";
import { Link, NavLink, useLocation  } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [openLayanan, setOpenLayanan] = useState(false);
  const location = useLocation();

const isActive =
  location.pathname.startsWith("/layanan") ||
  location.pathname.startsWith("/login-rt") ||
  location.pathname.startsWith("/login-kelurahan");
  return (
   <nav className="sticky top-0 left-0 w-full z-50 bg-[#FFFDE4]/90 shadow-sm backdrop-blur-sm">
      <div className="w-full max-w-350 mx-auto px-4 sm:px-6 lg:px-8 py-2">

        <div className="flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-3">
            <img
              src={Pojok}
              alt="Logo"
              className="w-15 lg:w-24 h-auto"
            />

            <span className="lg:text-2xl text-medium font-extrabold text-[#8B0502]">
              Kelurahan Pojok
            </span>
          </div>


          {/* HAMBURGER - MUNCUL DI MOBILE */}
          <button
            type="button"
            className="lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {/* garis 1 */}
            <span
              className={`block w-8 h-1 bg-[#8B0502] rounded transition-all duration-300 ${
                open ? "rotate-45 translate-y-2.5" : ""
              }`}
            />

            {/* garis 2 */}
            <span
              className={`block w-8 h-1 bg-[#8B0502] rounded my-1.5 transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />

            {/* garis 3 */}
            <span
              className={`block w-8 h-1 bg-[#8B0502] rounded transition-all duration-300 ${
                open ? "-rotate-45 -translate-y-2.5" : ""
              }`}
            />
          </button>


          {/* MENU DESKTOP */}
          <div className="hidden lg:flex items-center gap-20">

            <NavLink to="/" className={({ isActive }) => `text-2xl font-bold ${ isActive ? "text-[#B3910B]" : "text-[#8B0502]"}`}>
              Beranda
            </NavLink>

            <NavLink to="/profil" className={({ isActive }) => `text-2xl font-bold ${ isActive ? "text-[#B3910B]" : "text-[#8B0502]"}`}>
              Profil
            </NavLink>

            <NavLink to="/berita" className={({ isActive }) => `text-2xl font-bold ${ isActive ? "text-[#B3910B]" : "text-[#8B0502]"}`}>
              Berita
            </NavLink>
            <div className="relative">
              <button type="button" onClick={() => setOpenLayanan(!openLayanan)} className={`text-2xl font-bold cursor-pointer ${isActive || openLayanan ? "text-[#B3910B]" : "text-[#8B0502]"}`}>
                Layanan
              </button>

              {openLayanan && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-7 w-60 bg-[#FFFBC6] rounded-xl shadow-lg border border-[#E8D98A] p-3 z-50">
            <div className="flex flex-col py-3">
               <Link to="/layanan" onClick={() => setOpenLayanan(false)} className="block bg-[#FFB82E] rounded-xl px-3 py-1 mt-3 mb-5 text-sm font-semibold text-[#8B0502] hover:bg-[#FFD166] border-[#8B0502] border">
                  Informasi Layanan
                </Link>
                <Link to="/login-rt" onClick={() => setOpenLayanan(false)} className="block bg-[#FFB82E] rounded-xl px-3 py-1 mb-5 text-sm font-semibold text-[#8B0502] hover:bg-[#FFD166] border-[#8B0502] border">
                  Login RT
                </Link>
                <Link to="/login-kelurahan" onClick={() => setOpenLayanan(false)} className="block bg-[#FFB82E] rounded-xl px-3 py-1 mb-3  text-sm font-semibold text-[#8B0502] hover:bg-[#FFD166] border-[#8B0502] border">
                  Login Kelurahan
                </Link>
            </div>
          </div>
        )}
            </div>


          </div>

        </div>

        


        {/* MENU MOBILE */}
        {open && (
          <div className="lg:hidden mt-4 bg-[#FFFBC6] rounded-xl shadow-lg relative z-50">

            <div className="flex flex-col py-3">

              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="px-6 py-3 text-lg font-bold text-[#8B0502]  transition-colors duration-200 hover:text-[#B3910B]"
              >
                Beranda
              </Link>

              <Link
                to="/profil"
                onClick={() => setOpen(false)}
                className="px-6 py-3 text-lg font-bold text-[#8B0502] transition-colors duration-200 hover:text-[#B3910B]"
              >
                Profil
              </Link>

              <Link
                to="/berita"
                onClick={() => setOpen(false)}
                className="px-6 py-3 text-lg font-bold text-[#8B0502] hover:text-[#B3910B]"
              >
                Berita
              </Link>

             {/* LAYANAN MOBILE */}
             <div>
              <button type="button" onClick={() => setOpenLayanan(!openLayanan)} className="w-full text-left px-6 py-3 text-lg font-bold text-[#8B0502] hover:text-[#B3910B]">Layanan</button>

                {/* DROPDOWN LAYANAN */}
                {openLayanan && (
                  <div className="flex flex-col bg-[#FFFBC6] px-6 pb-2">

                    <Link
                      to="/layanan"
                      onClick={() => {
                        setOpenLayanan(false);
                        setOpen(false);
                      }}
                      className="px-4 py-2 text-base font-semibold text-[#8B0502] hover:text-[#B3910B]"
                    >
                      Informasi Layanan
                    </Link>

                    <Link
                      to="/login-rt"
                      onClick={() => {
                        setOpenLayanan(false);
                        setOpen(false);
                      }}
                      className="px-4 py-2 text-base font-semibold text-[#8B0502] hover:text-[#B3910B]"
                    >
                      Login RT
                    </Link>

                    <Link
                      to="/login-kelurahan"
                      onClick={() => {
                        setOpenLayanan(false);
                        setOpen(false);
                      }}
                      className="px-4 py-2 text-base font-semibold text-[#8B0502] hover:text-[#B3910B]"
                    >
                      Login Kelurahan
                    </Link>

                  </div>
                )}
              </div>

              <Link
                to="/kontak"
                onClick={() => setOpen(false)}
                className="px-6 py-3 text-lg font-bold text-[#8B0502] hover:text-[#B3910B]"
              >
                Kontak
              </Link>

            </div>

          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;