import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { generateRandomString } from "../utils/generateRandomString.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});

export const cloudinaryupload = async (image) => {
  const randomString = generateRandomString();

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      image,
      {
        upload_preset: "unsigned_upload",
        public_id: `${randomString}/avatar`,
        allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif", "webp"],
      },
      function (error, result) {
        if (error) {
          console.log(error);
          reject({
            status: false,
          });
        } else {
          console.log(result, "cc");
          resolve({
            status: true,
            data: result
          });
        }
      }
    );
  });
};
