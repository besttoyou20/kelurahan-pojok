import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";

function RTLayout() {
  return (
    <div className="min-h-screen flex bg-[#FFFDE4]">
      
      {/* Sidebar tetap */}
      <Sidebar />

      {/* Isi halaman berubah sesuai route */}
      <main className="flex-1">
        <Outlet />
      </main>

    </div>
  );
}

export default RTLayout;