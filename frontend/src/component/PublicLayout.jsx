import { Outlet } from "react-router-dom";

import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDE4]">

      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

    </div>
  );
}

export default PublicLayout;