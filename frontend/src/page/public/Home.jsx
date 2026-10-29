import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Gambar from "../../assets/gambar.jpeg";
import InstagramEmbed from "../public/InstagramEmbed.jsx";
import {
  Users,
  UserRound,
  House,
  FileText,
  ClipboardList,
  Info,
  Newspaper,
  ExternalLink,
} from "lucide-react";
import {
  FaInstagram,
} from "react-icons/fa";

function Home() {
  const [berita, setBerita] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/berita?page=1`
        );

        setBerita((response.data.data || []).slice(0, 3));
      } catch (error) {
        console.error("Error mengambil berita:", error);
      }
    };

    fetchBerita();
  }, []);

  const formatTanggal = (tanggal) => {
    if (!tanggal) return "-";

    return new Date(tanggal).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const potongIsi = (isi) => {
    if (!isi) return "";

    const text = isi.replace(/\s+/g, " ").trim();

    if (text.length <= 110) {
      return text;
    }

    return text.substring(0, 110) + "...";
  };

  return (
    <div className="min-h-screen bg-[#FFFDE4]">

      {/* ===================================================== */}
      {/* HERO */}
      {/* ===================================================== */}

      <section className="px-6 lg:px-20 py-12 lg:py-16">
        <div className="max-w-350 mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">

          {/* TEXT */}
          <div className="flex-1 text-center lg:text-left">

            <h1 className="text-3xl lg:text-5xl font-bold text-[#8B0502] leading-tight">
              Selamat Datang di
              <br />
              Kelurahan Pojok
            </h1>

            <p className="mt-4 text-sm lg:text-base text-[#8B0502] max-w-xl">
              Website resmi Kelurahan Pojok sebagai media informasi
              dan pelayanan masyarakat Kelurahan Pojok.
            </p>

            {/* BUTTON */}
            <div className="flex items-center justify-center lg:justify-start gap-4 mt-6">

              <Link
                to="/login-rt"
                className="
                  px-5
                  py-2
                  rounded-lg
                  bg-[#FFC83D]
                  border
                  border-[#8B0502]
                  text-[#8B0502]
                  text-sm
                  font-semibold
                  hover:bg-[#F2B82F]
                  transition
                "
              >
                Login RT
              </Link>

              <Link
                to="/profil"
                className="
                  px-7
                  py-2
                  rounded-lg
                  bg-white
                  border
                  border-[#8B0502]
                  text-[#8B0502]
                  text-sm
                  font-semibold
                  hover:bg-[#FFF8D6]
                  transition
                "
              >
                Profil
              </Link>

            </div>

          </div>


          {/* FOTO */}
          <div className="flex-1 flex justify-center">

            <div className="w-full max-w-xl h-60 lg:h-72 rounded-lg border border-[#8B0502] bg-[#F9E9A8] flex items-center justify-center overflow-hidden">

              <img
                src={Gambar}
                alt="Gedung Kelurahan Pojok"
                className="w-full h-full object-cover"
              />

            </div>

          </div>

        </div>
      </section>


      {/* ===================================================== */}
      {/* STATISTIK */}
      {/* ===================================================== */}

      <section className="bg-[#FFFBCF] py-8 lg:py-10 mt-10">

        <div className="max-w-350 mx-auto px-6 lg:px-20">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

            {/* TOTAL PENDUDUK */}
            <div className="flex flex-col items-center text-center">

              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#FFF0A8] text-[#8B0502]">
                <Users size={25} />
              </div>

              <p className="mt-2 text-lg font-bold text-[#8B0502]">
                11,166
              </p>

              <p className="text-medium text-[#8B0502]">
                Total Penduduk
              </p>

            </div>


            {/* KEPALA KELUARGA */}
            <div className="flex flex-col items-center text-center">

              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#FFF0A8] text-[#8B0502]">
                <UserRound size={25} />
              </div>

              <p className="mt-2 text-lg font-bold text-[#8B0502]">
                500
              </p>

              <p className="text-medium text-[#8B0502]">
                Kepala Keluarga
              </p>

            </div>


            {/* RT */}
            <div className="flex flex-col items-center text-center">

              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#FFF0A8] text-[#8B0502]">
                <House size={25} />
              </div>

              <p className="mt-2 text-lg font-bold text-[#8B0502]">
                49
              </p>

              <p className="text-medium text-[#8B0502]">
                RT
              </p>

            </div>


            {/* RW */}
            <div className="flex flex-col items-center text-center">

              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#FFF0A8] text-[#8B0502]">
                <House size={25} />
              </div>

              <p className="mt-2 text-lg font-bold text-[#8B0502]">
                10
              </p>

              <p className="text-medium text-[#8B0502]">
                RW
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ===================================================== */}
      {/* LAYANAN PUBLIK */}
      {/* ===================================================== */}

      <section className="px-6 lg:px-20 py-12 lg:py-16 pt-20 pb-12 lg:pt-24 lg:pb-16">

        <div className="max-w-350 mx-auto">

          {/* JUDUL */}
          <div className="text-center mb-8">

            <h2 className="text-2xl lg:text-3xl font-bold text-[#8B0502]">
              Layanan Publik
            </h2>

            <p className="mt-2 text-sm text-[#8B0502]">
              Informasi layanan yang tersedia di Kelurahan Pojok
            </p>

          </div>


          {/* CARD LAYANAN */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* CARD 1 */}
            <div className="bg-[#FFFDE4] border border-[#E7B9A7] rounded-xl p-6 hover:shadow-md transition">

              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#FFF0A8] text-[#8B0502]">
                <FileText size={24} strokeWidth={2.5} />
              </div>

              <h3 className="mt-4 text-base font-bold text-[#8B0502]">
                Surat Pengantar
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-gray-600">
                Informasi mengenai layanan surat pengantar yang dapat
                diajukan melalui RT.
              </p>

              <Link
                to="/layanan"
                className="inline-block mt-4 text-xs font-semibold text-[#8B0502] hover:text-[#B3910B] transition"
              >
                Selengkapnya →
              </Link>

            </div>


            {/* CARD 2 */}
            <div className="bg-[#FFFDE4] border border-[#E7B9A7] rounded-xl p-6 hover:shadow-md transition">

              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#FFF0A8] text-[#8B0502]">
                <ClipboardList size={24} strokeWidth={2.5} />
              </div>

              <h3 className="mt-4 text-base font-bold text-[#8B0502]">
                Administrasi Kelurahan
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-gray-600">
                Informasi berbagai layanan administrasi yang tersedia
                bagi masyarakat Kelurahan Pojok.
              </p>

              <Link
                to="/layanan"
                className="inline-block mt-4 text-xs font-semibold text-[#8B0502] hover:text-[#B3910B] transition"
              >
                Selengkapnya →
              </Link>

            </div>


            {/* CARD 3 */}
            <div className="bg-[#FFFDE4] border border-[#E7B9A7] rounded-xl p-6 hover:shadow-md transition">

              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#FFF0A8] text-[#8B0502]">
                <Info size={24} strokeWidth={2.5} />
              </div>

              <h3 className="mt-4 text-base font-bold text-[#8B0502]">
                Informasi Layanan
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-gray-600">
                Temukan informasi persyaratan, prosedur, dan ketentuan
                layanan di Kelurahan Pojok.
              </p>

              <Link
                to="/layanan"
                className="inline-block mt-4 text-xs font-semibold text-[#8B0502] hover:text-[#B3910B] transition"
              >
                Selengkapnya →
              </Link>

            </div>

          </div>


          {/* BUTTON */}
          <div className="flex justify-center mt-10">

            <Link
              to="/layanan"
              className="
                px-5
                py-2.5
                rounded-lg
                bg-[#FFC83D]
                border
                border-[#8B0502]
                text-[#8B0502]
                text-sm
                font-semibold
                hover:bg-[#F2B82F]
                transition
              "
            >
              Lihat Semua Layanan
            </Link>

          </div>

        </div>

      </section>


      {/* ===================================================== */}
      {/* BERITA & KEGIATAN */}
      {/* ===================================================== */}

      <section className="px-6 lg:px-20 pt-16 pb-12 lg:pt-20 lg:pb-16">

        <div className="max-w-350 mx-auto">

          {/* JUDUL */}
          <div className="relative mb-8">

            <div className="text-center ">

              <h2 className="text-2xl lg:text-3xl font-bold text-[#8B0502]">
                Berita & Kegiatan
              </h2>

              <p className="mt-2 text-sm text-[#8B0502]">
                Informasi terbaru dan kegiatan Kelurahan Pojok
              </p>

            </div>


            {/* LIHAT SEMUA */}
            <Link
              to="/berita"
              className="hidden md:block text-sm font-semibold text-[#8B0502] hover:text-[#B3910B] transition absolute right-0 bottom-0.5 -translate-y-1/2"
            >
              Lihat Semua →
            </Link>

          </div>


          {/* CARD BERITA */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {berita.map((item) => (

              <article
                key={item.id}
                className="bg-white rounded-xl border border-[#E7B9A7] overflow-hidden hover:shadow-md transition"
              >

                {/* FOTO */}
                <div className="h-44 bg-[#F9E9A8] flex items-center justify-center overflow-hidden">

                  {item.foto ? (
                    <img
                      src={`${API_URL}${item.foto}`}
                      alt={item.judul}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Newspaper
                      size={40}
                      strokeWidth={2}
                      className="text-[#8B0502]"
                    />
                  )}

                </div>


                {/* INFORMASI */}
                <div className="p-5">

                  <p className="text-[11px] text-gray-500">
                    {formatTanggal(item.created_at)}
                  </p>

                  <h3 className="mt-2 text-base font-bold text-[#8B0502] line-clamp-2">
                    {item.judul}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-gray-600 line-clamp-2">
                    {potongIsi(item.isi)}
                  </p>

                  <Link
                    to={`/berita/${item.id}`}
                    className="inline-block mt-4 text-xs font-semibold text-[#8B0502] hover:text-[#B3910B] transition"
                  >
                    Baca Selengkapnya →
                  </Link>

                </div>

              </article>

            ))}


            {/* KALAU BELUM ADA BERITA */}
            {berita.length === 0 && (
              <div className="md:col-span-3 bg-white rounded-xl border border-[#E7B9A7] py-12 text-center">

                <Newspaper
                  size={40}
                  className="mx-auto text-[#8B0502]"
                />

                <p className="mt-3 text-sm text-gray-500">
                  Belum ada berita atau kegiatan.
                </p>

              </div>
            )}

          </div>


          {/* MOBILE BUTTON */}
          <div className="flex justify-center mt-7 md:hidden">

            <Link
              to="/berita"
              className="text-sm font-semibold text-[#8B0502] hover:text-[#B3910B] transition"
            >
              Lihat Semua Berita →
            </Link>

          </div>

        </div>

      </section>
      
      {/* ===================================================== */}
      {/* MEDIA SOSIAL */}
      {/* ===================================================== */}

      <section className="px-6 lg:px-20 py-12 lg:py-16">
        <div className="max-w-350 mx-auto">

          {/* JUDUL */}
          <div className="text-center mb-8">
            <p className="text-xs font-semibold tracking-widest text-[#B3910B]">
              IKUTI AKTIVITAS KAMI
            </p>

            <h2 className="mt-2 text-2xl lg:text-3xl font-bold text-[#8B0502]">
              Media Sosial Kelurahan
            </h2>

            <p className="mt-2 text-sm text-[#8B0502]">
              Ikuti informasi dan dokumentasi kegiatan Kelurahan Pojok.
            </p>
          </div>

         <InstagramEmbed />

          {/* TOMBOL INSTAGRAM */}
          <div className="mt-8 flex justify-center">
            <a
              href="https://www.instagram.com/kelurahanpojok/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-[#8B0502] bg-[#FFC83D] px-5 py-3 text-sm font-semibold text-[#8B0502] transition hover:bg-[#F2B82F]"
            >
              <FaInstagram size={18} />
              Kunjungi Instagram
              <ExternalLink size={15} />
            </a>
          </div>

        </div>
      </section>


    </div>
  );
}

export default Home;