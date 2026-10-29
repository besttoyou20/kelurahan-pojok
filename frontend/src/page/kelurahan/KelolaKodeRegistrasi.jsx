
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  KeyRound,
  Search,
  Copy,
  Ban,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import ProfileBadgeKelurahan from "../../component/kelurahan/ProfileBadgeKelurahan.jsx";

// Sesuaikan port dengan backend kamu.
// Bisa diatur melalui VITE_API_URL pada file .env frontend.
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000";

const formatTanggal = (tanggal, denganJam = false) => {
  if (!tanggal) return "-";

  // MySQL DATETIME dikirim tanpa zona waktu.
  const date = new Date(
    tanggal.includes?.("T") ? tanggal : tanggal.replace(" ", "T")
  );

  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...(denganJam
      ? { hour: "2-digit", minute: "2-digit" }
      : {}),
  });
};

const formatStatus = (status) => {
  const statusMap = {
    unused: "Aktif",
    used: "Digunakan",
    expired: "Kedaluwarsa",
    disabled: "Dinonaktifkan",
  };

  return statusMap[status] || status;
};

function KelolaKodeRegistrasi() {
  const [daftarKode, setDaftarKode] = useState([]);
  const [nomorRT, setNomorRT] = useState("");
  const [kataKunci, setKataKunci] = useState("");
  const [pesan, setPesan] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [sedangGenerate, setSedangGenerate] = useState(false);
  const [idNonaktif, setIdNonaktif] = useState(null);
  const [page, setPage] = useState(1);

  const dataPerPage = 5;

  // Mengambil daftar kode dari backend
  const ambilDaftarKode = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/auth/registration-codes`
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Gagal mengambil daftar kode."
        );
      }

      setDaftarKode(
        (result.data || []).map((item) => ({
          id: item.id,
          kode: item.kode,
          rt: `RT ${String(item.nomor_rt).padStart(2, "0")}`,
          dibuat: formatTanggal(item.created_at, true),
          berlaku: formatTanggal(item.expires_at),
          status: formatStatus(item.status),
        }))
      );
    } catch (err) {
      setError(
        `${err.message}. Pastikan backend berjalan dan URL API benar.`
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    ambilDaftarKode();
  }, [ambilDaftarKode]);

  // Filter kode
  const dataFiltered = useMemo(() => {
    const keyword = kataKunci.toLowerCase().trim();

    return daftarKode.filter(
      (item) =>
        item.rt.toLowerCase().includes(keyword) ||
        item.kode.toLowerCase().includes(keyword)
    );
  }, [daftarKode, kataKunci]);

  const totalPages = Math.max(
    1,
    Math.ceil(dataFiltered.length / dataPerPage)
  );

  const dataHalaman = dataFiltered.slice(
    (page - 1) * dataPerPage,
    page * dataPerPage
  );

  // Generate kode melalui backend
  const handleGenerate = async () => {
    if (!nomorRT) {
      setPesan("Pilih nomor RT terlebih dahulu.");
      return;
    }

    setPesan("");
    setError("");
    setSedangGenerate(true);

    try {
      const nomor = nomorRT.replace("RT ", "");

      const response = await fetch(
        `${API_URL}/api/auth/registration-codes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nomorRT: nomor,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Gagal membuat kode registrasi."
        );
      }

      await ambilDaftarKode();
      setPage(1);
      setNomorRT("");
      setPesan(
        `Kode ${result.data.kode} berhasil dibuat untuk RT ${nomor}.`
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setSedangGenerate(false);
    }
  };

  // Salin kode
  const handleSalin = async (kode) => {
    try {
      await navigator.clipboard.writeText(kode);
      setPesan(`Kode ${kode} berhasil disalin.`);
      setError("");
    } catch {
      setError(
        "Kode tidak dapat disalin otomatis. Silakan salin secara manual: " +
          kode
      );
    }
  };

  // Nonaktifkan kode melalui backend
  const handleNonaktifkan = async (id, kode) => {
    const yakin = window.confirm(
      `Nonaktifkan kode ${kode}? Kode ini tidak dapat diaktifkan kembali.`
    );

    if (!yakin) return;

    setIdNonaktif(id);
    setPesan("");
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/auth/registration-codes/${id}/disable`,
        {
          method: "PATCH",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Gagal menonaktifkan kode."
        );
      }

      await ambilDaftarKode();
      setPesan(result.message || "Kode berhasil dinonaktifkan.");
    } catch (err) {
      setError(err.message);
    } finally {
      setIdNonaktif(null);
    }
  };

  const statusStyle = (status) => {
    if (status === "Aktif") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Digunakan") {
      return "bg-[#FFF0A8] text-[#8B0502]";
    }

    if (status === "Kedaluwarsa") {
      return "bg-red-100 text-red-700";
    }

    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="min-h-screen bg-white px-6 py-6 lg:px-9 lg:py-8">
      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-[#8B0502] sm:text-3xl">
          Kelola Kode Registrasi
        </h1>
        <ProfileBadgeKelurahan />
      </div>

      {/* ATURAN */}
      <section className="mb-6 rounded-xl border border-[#E7B9A7] bg-[#FFFBCF] p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-[#FFC83D] p-3 text-[#8B0502]">
            <KeyRound size={24} />
          </div>
          <div className="flex-1">
            <h2 className="mb-3 text-lg font-semibold text-[#8B0502]">
              Aturan Kode Registrasi
            </h2>
            <ul className="grid grid-cols-1 gap-2 text-sm text-[#8B0502] md:grid-cols-2">
              <li>• Format kode: RT01-X7K9P2</li>
              <li>• Satu kode hanya untuk satu RT</li>
              <li>• Kode hanya bisa digunakan satu kali</li>
              <li>• Masa berlaku 7 hari sejak dibuat</li>
              <li>• Kode aktif yang belum digunakan dapat dinonaktifkan</li>
            </ul>
          </div>
        </div>
      </section>

      {/* GENERATE */}
      <section className="mb-6 rounded-xl border border-[#E7B9A7] p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-[#8B0502]">
          Generate Kode Registrasi
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Pilih nomor RT yang akan dibuatkan kode registrasinya.
        </p>

        <div className="mt-5 flex flex-col items-start gap-4 sm:flex-row sm:items-end">
          <div className="w-full sm:max-w-sm sm:flex-1">
            <label
              htmlFor="nomorRT"
              className="mb-2 block text-sm font-medium text-[#8B0502]"
            >
              Nomor RT
            </label>
            <select
              id="nomorRT"
              value={nomorRT}
              onChange={(event) => {
                setNomorRT(event.target.value);
                setPesan("");
                setError("");
              }}
              className="h-11 w-full rounded-md border border-[#E7B9A7] bg-white px-3 text-sm outline-none focus:border-[#8B0502]"
            >
              <option value="">Pilih RT</option>
              {Array.from({ length: 49 }, (_, index) => {
                const rt = `RT ${String(index + 1).padStart(2, "0")}`;
                return (
                  <option key={rt} value={rt}>
                    {rt}
                  </option>
                );
              })}
            </select>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={sedangGenerate}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#FFC83D] px-5 text-sm font-semibold text-[#8B0502] transition hover:bg-[#F9B91C] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            <KeyRound size={17} />
            {sedangGenerate ? "Memproses..." : "Generate Kode"}
          </button>
        </div>

        {pesan && (
          <p className="mt-4 rounded-md bg-[#FFF8D6] px-3 py-2 text-sm text-[#8B0502]">
            {pesan}
          </p>
        )}
        {error && (
          <p role="alert" className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}
      </section>

      {/* DAFTAR KODE */}
      <section className="rounded-xl border border-[#E7B9A7] p-5 sm:p-6">
        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="text-lg font-semibold text-[#8B0502]">
            Daftar Kode Registrasi
          </h2>

          <div className="relative w-full sm:max-w-xs">
            <Search
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={kataKunci}
              onChange={(event) => {
                setKataKunci(event.target.value);
                setPage(1);
              }}
              placeholder="Cari nomor RT atau kode..."
              className="h-10 w-full rounded-md border border-[#E7B9A7] bg-white pl-9 pr-3 text-sm outline-none focus:border-[#8B0502]"
            />
          </div>
        </div>

        {loading ? (
          <p className="py-10 text-center text-sm text-gray-500">
            Memuat data kode registrasi...
          </p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-190 border-collapse text-sm">
                <thead>
                  <tr className="bg-[#FFF8D6] text-[#8B0502]">
                    {[
                      "No.",
                      "Kode Registrasi",
                      "RT",
                      "Tanggal Dibuat",
                      "Masa Berlaku",
                      "Status",
                      "Aksi",
                    ].map((judul) => (
                      <th
                        key={judul}
                        className="px-3 py-3 text-left font-semibold"
                      >
                        {judul}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {dataFiltered.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-3 py-10 text-center text-gray-500"
                      >
                        {daftarKode.length === 0
                          ? "Belum ada kode registrasi."
                          : "Kode registrasi tidak ditemukan."}
                      </td>
                    </tr>
                  ) : (
                    dataHalaman.map((item, index) => (
                      <tr
                        key={item.id}
                        className="border-b border-[#F1E5DF] hover:bg-[#FFFDF4]"
                      >
                        <td className="px-3 py-4">
                          {(page - 1) * dataPerPage + index + 1}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 font-medium text-[#8B0502]">
                          {item.kode}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4">
                          {item.rt}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4">
                          {item.dibuat}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4">
                          {item.berlaku}
                        </td>
                        <td className="px-3 py-4">
                          <span
                            className={`inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium ${statusStyle(item.status)}`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="px-3 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleSalin(item.kode)}
                              title="Salin kode"
                              aria-label={`Salin kode ${item.kode}`}
                              className="cursor-pointer rounded-md border border-[#E7B9A7] p-2 text-[#8B0502] transition hover:bg-[#FFF0A8]"
                            >
                              <Copy size={15} />
                            </button>

                            {item.status === "Aktif" ? (
                              <button
                                type="button"
                                onClick={() =>
                                  handleNonaktifkan(item.id, item.kode)
                                }
                                disabled={idNonaktif === item.id}
                                title="Nonaktifkan kode"
                                aria-label={`Nonaktifkan kode ${item.kode}`}
                                className="cursor-pointer rounded-md border border-[#E7B9A7] p-2 text-[#8B0502] transition hover:bg-red-50 disabled:opacity-50"
                              >
                                <Ban size={15} />
                              </button>
                            ) : (
                              <span
                                className="rounded-md border border-gray-200 p-2 text-gray-400"
                                title="Tidak ada tindakan"
                              >
                                <MoreHorizontal size={15} />
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
              <p className="text-xs text-gray-500">
                Menampilkan{" "}
                {dataFiltered.length === 0
                  ? 0
                  : (page - 1) * dataPerPage + 1}
                –{Math.min(page * dataPerPage, dataFiltered.length)} dari{" "}
                {dataFiltered.length} data
              </p>

              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  disabled={page === 1}
                  aria-label="Halaman sebelumnya"
                  className="flex h-9 w-9 items-center justify-center rounded-l-md border border-[#E7B9A7] text-[#8B0502] disabled:cursor-not-allowed disabled:text-gray-300"
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (pageNumber) => (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => setPage(pageNumber)}
                      aria-current={page === pageNumber ? "page" : undefined}
                      className={`h-9 min-w-9 border-y border-[#E7B9A7] px-3 text-xs ${
                        page === pageNumber
                          ? "border-[#8B0502] bg-[#8B0502] text-white"
                          : "bg-white text-[#8B0502] hover:bg-[#FFF8D6]"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  )
                )}

                <button
                  type="button"
                  onClick={() =>
                    setPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={page === totalPages}
                  aria-label="Halaman berikutnya"
                  className="flex h-9 w-9 items-center justify-center rounded-r-md border border-[#E7B9A7] text-[#8B0502] disabled:cursor-not-allowed disabled:text-gray-300"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </section>

      <p className="mt-4 text-xs text-gray-500">
        Data kode registrasi diambil langsung dari database.
      </p>
    </div>
  );
}

export default KelolaKodeRegistrasi;
