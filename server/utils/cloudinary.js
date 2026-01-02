const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const uploadPdfToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                resource_type: 'raw',
                folder: 'study-resources',
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
