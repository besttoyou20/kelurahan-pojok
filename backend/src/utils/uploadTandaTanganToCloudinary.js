import cloudinary from "../config/cloudinary.js";
import { Readable } from "node:stream";

const uploadTandaTanganToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "kelurahan-pojok/tanda-tangan",
        resource_type: "image",
        type: "authenticated",
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

export default uploadTandaTanganToCloudinary;