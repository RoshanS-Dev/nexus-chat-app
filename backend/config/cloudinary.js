import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

// Load .env variables
dotenv.config();

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

console.log(
  "Cloudinary Config - Cloud Name:",
  cloudName ? "***" : "MISSING"
);
console.log(
  "Cloudinary Config - API Key:",
  apiKey ? "***" : "MISSING"
);
console.log(
  "Cloudinary Config - API Secret:",
  apiSecret ? "***" : "MISSING"
);

if (!cloudName || !apiKey || !apiSecret) {
  console.error(
    "Cloudinary environment variables are missing. Check your .env file."
  );
} else {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  console.log("Cloudinary initialized successfully");
}

export const isCloudinaryConfigured = () => {
  return !!(cloudName && apiKey && apiSecret);
};

export default cloudinary;