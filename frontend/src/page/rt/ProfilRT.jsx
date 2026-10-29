import { useEffect, useState } from "react";
import ProfileBadge from "../../component/rt/ProfileBadge.jsx";
import axios from "axios";

function ProfilRT() {
  const [profil, setProfil] = useState(null);
  const [loading, setLoading] = useState(true);

  const [nama, setNama] = useState("");
  const [editNama, setEditNama] = useState(false);

  const [usernameValue, setUsernameValue] = useState("");
  const [editUsername, setEditUsername] = useState(false);

  const [noWhatsappValue, setNoWhatsappValue] = useState("");
  const [editNoWhatsapp, setEditNoWhatsapp] = useState(false);

  const [editTandaTangan, setEditTandaTangan] = useState(false);
  const [fileTandaTangan, setFileTandaTangan] = useState(null);
  const [namaFileTandaTangan, setNamaFileTandaTangan] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchProfil = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${API_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data.data;

        setProfil(data);
        setNama(data.namaKetuaRT || "");
        setUsernameValue(data.username || "");
        setNoWhatsappValue(data.noWhatsapp || "");
        setNamaFileTandaTangan( data.tandaTangan
    ? data.tandaTangan.split("/").pop()
    : "");
      } catch (error) {
        console.error("Error mengambil profil RT:", error);
        alert(
          error.response?.data?.message ||
          "Gagal mengambil data profil RT"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfil();
  }, []);

const handleSimpanTandaTangan = async () => {
  if (!fileTandaTangan) {
    alert("Silakan pilih file tanda tangan terlebih dahulu");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("tandaTangan", fileTandaTangan);

    const response = await axios.put(
      `${API_URL}/api/auth/tanda-tangan`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(response.data.message);

   // Simpan nama file untuk ditampilkan di halaman
setNamaFileTandaTangan(response.data.namaFileAsli);

// Keluar dari mode edit
setFileTandaTangan(null);
setEditTandaTangan(false);

  } catch (error) {
    console.error("Error upload tanda tangan:", error);

    alert(
      error.response?.data?.message ||
      "Gagal menyimpan tanda tangan"
    );
  }
};

  return (
    <div className="min-h-screen px-10 py-8">
      {loading ? (
      <p className="text-sm text-[#8B0502]">
        Memuat profil...
      </p>
    ) : !profil ? (
      <p className="text-sm text-[#8B0502]">
        Data profil gagal dimuat. Silakan muat ulang halaman.
      </p>
    ) : (
      <>
        {/* Pindahkan seluruh JSX halaman ProfilRT yang sudah ada ke sini */}
      </>
    )}
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-[#8B0502]">
          Pengaturan
        </h1>

        <ProfileBadge />
      </div>

      {/* Content */}
      <div className="flex">

        {/* Menu Pengaturan */}
        <div className="w-44 border-r border-[#E7B9A7] pr-4">

          <button
            type="button"
            className="w-full text-left px-3 py-2 bg-[#FFC83D] text-[#8B0502] text-xs font-medium rounded-md"
          >
            Profil
          </button>

          <button
            type="button"
            className="w-full text-left px-3 py-2 mt-2 text-[#8B0502] text-xs font-medium rounded-md"
          >
            Security
          </button>

          <button
            type="button"
            className="w-full text-left px-3 py-2 mt-2 text-[#8B0502] text-xs font-medium rounded-md"
          >
            Privacy Policy
          </button>

        </div>

        {/* Profil */}
        <div className="flex-1 px-8">

          {/* Foto Profil */}
          <div className="flex mb-6">
            <div className="w-25 h-25 rounded-full bg-gray-200 border border-[#E7B9A7] flex items-center justify-center overflow-hidden">
              <span className="text-2xl font-medium text-gray-400">
                {nama.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>

          {/* Nama */}
          <div className="flex items-center border-b border-[#E7B9A7] py-3">

            <div className="flex-1">
              <p className="text-xs text-[#8B0502] font-medium">
                Nama
              </p>

              {editNama ? (
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="mt-1 w-60 h-9 px-3 text-xs border border-[#E7B9A7] rounded-md bg-white outline-none focus:border-[#8B0502]"
                />
              ) : (
                <p className="text-sm text-gray-500 mt-1">
                  {nama}
                </p>
              )}
            </div>

            {!editNama ? (
              <button
                type="button"
                onClick={() => setEditNama(true)}
                className="ml-auto px-3 py-1 border border-[#E7B9A7] rounded text-[15px] cursor-pointer text-[#8B0502]"
              >
                Edit
              </button>
            ) : (
              <div className="ml-auto flex gap-2">

                <button
                  type="button"
                  onClick={() => {
                    setNama(namaKetuaRT);
                    setEditNama(false);
                  }}
                  className="px-3 py-1 border border-[#E7B9A7] rounded text-[15px] cursor-pointer text-[#8B0502]"
                >
                  Batal
                </button>

                <button
                  type="button"
                  onClick={() => setEditNama(false)}
                  className="px-3 py-1 bg-[#FFC83D] border border-[#8B0502] rounded text-[15px] cursor-pointer text-[#8B0502]"
                >
                  Simpan
                </button>

              </div>
            )}

          </div>

          {/* Username */}
<div className="flex items-center border-b border-[#E7B9A7] py-3">

  <div className="flex-1">
    <p className="text-xs text-[#8B0502] font-medium">
      Username
    </p>

    {editUsername ? (
      <input
        type="text"
        value={usernameValue}
        onChange={(e) => setUsernameValue(e.target.value)}
        className="mt-1 w-60 h-9 px-3 text-xs border border-[#E7B9A7] rounded-md bg-white outline-none focus:border-[#8B0502]"
      />
    ) : (
      <p className="text-sm text-gray-500 mt-1">
        {usernameValue}
      </p>
    )}
  </div>

  {!editUsername ? (
    <button
      type="button"
      onClick={() => setEditUsername(true)}
      className="ml-auto px-3 py-1 border border-[#E7B9A7] rounded text-[15px] cursor-pointer text-[#8B0502]"
    >
      Edit
    </button>
  ) : (
    <div className="ml-auto flex gap-2">

      <button
        type="button"
        onClick={() => {
          setUsernameValue(username);
          setEditUsername(false);
        }}
        className="px-3 py-1 border border-[#E7B9A7] rounded text-[15px] cursor-pointer text-[#8B0502]"
      >
        Batal
      </button>

      <button
        type="button"
        onClick={() => setEditUsername(false)}
        className="px-3 py-1 bg-[#FFC83D] border border-[#8B0502] rounded text-[15px] cursor-pointer text-[#8B0502]"
      >
        Simpan
      </button>

    </div>
  )}

</div>

          {/* WhatsApp */}
<div className="flex items-center border-b border-[#E7B9A7] py-3">

  <div className="flex-1">
    <p className="text-xs text-[#8B0502] font-medium">
      No. WhatsApp
    </p>

    {editNoWhatsapp ? (
      <input
        type="text"
        value={noWhatsappValue}
        onChange={(e) => setNoWhatsappValue(e.target.value)}
        className="mt-1 w-60 h-9 px-3 text-xs border border-[#E7B9A7] rounded-md bg-white outline-none focus:border-[#8B0502]"
      />
    ) : (
      <p className="text-sm text-gray-500 mt-1">
        {noWhatsappValue}
      </p>
    )}
  </div>

  {!editNoWhatsapp ? (
    <button
      type="button"
      onClick={() => setEditNoWhatsapp(true)}
      className="ml-auto px-3 py-1 border border-[#E7B9A7] rounded text-[15px] cursor-pointer text-[#8B0502]"
    >
      Edit
    </button>
  ) : (
    <div className="ml-auto flex gap-2">

      <button
        type="button"
        onClick={() => {
          setNoWhatsappValue(noWhatsapp);
          setEditNoWhatsapp(false);
        }}
        className="px-3 py-1 border border-[#E7B9A7] rounded text-[15px] cursor-pointer text-[#8B0502]"
      >
        Batal
      </button>

      <button
        type="button"
        onClick={() => setEditNoWhatsapp(false)}
        className="px-3 py-1 bg-[#FFC83D] border border-[#8B0502] rounded text-[15px] cursor-pointer text-[#8B0502]"
      >
        Simpan
      </button>

    </div>
  )}

</div>
          {/* Tanda Tangan */}
<div className="flex items-center border-b border-[#E7B9A7] py-3">

  {!editTandaTangan ? (
    <>
      <div className="flex-1">
        <p className="text-xs text-[#8B0502] font-medium">
          Tanda Tangan
        </p>

        <p className="text-sm text-gray-500 mt-1">
  {namaFileTandaTangan || "Belum Ditambahkan"}
</p>
      </div>

      <button
        type="button"
        onClick={() => setEditTandaTangan(true)}
        className="ml-auto px-3 py-1 border border-[#E7B9A7] rounded text-[15px] cursor-pointer text-[#8B0502]"
      >
        Edit
      </button>
    </>
  ) : (
    <div className="w-full">

      <p className="text-xs text-[#8B0502] font-medium">
        Tanda Tangan
      </p>

      <p className="text-xs text-gray-500 mt-2">
        Upload tanda tangan Ketua RT untuk digunakan pada surat pengantar.
      </p>

      <p className="text-xs text-gray-400 mt-1">
        Format yang diperbolehkan: PNG, JPG, JPEG. Maksimal 2 MB.
      </p>

      {/* Upload */}
      <div className="mt-4 border border-[#E7B9A7] rounded-md p-3 bg-white ">
        <input
          type="file"
          accept=".png,.jpg,.jpeg"
          onChange={(e) => {
            const file = e.target.files[0];

            if (!file) return;

            if (file.size > 2 * 1024 * 1024) {
              alert("Ukuran file maksimal 2 MB");
              return;
            }

            setFileTandaTangan(file);
          }}
          className="block w-full text-xs text-gray-500 cursor-pointer"
        />
      </div>

      {/* File yang dipilih */}
      {fileTandaTangan && (
        <div className="mt-3">
          <p className="text-xs text-[#8B0502]">
            File dipilih:
          </p>

          <p className="text-xs text-gray-500 mt-1">
            {fileTandaTangan.name}
          </p>
        </div>
      )}

      {/* Tombol */}
      <div className="flex justify-end gap-2 mt-4">

        <button
          type="button"
          onClick={() => {
            setFileTandaTangan(null);
            setEditTandaTangan(false);
          }}
          className="px-3 py-1 border border-[#E7B9A7] rounded text-[15px] cursor-pointer text-[#8B0502]"
        >
          Batal
        </button>

        <button
  type="button"
  onClick={handleSimpanTandaTangan}
  className="px-3 py-1 bg-[#FFC83D] border border-[#8B0502] rounded text-[15px] cursor-pointer text-[#8B0502]"
>
  Simpan
</button>
      </div>

    </div>
  )}

</div>

        </div>
      </div>
    </div>
  );
}

export default ProfilRT;