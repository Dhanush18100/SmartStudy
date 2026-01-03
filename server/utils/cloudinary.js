const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadPdfToCloudinary = (buffer, originalName) => {
  return new Promise((resolve, reject) => {
    const safeFileName = originalName
      .replace(/\s+/g, "_")
      .replace(".pdf", "");

    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: "study-resources",
        public_id: safeFileName,
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

module.exports = uploadPdfToCloudinary;
