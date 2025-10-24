import { v2 as cloudinary } from "cloudinary";
import { ENV } from "./env.js";

cloudinary.config({
  cloud_name: ENV.CLOUDNINARY_CLOUD_NAME,
  api_key: ENV.CLOUDNINARY_API_KEY,
  api_secret: ENV.CLOUDNINARY_API_SECRET,
});

export default cloudinary;
