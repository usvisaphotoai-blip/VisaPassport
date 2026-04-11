import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'ddxu2wqfm',
  api_key: process.env.CLOUDINARY_API_KEY || '569322389882397',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'TmYg8VBicTOF_2KX6IukYQIOZs4',
});

export default cloudinary;

export const uploadBufferToCloudinary = async (
  buffer: Buffer,
  folder: string,
  tags: string[] = []
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        tags: ['us-visa-photo', ...tags],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result?.secure_url as string);
      }
    );
    uploadStream.end(buffer);
  });
};
