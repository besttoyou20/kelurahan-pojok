import {
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import Pojok from "../assets/pojok.png";
import LambangKediri from "../assets/lambang-kediri.svg";

function Footer() {
  return (
    <footer className="bg-[#FCF9D5] ">

      <div className="max-w-350 mx-auto px-6 lg:px-20 py-7">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

          {/* ========================= */}
          {/* ALAMAT & KONTAK */}
          {/* ========================= */}

          <div>

            <h3 className="text-lg font-bold text-[#8B0502] border-b border-[#C99A72] pb-1.5 w-fit">
              Alamat dan Kontak
            </h3>

            <div className="mt-3 space-y-2.5">

              {/* ALAMAT */}
              <div className="flex items-start gap-2">

                <MapPin
                  size={15}
                  className="text-[#8B0502] mt-0.5 shrink-0"
                />

                <p className="text-sm text-[#8B0502] leading-relaxed">
                  Jl. Mpu Tantular, Kelurahan Pojok,
                  <br />
                  Kecamatan Mojoroto, Kota Kediri
                </p>

              </div>


              {/* EMAIL */}
              <div className="flex items-center gap-2">

                <Mail
                  size={15}
                  className="text-[#8B0502] shrink-0"
                />

                <p className="text-sm text-[#8B0502]">
                  kelurahanpojok@gmail.com
                </p>

              </div>


              {/* TELEPON */}
              <div className="flex items-center gap-2">

                <Phone
                  size={15}
                  className="text-[#8B0502] shrink-0"
                />

                <p className="text-sm text-[#8B0502]">
                  (0354) 77xxxx
                </p>

              </div>

            </div>

          </div>


          {/* ========================= */}
          {/* LOGO TENGAH */}
          {/* ========================= */}

          <div className="flex flex-col items-center text-center">

            {/* LOGO */}
            <div className="flex items-center justify-center gap-6">

              <img
                src={Pojok}
                alt="Logo Kelurahan Pojok"
                className="w-30 h-auto object-contain"
              />
                <div className="w-0.5 h-12 bg-[#C99A72]" />
              <img
                src={LambangKediri}
                alt="Lambang Kota Kediri"
                className="w-20 h-20 object-contain"
              />

            </div>


            {/* TAGLINE */}
            <p className=" text-lg font-semibold text-[#8B0502]">
              Pojok Hebat
            </p>


            {/* COPYRIGHT */}
            <p className="mt-5 mb-5 text-[9px] text-[#8B0502]">
              Hak cipta Kelurahan Pojok Kediri | Developed by Ayun
            </p>

          </div>


          {/* ========================= */}
          {/* MEDIA SOSIAL */}
          {/* ========================= */}

          <div className="md:text-right">

            <h3 className="text-lg font-bold text-[#8B0502] border-b border-[#C99A72] pb-1.5 w-fit md:ml-auto">
              Media Sosial
            </h3>


            <p className="mt-3 text-sm text-[#8B0502] leading-relaxed md:text-right">
              Ikuti terus kami melalui media sosial
              <br />
              Kelurahan Pojok
            </p>


            {/* SOCIAL MEDIA */}
            <div className="flex items-center gap-2.5 mt-3 md:justify-end">

              {/* INSTAGRAM */}
              <button
                type="button"
                className="
                  w-8
                  h-8
                  rounded-full
                  border
                  border-[#8B0502]
                  flex
                  items-center
                  justify-center
                  text-[#8B0502]
                  hover:bg-[#FFC83D]
                  transition
                  cursor-pointer
                "
              >
                <FaInstagram size={14} />
              </button>


              {/* YOUTUBE */}
              <button
                type="button"
                className="
                  w-8
                  h-8
                  rounded-full
                  border
                  border-[#8B0502]
                  flex
                  items-center
                  justify-center
                  text-[#8B0502]
                  hover:bg-[#FFC83D]
                  transition
                  cursor-pointer
                "
              >
                <FaYoutube size={14} />
              </button>


              {/* FACEBOOK */}
              <button
                type="button"
                className="
                  w-8
                  h-8
                  rounded-full
                  border
                  border-[#8B0502]
                  flex
                  items-center
                  justify-center
                  text-[#8B0502]
                  hover:bg-[#FFC83D]
                  transition
                  cursor-pointer
                "
              >
                <FaFacebook size={14} />
              </button>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;