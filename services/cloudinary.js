const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // Upload the file on Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });
    // File uploaded successfully
    fs.unlinkSync(localFilePath); // Remove local file
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // Remove local file on error
    return null;
  }
};

module.exports = { uploadOnCloudinary };