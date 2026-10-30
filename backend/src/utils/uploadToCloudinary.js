import cloudinary from "../config/cloudinary.js";
import { Readable } from "node:stream";

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "kelurahan-pojok/berita",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    Readable.from(buffer).pipe(uploadStream);
  });
};

export default uploadToCloudinary;

export const deleteFromCloudinary = async (imageUrl) => {
  if (!imageUrl || !imageUrl.includes("res.cloudinary.com")) {
    return;
  }

  const parts = imageUrl.split("/");
  const uploadIndex = parts.indexOf("upload");

  if (uploadIndex === -1) return;

  const publicIdWithExtension = parts.slice(uploadIndex + 2).join("/");
  const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, "");

  return cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
  });
};