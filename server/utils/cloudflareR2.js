const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

// Initialize S3 client for Cloudflare R2
const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
});

/**
 * Upload a file to Cloudflare R2
 * @param {Buffer} fileBuffer - File buffer
 * @param {string} mimeType - File MIME type
 * @param {string} originalName - Original file name
 * @returns {Promise<string>} - Public URL of the uploaded file
 */
const uploadToR2 = async (fileBuffer, mimeType, originalName) => {
  // Generate a unique filename with extension
  const ext = path.extname(originalName);
  const uniqueFilename = `${uuidv4()}${ext}`;

  const params = {
    Bucket: process.env.CLOUDFLARE_R2_BUCKET,
    Key: `techzuno/uploads/${uniqueFilename}`,
    Body: fileBuffer,
    ContentType: mimeType,
  };

  try {
    await r2Client.send(new PutObjectCommand(params));
    // Return the public URL without double slashes
    const baseUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL.replace(/\/+$/, "");
    return `${baseUrl}/techzuno/uploads/${uniqueFilename}`;
  } catch (error) {
    console.error("Error uploading to Cloudflare R2:", error);
    throw new Error("Failed to upload file");
  }
};

module.exports = { uploadToR2 };
