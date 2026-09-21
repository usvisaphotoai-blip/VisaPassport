import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export const uploadBufferToCloudinary = async (
  buffer: Buffer,
  folder: string,
  tags: string[] = [],
  resourceType: 'image' | 'raw' | 'auto' = 'image',
  publicId?: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadOptions: any = {
      folder,
      tags: ['us-visa-photo', ...tags],
      resource_type: resourceType,
    };
    if (publicId) {
      uploadOptions.public_id = publicId;
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) return reject(error);
        resolve(result?.secure_url as string);
      }
    );
    uploadStream.end(buffer);
  });
};
