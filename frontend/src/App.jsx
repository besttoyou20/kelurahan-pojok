import {Routes, Route} from "react-router-dom";
import Home from "./page/public/Home.jsx";
import Berita from "./page/public/Berita.jsx";
import DetailBerita from "./page/public/DetailBerita.jsx";
import PublicLayout from "./component/PublicLayout.jsx";
import Profil from "./page/public/Profil.jsx";
import Layanan from "./page/public/Layanan.jsx";
import DetailLayanan from "./page/public/DetailLayanan.jsx";

import DashboardRT from "./page/rt/DashboardRT.jsx";
import LoginRT from "./page/rt/LoginRT.jsx";
import RegisterRT from "./page/rt/RegisterRT.jsx";
import LoginKelurahan from "./page/kelurahan/LoginKelurahan.jsx";
import RiwayatPengajuan from "./page/rt/RiwayatPengajuan.jsx"
import PreviewSurat from "./page/rt/PreviewSurat.jsx";
import PengajuanSurat from "./page/rt/PengajuanSurat.jsx";
import ProfilRT from "./page/rt/ProfilRT.jsx";
import RTLayout from "./component/rt/RTLayout.jsx";
import Navbar from "./component/Navbar.jsx";

import KelurahanLayout from "./component/kelurahan/KelurahanLayout.jsx";
import DashboardKelurahan from "./page/kelurahan/DashboardKelurahan.jsx";
import PengajuanSuratKelurahan from "./page/kelurahan/PengajuanSuratKelurahan.jsx"
import DetailPengajuan from "./page/kelurahan/DetailPengajuan.jsx";
import KelolaBerita from "./page/kelurahan/KelolaBerita.jsx";
import TambahBerita from "./page/kelurahan/TambahBerita.jsx";
import KelolaKodeRegistrasi from "./page/kelurahan/KelolaKodeRegistrasi.jsx";
function App() {
  return (
    <div className="min-h-screen ">
      <Routes>
  
        <Route path="/login-rt" element={<> <Navbar/> <LoginRT /></>} />
        <Route path="/register-rt" element={<> <Navbar/> <RegisterRT /></>} />
        <Route path="/login-kelurahan" element={<> <Navbar/> <LoginKelurahan /></>} />

        <Route element={<PublicLayout />}>
         <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/berita"
          element={<Berita />}
        />
        <Route
          path="/berita/:id"
          element={<DetailBerita />}
        />
        <Route
          path="/profil"
          element={<Profil />}
        />
        <Route
          path="/layanan"
          element={<Layanan />}
        />
        <Route
          path="/layanan/detail-layanan/:id"
          element={<DetailLayanan />}
        />
      </Route>
      
        {/* Area RT */ }
       <Route element={<RTLayout />}>

          <Route
            path="/dashboard-rt" element={<DashboardRT />}
          />
          <Route
            path="/pengajuan-surat" element={<PengajuanSurat />}
          />
          <Route
            path="/profil-rt" element={<ProfilRT />}
          />
           <Route
             path="/preview-surat/:id" element={<PreviewSurat />}
          />
          <Route
            path="/riwayat-pengajuan"
            element={<RiwayatPengajuan />}
          />

        </Route>

        <Route element={<KelurahanLayout/>}>
          <Route
            path="/dashboard-kelurahan" element={<DashboardKelurahan />}
          />
          <Route
            path="/pengajuan-surat-kelurahan" element={<PengajuanSuratKelurahan />}
          />
          <Route
            path="/detail-pengajuan/:id" element={<DetailPengajuan />}
          />
          <Route
            path="/kelola-berita" element={<KelolaBerita />}
          />
          <Route
            path="/tambah-berita" element={<TambahBerita />}
          />
          <Route
            path="/edit-berita/:id" element={<TambahBerita />}
          />
          <Route
            path="/kelola-kode-registrasi" element={<KelolaKodeRegistrasi />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;