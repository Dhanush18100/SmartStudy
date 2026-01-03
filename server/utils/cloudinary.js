const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadFileToCloudinary = (buffer, originalName) => {
  return new Promise((resolve, reject) => {
    console.log("Uploading file:", originalName);

    // ✅ Extract name WITHOUT extension
    const baseName = path.parse(originalName).name;

    // ✅ Sanitize (remove spaces & special chars)
    const safePublicId = baseName.replace(/[^a-zA-Z0-9_-]/g, "_");

    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: "study-resources",
        public_id: safePublicId, // ❗ NO EXTENSION
        type: "upload",
        overwrite: false,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

module.exports = uploadFileToCloudinary;
