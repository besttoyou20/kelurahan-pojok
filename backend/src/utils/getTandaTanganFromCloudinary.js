import cloudinary from "../config/cloudinary.js";

const getTandaTanganFromCloudinary = async (
  publicId,
  format
) => {
  if (!publicId || !format) {
    throw new Error("Data tanda tangan tidak lengkap");
  }

  const url = cloudinary.utils.private_download_url(
    publicId,
    format,
    {
      resource_type: "image",
      type: "authenticated",
      expires_at: Math.floor(Date.now() / 1000) + 60,
    }
  );

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Gagal mengambil tanda tangan dari Cloudinary");
  }

  return Buffer.from(await response.arrayBuffer());
};

export default getTandaTanganFromCloudinary;