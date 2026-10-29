import { Link } from "react-router-dom";
import {
  FileText,
  ClipboardList,
  Info,
} from "lucide-react";
import { daftarLayanan } from "../../data/layanan";

function Layanan() {
    return(
        <div className="min-h-screen bg-[#FFFDE4] text-[#111]">
            <main className="max-w-275 mx-auto px-6 pt-8 pb-12">

               <section className="mb-7">
                    <h1 className="text-2xl font-semibold text-[#8B0502]">
                        Informasi Layanan
                    </h1>

                    <p className="text-[11px] text-[#8B0502] max-w-100 leading-relaxed">
                        Temukan informasi terbaru mengenai layanan di Kelurahan Pojok
                    </p>
                </section>

                <section className="  py-12 lg:py-6 pt-20 pb-12 lg:pt-2 lg:pb-16">
                    <div className=" mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-8 items-stretch">
                        {daftarLayanan.map((item) => (
                            <div
                            key={item.id}
                            className=" flex flex-col h-full min-h-55 bg-[#FFFDE4] border border-[#E7B9A7] rounded-xl p-7 hover:shadow-md transition"
                            >
                            <h3 className=" min-h-12 text-base font-bold text-[#8B0502]">
                                {item.nama}
                            </h3>

                            <p className="mt-3  min-h-17.5 text-xs leading-relaxed text-gray-600">
                                {item.deskripsi}
                            </p>

                            <Link
                                to={`/layanan/detail-layanan/${item.id}`}
                                className="mt-4 inline-flex items-center gap-1 w-fit text-sm font-semibold text-[#8B0502] hover:text-[#B3910B] transition-colors"
                            >
                                Selengkapnya →
                            </Link>
                            </div>
                        ))}
                        </div>
                    </div>
                </section>
                    
            </main>
        </div>
    );
}
export default Layanan;
