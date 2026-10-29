
import {
  MapPin,
  Building2,
  LandPlot,
  Users,
  CalendarDays,
  Target,
  CheckCircle2,
  Network,
} from "lucide-react";

import Kantor from "../../assets/gambar.jpeg";
import Kelurahan from "../../assets/kantor.jpg"

function Profil() {
  const informasi = [
    {
      icon: MapPin,
      judul: "Lokasi",
      isi: "Kecamatan Mojoroto, Kota Kediri, Provinsi Jawa Timur",
    },
    {
      icon: Building2,
      judul: "Alamat Kantor",
      isi: "Jl. Mpu Tantular, Kelurahan Pojok, Kecamatan Mojoroto, Kota Kediri",
    },
  ];

  const misi = [
    "Meningkatkan kualitas pelayanan publik kepada masyarakat.",
    "Mendorong partisipasi masyarakat dalam pembangunan dan kegiatan kemasyarakatan.",
    "Mewujudkan lingkungan yang tertib, aman, bersih, dan nyaman.",
    "Meningkatkan koordinasi antara pemerintah kelurahan dan masyarakat.",
    "Mendukung pelaksanaan pembangunan sesuai kebutuhan warga.",
  ];

  const struktur = [
    {
      jabatan: "Lurah",
      nama: "Nama Lurah",
    },
    {
      jabatan: "Sekretaris Kelurahan",
      nama: "Nama Sekretaris Kelurahan",
    },
    {
      jabatan: "Seksi Pemerintahan dan Pelayanan Umum",
      nama: "Nama Pejabat",
    },
    {
      jabatan: "Seksi Trantib Umum dan Kesejahteraan Masyarakat",
      nama: "Nama Pejabat",
    },
    {
      jabatan: "Seksi Ekbang dan Pemberdayaan Masyarakat",
      nama: "Nama Pejabat",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFDE4] text-[#111]">
      <main className="max-w-275 mx-auto px-6 pt-8 pb-12">

        {/* HEADER */}
        <section className="mb-7">
          <h1 className="text-2xl font-semibold text-[#8B0502]">
            Profil Kelurahan
          </h1>

          <p className="text-[11px] text-[#8B0502] max-w-80 leading-relaxed">
            Informasi tentang Kelurahan Pojok, Kecamatan Mojoroto,
            Kota Kediri.
          </p>
        </section>

        {/* TENTANG KELURAHAN */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 items-start">
          <div className="overflow-hidden rounded-lg border border-[#E7B9A7] bg-white">
            <img
              src={Kantor}
              alt="Kelurahan Pojok"
              className="w-full h-52 object-cover"
            />
          </div>

          <div>
            <h2 className="text-base text-[20px] font-semibold text-[#8B0502] mb-3">
              Tentang Kelurahan Pojok
            </h2>

            <p className="text-[13px] text-gray-700 leading-relaxed text-justify">
             Kelurahan Pojok adalah salah satu kelurahan yang berada di Kecamatan Mojoroto, Kota Kediri, Provinsi Jawa Timur.
             Kelurahan Pojok menjadi bagian dari wilayah administratif Kota Kediri yang menyelenggaraan pemerintahan dan pelayanan publik bagi masyarakat.
            </p>

            <p className="text-[13px] text-gray-700 leading-relaxed text-justify mt-3">
              Dalam menjalankan perannya, Kelurahan Pojok berupaya mendukung pelayanan Administrasi masyarakat serta mendorong pratisipasi warga dalam kegiatan pembangunan dan kehidupan bermasyarakat.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
              {informasi.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.judul} className="flex gap-2 items-start">
                    <Icon
                      size={17}
                      className="text-[#B3910B] shrink-0 mt-0.5"
                    />

                    <div>
                      <h3 className="text-[13px] font-semibold text-[#8B0502]">
                        {item.judul}
                      </h3>

                      <p className="text-[11px] text-gray-600 leading-relaxed mt-1">
                        {item.isi}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SEJARAH */}
        <section className="mb-9">
          <h2 className="text-base text-[20px] font-semibold text-[#8B0502] mb-4">
            Sejarah Kelurahan Pojok
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-10 items-start">
            <div className="space-y-3 text-[13px] text-gray-700 leading-relaxed text-justify">
              <p>
                Kelurahan Pojok merupakan salah satu wilayah administratif yang berada di Kecamatan Mojoroto, Kota Kediri, Provinsi Jawa Timur. Sebagai bagian dari wilayah Kota Kediri, Kelurahan Pojok menjalankan fungsi pemerintahan di tingkat kelurahan serta memberikan pelayanan administrasi kepada masyarakat.
              </p>

              <p>
                Dalam perkembangannya, penyelenggaraan pemerintahan kelurahan menjadi bagian penting dalam mendukung pelayanan publik dan pembangunan wilayah. Melalui peran pemerintah kelurahan serta partisipasi masyarakat, berbagai kegiatan kemasyarakatan dan pelayanan terus dilaksanakan untuk mendukung kehidupan warga.
              </p>

              <p>
                Hingga saat ini, Kelurahan Pojok menjadi bagian dari Kecamatan Mojoroto yang terus menjalankan pelayanan kepada masyarakat, termasuk pelayanan administrasi dan penyampaian informasi mengenai kegiatan kelurahan
              </p>
            </div>

            <div className="rounded-lg border border-[#E7B9A7] bg-white overflow-hidden">
              <img
                src={Kelurahan}
                alt="Kantor Kelurahan Pojok"
                className="w-full h-48 object-cover"
              />

            </div>
          </div>
        </section>

        {/* VISI DAN MISI */}
        <section className="mb-9">
          <h2 className="text-base text-[20px] font-semibold text-[#8B0502] text-center mb-5">
            Visi &amp; Misi
          </h2>

          <div className="max-w-175 mx-auto space-y-4">
            {/* VISI */}
            <div className="bg-[#FCF9D5] border border-[#E7B9A7] rounded-lg px-5 py-4 text-center">
              <Target
                size={19}
                className="mx-auto text-[#B3910B] mb-2"
              />

              <h3 className="text-[14px] font-semibold text-[#8B0502] mb-2">
                Visi
              </h3>

              <p className="text-[13px] text-gray-700 leading-relaxed">
                Visi resmi Kelurahan Pojok dapat ditambahkan setelah
                memperoleh rumusan dari pihak kelurahan.
              </p>
            </div>

            {/* MISI */}
            <div className="bg-[#FCF9D5] border border-[#E7B9A7] rounded-lg px-5 py-4">
              <CheckCircle2
                size={19}
                className="mx-auto text-[#B3910B] mb-2"
              />

              <h3 className="text-[14px] font-semibold text-[#8B0502] text-center mb-3">
                Misi
              </h3>

              <ol className="list-decimal pl-5 space-y-2 text-[13px] text-gray-700 leading-relaxed">
                {misi.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ol>

            </div>
          </div>
        </section>

        {/* STRUKTUR ORGANISASI */}
        <section>
          <h2 className="text-base text-[20px] font-semibold text-[#8B0502] text-center mb-5">
            Struktur Organisasi
          </h2>

          <div className="flex flex-col items-center">
            {/* LURAH */}
            <div className="w-44 bg-[#FCF9D5] border border-[#E7B9A7] rounded-lg overflow-hidden text-center">
              <div className="h-36 bg-[#F4EEC4] flex flex-col items-center justify-center text-[#B3910B]">
        <Users size={28} strokeWidth={1.5} />
        <p className="text-[10px] mt-2">Foto Lurah</p>
      </div>

              <div className="p-3">
        <h3 className="text-[11px] font-semibold text-[#8B0502]">
          Lurah
        </h3>
        <p className="text-[10px] text-gray-600 mt-1">
          Nama Lurah
        </p>
      </div>
            </div>

            <div className="w-px h-5 bg-[#C99A72]" />

            {/* SEKRETARIS */}
           <div className="w-44 bg-[#FCF9D5] border border-[#E7B9A7] rounded-lg overflow-hidden text-center">
              <div className="h-36 bg-[#F4EEC4] flex flex-col items-center justify-center text-[#B3910B]">
        <Users size={28} strokeWidth={1.5} />
        <p className="text-[10px] mt-2">Foto Sekretaris</p>
      </div>

              <div className="p-3">
        <h3 className="text-[11px] font-semibold text-[#8B0502]">
          Nama Sekretaris Kelurahan
        </h3>
        <p className="text-[10px] text-gray-600 mt-1">
          Sekretaris Kelurahan
        </p>
      </div>
            </div>

            <div className="w-px h-5 bg-[#C99A72]" />

            {/* SEKSI */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-200">
      {struktur.slice(2).map((item) => (
        <div
          key={item.jabatan}
          className="bg-[#FCF9D5] border border-[#E7B9A7] rounded-lg overflow-hidden text-center"
        >
          {/* TEMPAT FOTO */}
          <div className="h-36 bg-[#F4EEC4] flex flex-col items-center justify-center text-[#B3910B]">
            <Users size={28} strokeWidth={1.5} />
            <p className="text-[10px] mt-2">Foto Pegawai</p>
          </div>

          {/* NAMA DAN JABATAN */}
          <div className="p-3 min-h-20 flex flex-col justify-center">
            <h3 className="text-[11px] font-semibold text-[#8B0502] leading-relaxed">
              {item.nama}
            </h3>
            <p className="text-[10px] text-gray-600 mt-2">
              {item.jabatan}
            </p>
          </div>
        </div>
      ))}
    </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Profil;
