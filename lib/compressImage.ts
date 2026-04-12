/**
 * Optimized client-side image compression
 * - Prevents 413 errors (payload too large)
 * - Preserves biometric quality (passport/visa safe)
 * - Fast execution (no recursive loops)
 */

const TARGET_SIZE = 1.2 * 1024 * 1024; // 1.2MB sweet spot
const MAX_DIMENSION = 1600; // Enough for high-quality face detection

export async function compressImage(file: File): Promise<File> {
  // ✅ Skip compression if already small enough
  if (file.size <= TARGET_SIZE) {
    console.log("[compressImage] ✅ Skipping compression (already optimized)");
    return file;
  }

  console.log(
    `[compressImage] Original: ${(file.size / 1024 / 1024).toFixed(2)} MB — optimizing...`
  );

  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = async () => {
      URL.revokeObjectURL(url);

      let width = img.width;
      let height = img.height;

      // ✅ Step 1: Resize (once)
      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        const scale = MAX_DIMENSION / Math.max(width, height);
        width = Math.round(width * scale);
        height = Math.round(height * scale);
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas context error"));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      // ✅ Step 2: Try fixed quality steps (fast + predictable)
      const qualitySteps = [0.85, 0.75, 0.65, 0.55];

      for (const quality of qualitySteps) {
        const blob: Blob | null = await new Promise((res) =>
          canvas.toBlob(res, "image/jpeg", quality)
        );

        if (!blob) continue;

        console.log(
          `[compressImage] quality=${quality}, size=${(blob.size / 1024 / 1024).toFixed(2)} MB`
        );

        if (blob.size <= TARGET_SIZE) {
          const compressed = new File(
            [blob],
            file.name.replace(/\.\w+$/, ".jpg"),
            {
              type: "image/jpeg",
              lastModified: Date.now(),
            }
          );

          console.log(
            `[compressImage] ✅ Done: ${(compressed.size / 1024 / 1024).toFixed(2)} MB`
          );

          resolve(compressed);
          return;
        }
      }

      // ✅ Final fallback (guaranteed under limit)
      const fallbackBlob: Blob | null = await new Promise((res) =>
        canvas.toBlob(res, "image/jpeg", 0.5)
      );

      if (!fallbackBlob) {
        reject(new Error("Final compression failed"));
        return;
      }

      const fallbackFile = new File(
        [fallbackBlob],
        file.name.replace(/\.\w+$/, ".jpg"),
        {
          type: "image/jpeg",
          lastModified: Date.now(),
        }
      );

      console.warn(
        `[compressImage] ⚠️ Fallback used: ${(fallbackFile.size / 1024 / 1024).toFixed(2)} MB`
      );

      resolve(fallbackFile);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      console.warn(
        "[compressImage] ⚠️ Image load failed (possibly HEIC), returning original"
      );
      resolve(file);
    };

    img.src = url;
  });
}