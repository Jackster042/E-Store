const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true // Always use HTTPS
});

// Optimized storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "e-store/products", // Organized folder structure
    allowed_formats: ["jpg", "jpeg", "png", "webp"], // Common image formats
    resource_type: "auto",
    transformation: [
      { width: 800, height: 800, crop: "limit" }, // Auto-resize large images
      { quality: "auto" } // Optimize image quality
    ]
  }
});

// Enhanced upload utility with error handling
async function uploadToCloudinary(file) {
  try {
    if (!file.buffer) {
      throw new Error("Invalid file format");
    }

    const result = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
        {
          folder: "e-store/products",
          resource_type: "auto"
        }
    );

    return {
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Image upload failed");
  }
}

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  }
});

module.exports = {
  cloudinary,
  upload,
  uploadToCloudinary,
  deleteFromCloudinary: async (publicId) => {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error("Cloudinary delete error:", error);
    }
  }
};