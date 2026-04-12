/**
 * Client-side image compression utility.
 * Resizes and compresses images to stay under the Vercel payload limit (~4.5 MB).
 * Preserves quality as much as possible while ensuring the upload won't fail.
 */

const MAX_FILE_SIZE = 3.5 * 1024 * 1024; // 3.5 MB — preserve detail for biometric crop quality

/**
 * Compress an image File to stay under the Vercel payload size limit.
 * Returns the original file if it's already small enough.
 *
 * Strategy:
 *  1. If file is under 3MB, return as-is (no quality loss).
 *  2. Otherwise, scale down to max 2048px and reduce JPEG quality progressively.
 */
export async function compressImage(file: File): Promise<File> {
  // If the file is already under the limit, return as-is
  if (file.size <= MAX_FILE_SIZE) return file;

  console.log(`[compressImage] Original size: ${(file.size / 1024 / 1024).toFixed(2)} MB — compressing...`);

  return new Promise<File>((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      const tryWithDimension = (maxDim: number, quality: number) => {
        let { width, height } = img;

        // Scale down proportionally
        if (width > maxDim || height > maxDim) {
          const scale = maxDim / Math.max(width, height);
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) {
          reject(new Error("Could not create canvas context"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Canvas compression failed"));
              return;
            }

            console.log(
              `[compressImage] dim=${width}x${height}, quality=${quality.toFixed(2)}, size=${(blob.size / 1024 / 1024).toFixed(2)} MB`
            );

            if (blob.size <= MAX_FILE_SIZE) {
              // Success — wrap as File and return
              const compressed = new File([blob], file.name.replace(/\.\w+$/, ".jpg"), {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              console.log(`[compressImage] ✅ Compressed to ${(compressed.size / 1024 / 1024).toFixed(2)} MB`);
              resolve(compressed);
            } else if (quality > 0.4) {
              // Reduce quality further
              tryWithDimension(maxDim, quality - 0.1);
            } else if (maxDim > 1024) {
              // Quality alone wasn't enough — reduce dimensions too
              tryWithDimension(maxDim - 512, 0.8);
            } else {
              // Give up — return whatever we have (should be small enough at 1024px)
              const compressed = new File([blob], file.name.replace(/\.\w+$/, ".jpg"), {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              console.warn(`[compressImage] ⚠️ Could not compress below limit, final: ${(compressed.size / 1024 / 1024).toFixed(2)} MB`);
              resolve(compressed);
            }
          },
          "image/jpeg",
          quality
        );
      };

      // Start: max 2048px dimension, 0.85 JPEG quality
      tryWithDimension(3072, 0.92);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      // If we can't load the image (e.g. HEIC), return original and let server handle it
      console.warn("[compressImage] Could not load image for compression, returning original");
      resolve(file);
    };

    img.src = url;
  });
}
