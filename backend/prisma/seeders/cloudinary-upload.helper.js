import cloudinary from "../../src/config/cloudinary.config.js";

const uploadCache = new Map();

export const uploadImageToCloudinary = async (sourceUrl, publicId) => {
  if (!sourceUrl) {
    throw new Error("sourceUrl is required for Cloudinary upload");
  }

  const cacheKey = sourceUrl;
  if (uploadCache.has(cacheKey)) {
    return uploadCache.get(cacheKey);
  }

  const result = await cloudinary.uploader.upload(sourceUrl, {
    public_id: publicId,
    overwrite: true,
    unique_filename: false,
    resource_type: "image",
  });

  uploadCache.set(cacheKey, result.secure_url);
  return result.secure_url;
};

export const uploadImageSetToCloudinary = async (sourceUrls = [], publicIdPrefix) => {
  const uploads = sourceUrls.map((sourceUrl, index) =>
    uploadImageToCloudinary(sourceUrl, `${publicIdPrefix}/${index + 1}`)
  );

  return Promise.all(uploads);
};
