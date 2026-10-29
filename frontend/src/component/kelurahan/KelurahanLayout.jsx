import { Outlet } from "react-router-dom";
import SidebarKelurahan from "./SidebarKelurahan.jsx";

function KelurahanLayout() {
  return (
    <div className="min-h-screen flex bg-white">
      
      {/* Sidebar tetap */}
      <SidebarKelurahan />

      {/* Isi halaman berubah sesuai route */}
      <main className="flex-1">
        <Outlet />
      </main>

    </div>
  );
}

export default KelurahanLayout;