import ProfileBadgeKelurahan from "../../component/kelurahan/ProfileBadgeKelurahan.jsx";
function CatatanKematian() {
    return(
        <div className="min-h-screen bg-white
            px-6 py-6 lg:px-9 lg:py-8">
            {/* Header */}
            <div className="mb-10 flex items-center justify-between gap-4">
                <h1 className="text-3xl font-semibold text-[#8B0502]">
                Catatan Kematian
                </h1>

                <ProfileBadgeKelurahan />
            </div>

            <div className="items-center justify-center mt-10">
                <p className="text-center text-[#8B0502]">
                    Maaf, saat ini fitur Catatan Kematian masih dalam pengembangan. Silakan cek kembali nanti untuk pembaruan lebih lanjut.
                </p>
            </div>
        </div>
    )
}
export default CatatanKematian;