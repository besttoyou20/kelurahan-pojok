import { useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { User, LockKeyhole, Eye, EyeOff } from "lucide-react";
import axios from "axios";
function LoginKelurahan (){
const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [popup, setPopup] = useState({
    show: false,
    title: "",
    message: "",
    success: false,
  });
  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "http://localhost:4000/api/auth/login-kelurahan",
      {
        username,
        password,
      }
    );

    const { token, user } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setPopup({
      show: true,
      title: "Login Berhasil!",
      message: response.data.message || "Selamat datang di Dashboard Kelurahan.",
      success: true,
    });

    setTimeout(() => {
      navigate("/dashboard-kelurahan");
    }, 1500);
  } catch (error) {
    console.error("Error login Kelurahan:", error);

    setPopup({
      show: true,
      title: "Login Gagal!",
      message:
        error.response?.data?.message ||
        "Tidak dapat terhubung ke server.",
      success: false,
    });
  }
};

    return(
      <div className="min-h-screen bg-[#FFFDE4]">


      <div className="flex justify-center pt-16 px-4">

        <div className="w-full max-w-97.5 bg-white rounded-xl shadow-md px-7 py-6">

          <h1 className="text-center text-2xl font-bold text-[#8B0502] mb-7">
            Login Kelurahan
          </h1>

          <div className="mb-4">
            <label htmlFor="username" className="block text-xs font-medium text-[#8B0502] mb-1">
              Username
            </label>

            <div className="relative">
             <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B0502]"/>

              <input
                type="text"
                id="username"
                placeholder="Masukkan username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-10 border border-gray-500 rounded-md pl-9 pr-3 text-sm outline-none focus:border-[#8B0502]"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-xs font-medium text-[#8B0502] mb-1">
              Password
            </label>

            <div className="relative">
              <LockKeyhole
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B0502]"
              />

              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Masukkan password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-10 border border-gray-500 rounded-md pl-9 pr-10 text-sm outline-none focus:border-[#8B0502]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B0502] cursor-pointer"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
             
            </div>
          </div>


          <div className="flex justify-center pt-4">
            <button
              type="button"
              onClick={handleLogin}
              className="w-40 h-10 border border-[#8B0502] rounded-md text-sm font-semibold text-[#8B0502] bg-[#FFB82E] hover:bg-[#FFD166] cursor-pointer transition-colors"
            >
              Login
            </button>
          </div>

        </div>

      </div>
      {popup.show && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
    <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl">
      <div
        className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${
          popup.success ? "bg-green-100" : "bg-red-100"
        }`}
      >
        {popup.success ? (
          <span className="text-3xl text-green-600">✓</span>
        ) : (
          <span className="text-3xl text-red-600">✕</span>
        )}
      </div>

      <h2 className="mb-2 text-xl font-bold text-[#8B0502]">
        {popup.title}
      </h2>

      <p className="mb-6 text-sm text-gray-600">
        {popup.message}
      </p>

      {!popup.success && (
        <button
          type="button"
          onClick={() =>
            setPopup({
              show: false,
              title: "",
              message: "",
              success: false,
            })
          }
          className="w-full rounded-lg bg-[#FFB82E] px-4 py-2.5 font-semibold text-[#8B0502] transition-colors hover:bg-[#FFD166]"
        >
          Coba Lagi
        </button>
      )}
    </div>
  </div>
)}
    </div>  
    )
}

export default LoginKelurahan;