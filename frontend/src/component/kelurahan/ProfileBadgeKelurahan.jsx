function ProfileBadgeKelurahan() {
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username || "User";
  const namaAdmin = user?.namaAdmin || "Admin";


  return (
    <div className="flex items-center gap-3 w-40 h-15 px-3 bg-[#FFFBCF] border border-[#8B0502] rounded-2xl">
          
          {/* Huruf pertama username */}
          <div className="w-12 h-12 shrink-0 rounded-full bg-[#FFC83D] flex items-center justify-center text-xl font-semibold text-[#8B0502] border border-grey-300">
            {namaAdmin.charAt(0).toUpperCase()}
          </div>

          {/* Username */}
          <span className="text-[16px] font-medium text-[#8B0502] whitespace-nowrap">
            Admin
          </span>

        </div>
  );
}

export default ProfileBadgeKelurahan;