const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadPdfToCloudinary = (buffer, originalName) => {
  return new Promise((resolve, reject) => {
    console.log("Uploading file:", originalName); // 👈 DEBUG

    const safeFileName = originalName.replace(/\s+/g, "_");

    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: "study-resources",
        public_id: safeFileName,      // ✅ MUST INCLUDE EXTENSION
        access_mode: "public",        // ✅ REQUIRED
        overwrite: false,
      },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

module.exports = uploadPdfToCloudinary;
