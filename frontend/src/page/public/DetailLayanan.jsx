import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { daftarLayanan } from "../../data/layanan.js";

function DetailLayanan() {
  const { id } = useParams();

  // Cari layanan berdasarkan ID dari URL
  const layanan = daftarLayanan.find((item) => item.id === id);

  // Jika layanan tidak ditemukan
  if (!layanan) {
    return (
      <div className="min-h-screen bg-[#FFFDE4] px-6 py-12 text-center">
        <h2 className="text-xl font-bold text-[#8B0502]">
          Layanan tidak ditemukan
        </h2>

        <Link
          to="/layanan"
          className="inline-block mt-4 text-sm text-[#8B0502] hover:text-[#B3910B]"
        >
          ← Kembali ke Daftar Layanan
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDE4] text-[#111]">
      <main className="max-w-275 mx-auto px-6 pt-8 pb-12">

        {/* TOMBOL KEMBALI */}
        <div className="mb-4">
          <Link
            to="/layanan"
            className="flex items-center gap-1 text-[14px] text-[#8B0502] font-medium hover:text-[#B3910B] transition-colors"
          >
            <ArrowLeft size={14} />
            Kembali ke Daftar Layanan
          </Link>
        </div>

        <hr className="my-4 border-[#C5AC3E]" />

        {/* JUDUL HALAMAN */}
        <section className="mb-6">
          <h1 className="text-xl font-semibold text-[#8B0502]">
            Informasi Layanan
          </h1>

          <h2 className="text-lg font-bold text-[#B3910B]">
            {layanan.nama}
          </h2>

          <p className="text-[12px] text-gray-600 max-w-150 leading-relaxed">
            Temukan informasi terbaru mengenai layanan {layanan.nama} di Kelurahan Pojok
          </p>
        </section>

        {/* DESKRIPSI LAYANAN */}
        <section className="mb-5 rounded-xl border border-[#E7B9A7] bg-[#FFFDE4] px-5 py-5 shadow-sm">
          <h3 className="text-sm font-bold text-[#8B0502]">
            Deskripsi Layanan
          </h3>

          <p className="mt-3 text-[12px] leading-relaxed text-gray-600 text-justify">
            {layanan.deskripsi}
          </p>
        </section>

        {/* PERSYARATAN */}
        <section className="mb-7 rounded-xl border border-[#E7B9A7] bg-[#FFFDE4] px-5 py-5 shadow-sm">
          <h3 className="text-sm font-bold text-[#8B0502]">
            Persyaratan Awal
          </h3>

          <ul className="mt-3 list-disc pl-5 space-y-1 text-[12px] leading-relaxed text-gray-600">
            {layanan.persyaratan.map((syarat, index) => (
              <li key={index}>{syarat}</li>
            ))}
          </ul>
        </section>

        {/* PROSEDUR PENGURUSAN */}
        <section className="rounded-xl border border-[#E7B9A7] bg-[#FFFDE4] px-5 py-5 shadow-sm">
          <h3 className="text-sm font-bold text-[#8B0502]">
            Proses Pengurusan
          </h3>

          <ol className="mt-3 list-decimal pl-5 space-y-1 text-[12px] leading-relaxed text-gray-600">
            {layanan.prosedur.map((langkah, index) => (
              <li key={index}>{langkah}</li>
            ))}
          </ol>
        </section>

      </main>
    </div>
  );
}

export default DetailLayanan;