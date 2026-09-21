import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

async function testUpload() {
  console.log("Testing Cloudinary config:", {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    has_api_key: Boolean(process.env.CLOUDINARY_API_KEY),
    has_secret: Boolean(process.env.CLOUDINARY_API_SECRET),
  });

  const dummyPdf = Buffer.from("%PDF-1.4 test invoice buffer");
  const uploadRes = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "pixpassport/invoices",
        resource_type: "raw",
        public_id: "test-invoice-check.pdf",
        tags: ["test-invoice"],
        overwrite: true,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(dummyPdf);
  });

  console.log("Cloudinary Upload Success:", uploadRes.secure_url);
}

testUpload().catch(console.error);
