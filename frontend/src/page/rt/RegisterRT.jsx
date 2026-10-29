import { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, KeyRound, Eye, EyeOff } from "lucide-react";
import axios from "axios";

function RegisterRT(){
    const navigate = useNavigate();
    const [verified, setVerified] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [kodeRegistrasi, setKodeRegistrasi] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [namaKetuaRT, setNamaKetuaRT] = useState("");
    const [noWhatsapp, setNoWhatsapp] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [noRW, setNoRW] = useState("");

   const handleVerify = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "http://localhost:4000/api/auth/verify",
      {
        kodeRegistrasi,
      }
    );

    console.log(response.data);

    setVerified(true);

  } catch (error) {
    console.error("Error verifying registration code:", error);

    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert("Tidak dapat terhubung ke server.");
    }
  }
};
  const handleRegister = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "http://localhost:4000/api/auth/register-rt",
      {
        kodeRegistrasi,
        noRW,
        namaKetuaRT,
        noWhatsapp,
        username,
        password,
        confirmPassword,
      }
    );

    console.log(response.data);

    setShowSuccess(true);


  } catch (error) {
    console.error("Error registering RT:", error);

    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert("Tidak dapat terhubung ke server.");
    }
  }
};
    return(
        <div className="min-h-screen bg-[#FFFDE4]">
            <div className="flex justify-center pt-8 px-4">
                <div className="w-full max-w-97.5 bg-white rounded-xl shadow-md px-7 py-6"> 
                      {showSuccess ? (

    <div className="text-center py-5">

      <div className="text-4xl text-green-600 mb-4">
        ✓
      </div>

      <h1 className="text-2xl font-bold text-[#8B0502] mb-3">
        Registrasi Berhasil!
      </h1>

      <p className="text-sm text-gray-600 leading-relaxed mb-6">
        Akun RT berhasil dibuat.
        <br />
        Silakan login menggunakan username dan password
        yang telah didaftarkan.
      </p>

      <button
        type="button"
        onClick={() => navigate("/login-rt")}
        className="w-40 h-10 border border-[#8B0502] rounded-md text-sm font-semibold text-[#8B0502] bg-[#FFB82E] hover:bg-[#FFD166] cursor-pointer transition-colors"
      >
        Ke Halaman Login
      </button>

    </div>

  ) : !verified ? (

            <form onSubmit={handleVerify}>

              <h1 className="text-center text-2xl font-bold text-[#8B0502] mb-7">
                Daftar Akun
              </h1>

              <div className="mb-2">

                <label
                  htmlFor="kodeRegistrasi"
                  className="block text-xs font-medium text-[#8B0502] mb-1"
                >
                  Kode Registrasi
                </label>

                <div className="relative">

                  <KeyRound
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B0502]"
                  />

                  <input
                    type="text"
                    id="kodeRegistrasi"
                    name="kodeRegistrasi"
                     value={kodeRegistrasi}
                    onChange={(e) => setKodeRegistrasi(e.target.value)}
                    placeholder="Masukkan kode registrasi"
                    autoComplete="off"
                    className="w-full h-10 border border-gray-500 rounded-md pl-9 pr-3 text-sm outline-none focus:border-[#8B0502]"
                  />

                </div>
                {showSuccess && (
                    <p className="text-center text-sm font-semibold text-green-600 mb-4"> ✓ Kode registrasi berhasil diverifikasi</p>
                )}

            </div>

              {/* KETERANGAN */}
              <p className="text-[10px] leading-tight text-[#8B0502] mb-5">
                Kode registrasi berasal dari kelurahan.
                <br />
                Mohon hubungi kelurahan untuk kode registrasi.
              </p>

              {/* BUTTON VERIFIKASI */}
              <div className="flex justify-center">

                <button
                  type="submit"
                  className="w-24 h-9 border border-[#8B0502] rounded-md text-xs font-semibold text-[#8B0502] bg-[#FFB82E] hover:bg-[#FFD166] cursor-pointer transition-colors"
                >
                  Verifikasi
                </button>

              </div>

            </form>

          ) : (

            /* ========================= */
            /* TAHAP 2 - DATA RT */
            /* ========================= */

            <form onSubmit={handleRegister}>

              <h1 className="text-center text-2xl font-bold text-[#8B0502] mb-7">
                Daftar Akun
              </h1>

              {/* NAMA KETUA RT */}
              <div className="mb-3">

                <label
                  htmlFor="namaKetuaRT"
                  className="block text-xs font-medium text-[#8B0502] mb-1"
                >
                  Nama Ketua RT
                </label>

                <div className="relative">

                  <User
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B0502]"
                  />

                  <input
                    type="text"
                    id="namaKetuaRT"
                    name="namaKetuaRT"
                    placeholder="Masukkan nama ketua RT"
                    autoComplete="name"
                    value={namaKetuaRT}
                    onChange={(e) => setNamaKetuaRT(e.target.value)}
                    className="w-full h-10 border border-gray-500 rounded-md pl-9 pr-3 text-sm outline-none focus:border-[#8B0502]"
                  />

                </div>

              </div>
              

              <div className="mb-3">

                <label
                  htmlFor="noRW"
                  className="block text-xs font-medium text-[#8B0502] mb-1"
                >
                  Nomor RW
                </label>

                <div className="relative">

                  <User
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B0502]"
                  />

                  <input
                    type="text"
                    id="noRW"
                    name="noRW"
                    placeholder="Masukkan nomor RW"
                    autoComplete="name"
                    value={noRW}
                    onChange={(e) => setNoRW(e.target.value)}
                    className="w-full h-10 border border-gray-500 rounded-md pl-9 pr-3 text-sm outline-none focus:border-[#8B0502]"
                  />

                </div>

              </div>

              {/* NO WHATSAPP */}
              <div className="mb-3">

                <label
                  htmlFor="whatsapp"
                  className="block text-xs font-medium text-[#8B0502] mb-1"
                >
                  No. WhatsApp
                </label>

                <div className="relative">

                  <User
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B0502]"
                  />

                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    placeholder="Masukkan nomor WhatsApp"
                    value={noWhatsapp}
                    onChange={(e) => setNoWhatsapp(e.target.value)}
                    autoComplete="tel"
                    className="w-full h-10 border border-gray-500 rounded-md pl-9 pr-3 text-sm outline-none focus:border-[#8B0502]"
                  />

                </div>

              </div>

              {/* USERNAME */}
              <div className="mb-3">

                <label
                  htmlFor="username"
                  className="block text-xs font-medium text-[#8B0502] mb-1"
                >
                  Username
                </label>

                <div className="relative">

                  <User
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B0502]"
                  />

                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Masukkan username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    className="w-full h-10 border border-gray-500 rounded-md pl-9 pr-3 text-sm outline-none focus:border-[#8B0502]"
                  />

                </div>

              </div>

              {/* PASSWORD */}
              <div className="mb-3">

                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-[#8B0502] mb-1"
                >
                  Password
                </label>

                <div className="relative">

                  <KeyRound
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B0502]"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    className="w-full h-10 border border-gray-500 rounded-md pl-9 pr-10 text-sm outline-none focus:border-[#8B0502]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B0502] cursor-pointer"
                    aria-label={
                      showPassword
                        ? "Sembunyikan password"
                        : "Tampilkan password"
                    }
                  >
                    {showPassword ? (
                      <Eye size={18} />
                    ) : (
                      <EyeOff size={18} />
                    )}
                  </button>

                </div>

              </div>

              {/* KONFIRMASI PASSWORD */}
              <div className="mb-5">

                <label
                  htmlFor="confirmPassword"
                  className="block text-xs font-medium text-[#8B0502] mb-1"
                >
                  Konfirmasi Password
                </label>

                <div className="relative">

                  <KeyRound
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B0502]"
                  />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Konfirmasi password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                    className="w-full h-10 border border-gray-500 rounded-md pl-9 pr-10 text-sm outline-none focus:border-[#8B0502]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B0502] cursor-pointer"
                    aria-label={
                      showConfirmPassword
                        ? "Sembunyikan password"
                        : "Tampilkan password"
                    }
                  >
                    {showConfirmPassword ? (
                      <Eye size={18} />
                    ) : (
                      <EyeOff size={18} />
                    )}
                  </button>

                </div>

              </div>

              {/* BUTTON DAFTAR */}
              <div className="flex justify-center">

                <button
                  type="submit"
                  className="w-40 h-10 border border-[#8B0502] rounded-md text-sm font-semibold text-[#8B0502] bg-[#FFB82E] hover:bg-[#FFD166] cursor-pointer transition-colors"
                >
                  Daftar
                </button>

              </div>

            </form>

          )}
                </div>
            </div>
        </div>
    )
}

export default RegisterRT;