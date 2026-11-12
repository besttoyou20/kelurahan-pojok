
function ProfileBadge() {
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username || "User";
  const KetuaRT = user?.namaKetuaRT || "Ketua RT";

  return (
    <div className="flex items-center gap-2 sm:gap-3 w-fit max-w-full h-12 sm:h-15 px-2 sm:px-3 bg-[#FFFBCF] border border-[#8B0502] rounded-2xl">

      {/* Huruf pertama username */}
      <div className="w-9 h-9 sm:w-12 sm:h-12 shrink-0 rounded-full bg-[#FFC83D] flex items-center justify-center text-base sm:text-xl font-semibold text-[#8B0502] border border-grey-300">
        {username.charAt(0).toUpperCase()}
      </div>

      {/* Username */}
      <span className="text-xs sm:text-sm font-medium text-[#8B0502] whitespace-nowrap truncate max-w-27.5 sm:max-w-none">
        {KetuaRT}
      </span>

    </div>
  );
}

export default ProfileBadge;
