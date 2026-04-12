import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { uploadBufferToCloudinary } from "@/lib/cloudinary";
import { HEAD_TOP_MULTIPLIER } from "@/lib/mediapipe";
import { getSpecById } from "@/lib/specs";

// ------------------------------------------------------------------
// CROP ENDPOINT — Uses client-provided face landmarks + Sharp
// to crop the image to US Department of State passport guidelines.
//
// US Guidelines (2x2 inch / 600×600 px):
//  • Head height: 1–1 3/8 inches (50–69% of image height)
//  • Eye line: 1 1/8 – 1 3/8 inches from bottom (56–69%)
//  • Centered horizontally
// ------------------------------------------------------------------

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;
    const faceDataRaw = formData.get("faceData") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    if (!faceDataRaw) {
      return NextResponse.json(
        { error: "Face detection data is required for cropping" },
        { status: 400 }
      );
    }

    let faceData: {
      faceBox: { x: number; y: number; width: number; height: number };
      eyeCenter: { x: number; y: number };
      chinY: number;
      topOfHeadY: number;
      imageDimensions: { width: number; height: number };
    };

    try {
      faceData = JSON.parse(faceDataRaw);
    } catch {
      return NextResponse.json(
        { error: "Invalid face data format" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const imagePipeline = sharp(buffer).rotate();
    const metadata = await imagePipeline.metadata();

    // Check image compliance (dullness / lighting) at the beginning of the pipeline
    const stats = await sharp(buffer).stats();
    let totalStdDev = 0;
    let totalMean = 0;
    // channels might contain an alpha channel, we only care about RGB.
    const colorChannels = Math.min(3, stats.channels.length);
    for (let i = 0; i < colorChannels; i++) {
      totalStdDev += stats.channels[i].stdev;
      totalMean += stats.channels[i].mean;
    }
    const avgStdDev = totalStdDev / colorChannels;
    const avgMean = totalMean / colorChannels;

    // Low contrast/dull image check (greyish image)
    if (avgStdDev < 10) {
      return NextResponse.json(
        { error: "Image is too dull or lacks contrast. Please retake the photo in better lighting." },
        { status: 400 }
      );
    }
    // Extreme lighting check (too dark or too washed out/bright)
    if (avgMean < 30) {
      return NextResponse.json(
        { error: "Image is too dark. Please retake the photo in a well-lit area without shadows." },
        { status: 400 }
      );
    }
    if (avgMean > 245) {
      return NextResponse.json(
        { error: "Image is too bright or washed out. Please retake the photo with even lighting." },
        { status: 400 }
      );
    }

    let imgW = metadata.width || faceData.imageDimensions.width;
    let imgH = metadata.height || faceData.imageDimensions.height;

    // sharp.metadata() returns unrotated dimensions. If .rotate() was called,
    // EXIF orientations >= 5 mean the image is rotated 90 or 270 degrees.
    if (metadata.orientation && metadata.orientation >= 5) {
      imgW = metadata.height || faceData.imageDimensions.width;
      imgH = metadata.width || faceData.imageDimensions.height;
    }

    // ---------------------------------------------------------------
    // BUG FIX B7 — EXIF rotation scale mismatch
    // The client runs MediaPipe on the visually-correct (rotated) image
    // and sends imageDimensions matching that visual frame.
    // After EXIF auto-rotate above, imgW/imgH already reflect the
    // display orientation, so we must NOT swap faceData dimensions
    // before computing scaleX/scaleY. Use imgW/imgH as-is.
    // ---------------------------------------------------------------
    const scaleX = imgW / faceData.imageDimensions.width;
    const scaleY = imgH / faceData.imageDimensions.height;

    if (Math.abs(scaleX - 1) > 0.01 || Math.abs(scaleY - 1) > 0.01) {
      console.log(`[crop] Scaling face coordinates: image ${imgW}x${imgH} vs faceData ${faceData.imageDimensions.width}x${faceData.imageDimensions.height} (scale: ${scaleX.toFixed(3)}, ${scaleY.toFixed(3)})`);
      faceData.faceBox.x *= scaleX;
      faceData.faceBox.y *= scaleY;
      faceData.faceBox.width *= scaleX;
      faceData.faceBox.height *= scaleY;
      faceData.eyeCenter.x *= scaleX;
      faceData.eyeCenter.y *= scaleY;
      faceData.chinY *= scaleY;
      faceData.topOfHeadY *= scaleY;
      faceData.imageDimensions.width = imgW;
      faceData.imageDimensions.height = imgH;
    }

    // Background removal is done client-side before this endpoint is called
    const documentType = formData.get("type") as string || "general";
    const spec = getSpecById(documentType);
    const targetBgRaw = formData.get("targetBackground") as string || spec?.bg_color || "white";
    const filenameExt = targetBgRaw === "transparent" ? "png" : "jpg";

    // ---- VALIDATE face data fields ----
    if (
      !faceData.faceBox || !faceData.eyeCenter ||
      faceData.chinY == null || faceData.topOfHeadY == null ||
      !faceData.imageDimensions?.width || !faceData.imageDimensions?.height
    ) {
      return NextResponse.json(
        { error: "Incomplete face data — faceBox, eyeCenter, chinY, topOfHeadY, and imageDimensions are required" },
        { status: 400 }
      );
    }

    // ---- FACE VALIDATION (server-side guards) ----
    const faceAreaPct = (faceData.faceBox.width * faceData.faceBox.height) / (imgW * imgH) * 100;
    if (faceAreaPct < 3) {
      return NextResponse.json(
        { error: "Face is too small in the image. Please take a closer photo where your face fills more of the frame." },
        { status: 400 }
      );
    }

    // ---- Calculate crop region per US passport guidelines ----
    const headHeight = faceData.chinY - faceData.topOfHeadY;

    if (headHeight <= 0 || headHeight < imgH * 0.05) {
      return NextResponse.json(
        { error: "Face landmarks appear invalid — chin is above forehead, or face is too small. Please try a clearer photo." },
        { status: 400 }
      );
    }

    // ---------------------------------------------------------------
    // BUG FIX #5 — HEAD_TOP_MULTIPLIER was hardcoded for all specs.
    // Some country specs have tight head% ranges and need a different
    // crown multiplier. Allow spec to override via head_top_multiplier.
    // Falls back to the shared constant if not set on the spec.
    // ---------------------------------------------------------------
    const headTopMultiplier = spec?.head_top_multiplier ?? HEAD_TOP_MULTIPLIER;
    const fullHeadHeight = headHeight * headTopMultiplier;
    const trueTopOfHead = faceData.chinY - fullHeadHeight;

    // ---------------------------------------------------------------
    // BUG FIX #2 — Spec fallbacks used `||` which treats 0 as falsy.
    // A country spec with head_min_pct:0 (or any valid 0-value field)
    // was silently overridden by US defaults. Use `!= null` instead.
    // ---------------------------------------------------------------
    const MIN_HEAD_PCT = (spec?.head_min_pct != null ? spec.head_min_pct : 50) / 100;
    const MAX_HEAD_PCT = (spec?.head_max_pct != null ? spec.head_max_pct : 69) / 100;
    const MIN_EYE_PCT = (spec?.eye_min_pct != null ? spec.eye_min_pct : 56) / 100; // % from bottom
    const MAX_EYE_PCT = (spec?.eye_max_pct != null ? spec.eye_max_pct : 69) / 100; // % from bottom

    const TARGET_HEAD_PCT = (MIN_HEAD_PCT + MAX_HEAD_PCT) / 2;

    // ---------------------------------------------------------------
    // BUG FIX #3 — TARGET_EYE_PCT was the midpoint of the range.
    // For narrow or asymmetric country ranges (<5%), the midpoint
    // left too little headroom for the crown solver, causing it to
    // push the eye outside the valid range before the clamp fires.
    // Bias toward the lower third (more crown headroom).
    // ---------------------------------------------------------------
    const TARGET_EYE_PCT = (MIN_EYE_PCT * 2 + MAX_EYE_PCT) / 3; // % from bottom, biased low

    // eye "from top" equivalents for the crop math
    const TARGET_EYE_TOP_PCT = 1 - TARGET_EYE_PCT;
    const MIN_EYE_TOP_PCT = 1 - MAX_EYE_PCT; // min from top = 1 - max from bottom
    const MAX_EYE_TOP_PCT = 1 - MIN_EYE_PCT; // max from top = 1 - min from bottom

    const targetW = spec?.width_px || 600;
    const targetH = spec?.height_px || 600;
    const targetAspectRatio = targetW / targetH;

    let cropHeight = fullHeadHeight / TARGET_HEAD_PCT;
    let cropWidth = cropHeight * targetAspectRatio;
    let cropTop = faceData.eyeCenter.y - (cropHeight * TARGET_EYE_TOP_PCT);

    // 1. DYNAMIC HAIR SOLVER (Crown Protection)
    const CAUTION_MARGIN = cropHeight * 0.04; // 4% safety buffer at the top
    if (cropTop > trueTopOfHead - CAUTION_MARGIN) {
      cropTop = trueTopOfHead - CAUTION_MARGIN;

      const eyeOffset = faceData.eyeCenter.y - cropTop;
      if ((eyeOffset / cropHeight) > MAX_EYE_TOP_PCT) {
        cropHeight = eyeOffset / MAX_EYE_TOP_PCT;
        cropWidth = cropHeight * targetAspectRatio;
        cropTop = faceData.eyeCenter.y - (cropHeight * MAX_EYE_TOP_PCT);
      }
    }

    // 2. BOUNDARY CLAMPING: Legal head sizes (50-69%)
    const maxCropHeightAllowed = fullHeadHeight / MIN_HEAD_PCT;
    const minCropHeightAllowed = fullHeadHeight / MAX_HEAD_PCT;

    if (cropHeight < minCropHeightAllowed) {
      cropHeight = minCropHeightAllowed;
      cropWidth = cropHeight * targetAspectRatio;
    }
    if (cropHeight > maxCropHeightAllowed) {
      cropHeight = maxCropHeightAllowed;
      cropWidth = cropHeight * targetAspectRatio;
    }

    let revalidatedEyeTopPct = (faceData.eyeCenter.y - cropTop) / cropHeight;
    if (revalidatedEyeTopPct > MAX_EYE_TOP_PCT) {
      cropTop = faceData.eyeCenter.y - (cropHeight * MAX_EYE_TOP_PCT);
    } else if (revalidatedEyeTopPct < MIN_EYE_TOP_PCT) {
      cropTop = faceData.eyeCenter.y - (cropHeight * MIN_EYE_TOP_PCT);
    }

    // 3. IMAGE BOUND CLAMPING
    // ---------------------------------------------------------------
    // BUG FIX B2 + B3 — Bottom/top boundary shrink breaks head %
    // Old code silently shrank cropSize when the crop extended beyond
    // image edges, which pushed head% above 69% causing rejections.
    // Fix: add padding instead of shrinking. We track how much the
    // crop box extends outside the image and pad later via sharp's
    // .extend() — the same way left/right overflow is already handled.
    // After all adjustments, we hard-validate final head% and reject
    // photos that mathematically cannot be made compliant.
    // ---------------------------------------------------------------

    // Do NOT shrink cropSize here — use padding instead (handled below in extend())
    if (cropTop + cropHeight > imgH) {
      console.log(`[crop] Bottom overflow: cropTop=${cropTop.toFixed(0)} + cropHeight=${cropHeight.toFixed(0)} > imgH=${imgH}, will pad bottom`);
    }
    if (cropTop < 0) {
      console.log(`[crop] Top overflow: cropTop=${cropTop.toFixed(0)}, will pad top`);
    }

    // Absolute minimum cropHeight safety
    if (cropHeight < minCropHeightAllowed) {
      cropHeight = minCropHeightAllowed;
      cropWidth = cropHeight * targetAspectRatio;
    }

    const maxAllowedCropHeight = Math.max(imgW, imgH) * 2;
    if (cropHeight > maxAllowedCropHeight) {
      console.warn(`[crop] cropHeight ${cropHeight.toFixed(0)} exceeded 2× image bounds, clamping`);
      cropHeight = maxAllowedCropHeight;
      cropWidth = cropHeight * targetAspectRatio;
    }

    if (cropHeight < 200) {
      cropHeight = 200;
      cropWidth = cropHeight * targetAspectRatio;
    }

    // ---------------------------------------------------------------
    // BUG FIX B2+B3 (continued) — Post-clamp compliance validation
    // ---------------------------------------------------------------
    const postClampHeadPct = (fullHeadHeight / cropHeight) * 100;
    if (postClampHeadPct < MIN_HEAD_PCT * 100 || postClampHeadPct > MAX_HEAD_PCT * 100) {
      console.warn(`[crop] Non-compliant head%: ${postClampHeadPct.toFixed(1)}% (allowed ${Math.round(MIN_HEAD_PCT * 100)}–${Math.round(MAX_HEAD_PCT * 100)}%)`);
      return NextResponse.json(
        { error: `Head size (${postClampHeadPct.toFixed(0)}%) is outside the allowed ${Math.round(MIN_HEAD_PCT * 100)}–${Math.round(MAX_HEAD_PCT * 100)}% range. Please retake the photo with your face closer to or further from the camera.` },
        { status: 400 }
      );
    }

    // ---------------------------------------------------------------
    // BUG FIX #1 — cropLeft was computed too early using a stale cropWidth.
    // cropWidth is recalculated many times by the crown solver and boundary
    // clamping above. Moving cropLeft here ensures it always uses the final
    // cropWidth, keeping the face correctly centered for all spec aspect ratios.
    // ---------------------------------------------------------------
    const faceCenterX = faceData.faceBox.x + (faceData.faceBox.width / 2);
    let cropLeft = faceCenterX - cropWidth / 2;

    // ---------------------------------------------------------------
    // BUG FIX #6 — roundedCrop* variables were computed but never used.
    // The raw floats flowed through to extract() and extend(), where
    // independent Math.round() calls produced mismatched intermediate
    // dimensions (1px gap/overlap). Apply rounding once here, then use
    // these values everywhere below.
    // ---------------------------------------------------------------
    cropHeight = Math.round(cropHeight);
    cropWidth = Math.round(cropWidth);
    cropTop = Math.round(cropTop);
    cropLeft = Math.round(cropLeft);

    console.log(`[crop] headHeight=${headHeight.toFixed(0)}, fullHeadHeight=${fullHeadHeight.toFixed(0)}, cropHeight=${cropHeight}, cropWidth=${cropWidth}, cropTop=${cropTop}, cropLeft=${cropLeft}, imgW=${imgW}, imgH=${imgH}, headPct=${postClampHeadPct.toFixed(1)}%`);

    const extractLeft = Math.max(0, cropLeft);
    const extractTop = Math.max(0, cropTop);
    const extractRight = Math.min(imgW, cropLeft + cropWidth);
    const extractBottom = Math.min(imgH, cropTop + cropHeight);

    const extractW = Math.max(1, extractRight - extractLeft);
    const extractH = Math.max(1, extractBottom - extractTop);

    const paddingTop = Math.max(0, -cropTop);
    const paddingLeft = Math.max(0, -cropLeft);
    const paddingBottom = Math.max(0, (cropTop + cropHeight) - imgH);
    const paddingRight = Math.max(0, (cropLeft + cropWidth) - imgW);

    const intermediateW = extractW + paddingLeft + paddingRight;
    const intermediateH = extractH + paddingTop + paddingBottom;
    console.log(`[crop] extract=${extractW}x${extractH}, padding T=${paddingTop} B=${paddingBottom} L=${paddingLeft} R=${paddingRight}, intermediate=${intermediateW}x${intermediateH}`);

    // ---- Final Sharp Crop ----
    let bgRgb = { r: 255, g: 255, b: 255, alpha: 1 };
    switch (targetBgRaw.toLowerCase()) {
      case "transparent":
        bgRgb = { r: 255, g: 255, b: 255, alpha: 0 };
        break;
      case "light-gray":
        bgRgb = { r: 243, g: 244, b: 246, alpha: 1 };
        break;
      case "light-blue":
        bgRgb = { r: 239, g: 246, b: 255, alpha: 1 };
        break;
      case "blue":
        bgRgb = { r: 0, g: 71, b: 171, alpha: 1 };
        break;
      case "white":
      default:
        bgRgb = { r: 255, g: 255, b: 255, alpha: 1 };
        break;
    }

    let cropChain = imagePipeline
      .extract({
        left: extractLeft,
        top: extractTop,
        width: extractW,
        height: extractH,
      })
      .extend({
        top: paddingTop,
        bottom: paddingBottom,
        left: paddingLeft,
        right: paddingRight,
        background: bgRgb,
      });

    // ---------------------------------------------------------------
    // BUG FIX B4 — flatten() unconditionally destroyed PNG transparency
    // ---------------------------------------------------------------
    if (filenameExt !== "png") {
      cropChain = cropChain.flatten({ background: { r: 255, g: 255, b: 255 } });
    }

    cropChain = cropChain
      .toColorspace("srgb")
      .resize(targetW, targetH, { fit: "fill" })
      .withMetadata({ density: 300 });

    if (filenameExt === "png") {
      cropChain = cropChain.png();
    } else {
      cropChain = cropChain.jpeg({ quality: 100, chromaSubsampling: "4:4:4" });
    }

    let processedBuffer = await cropChain.toBuffer();

    // ---- SAFETY: Guarantee output is exactly targetW×targetH ----
    const finalMeta = await sharp(processedBuffer).metadata();
    if (finalMeta.width !== targetW || finalMeta.height !== targetH) {
      console.warn(`[crop] Output was ${finalMeta.width}x${finalMeta.height}, forcing to ${targetW}x${targetH}`);
      processedBuffer = await sharp(processedBuffer)
        .resize(targetW, targetH, { fit: "fill" })
        .toBuffer();
    }

    // ---------------------------------------------------------------
    // BUG FIX B6 — Binary search compression: low=1 covers full range
    // ---------------------------------------------------------------
    if (filenameExt === "jpg") {
      const MAX_SIZE_BYTES = 240 * 1024; // 240 KB
      const referenceBuffer = processedBuffer;

      if (processedBuffer.length > MAX_SIZE_BYTES) {
        let low = 1;
        let high = 100;
        let bestBuffer: Buffer | null = null;
        let bestQuality = -1;

        while (low <= high) {
          const mid = Math.floor((low + high) / 2);
          const testBuffer = await sharp(referenceBuffer)
            .jpeg({ quality: mid, chromaSubsampling: "4:4:4" })
            .toBuffer();

          if (testBuffer.length <= MAX_SIZE_BYTES) {
            bestBuffer = testBuffer;
            bestQuality = mid;
            low = mid + 1;
          } else {
            high = mid - 1;
          }
        }

        if (!bestBuffer) {
          console.error(`[crop] Cannot compress 600×600 image below 240KB even at quality=1`);
          return NextResponse.json(
            { error: "Image cannot be compressed to meet the 240KB DS-160 limit. Please try a photo with a simpler background." },
            { status: 400 }
          );
        }

        processedBuffer = bestBuffer;
        console.log(`[crop] Compressed to quality=${bestQuality}, size=${Math.round(processedBuffer.length / 1024)}KB`);
      }
    }

    const watermarkedBuffer = processedBuffer;

    // ---------------------------------------------------------------
    // DYNAMIC PRINT SHEET GENERATOR
    // Supports A4 (2480x3508) and Letter (2550x3300)
    // ---------------------------------------------------------------
    const svgBorder = `<svg width="${targetW}" height="${targetH}"><rect x="1" y="1" width="${targetW - 2}" height="${targetH - 2}" fill="none" stroke="black" stroke-width="2"/></svg>`;
    const borderedBuffer = await sharp(processedBuffer)
      .composite([{ input: Buffer.from(svgBorder), blend: "over" }])
      .toBuffer();

    const isA4 = spec?.print_size !== "Letter";
    const sheetW = isA4 ? 2480 : 2550;
    const sheetH = isA4 ? 3508 : 3300;

    const PHOTO_GAP = 12;
    const COL_STEP = targetW + PHOTO_GAP;
    const ROW_STEP = targetH + PHOTO_GAP;

    const cols = Math.floor((sheetW - 40) / COL_STEP);
    const rows = Math.floor((sheetH - 40) / ROW_STEP);

    const marginX = Math.floor((sheetW - (cols * targetW + (cols - 1) * PHOTO_GAP)) / 2);
    const marginY = Math.floor((sheetH - (rows * targetH + (rows - 1) * PHOTO_GAP)) / 2);

    const composites = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        composites.push({
          input: borderedBuffer,
          top: marginY + r * ROW_STEP,
          left: marginX + c * COL_STEP,
        });
      }
    }

    const printSheetBuffer = await sharp({
      create: {
        width: sheetW,
        height: sheetH,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      },
    })
      .composite(composites)
      .jpeg({ quality: 100 })
      .toBuffer();

    const [secureUrl, previewUrl, printSheetUrl] = await Promise.all([
      uploadBufferToCloudinary(processedBuffer, "visa-photos", ["secure"]),
      uploadBufferToCloudinary(watermarkedBuffer, "visa-photos", ["preview"]),
      uploadBufferToCloudinary(printSheetBuffer, "visa-photos", ["print-sheet"]),
    ]);

    // ---------------------------------------------------------------
    // BUG FIX B5 — Wrong metrics saved to MongoDB (eye% was "from top",
    // not "from bottom" as the US DoS spec requires).
    // ---------------------------------------------------------------
    const outputScale = targetH / cropHeight;
    const scaledFullHeadHeight = fullHeadHeight * outputScale;

    const effectiveEyeY = faceData.eyeCenter.y - extractTop + paddingTop;
    const scaledEyeY = effectiveEyeY * (targetH / cropHeight);

    const finalHeadPct = (scaledFullHeadHeight / targetH) * 100;
    const finalEyeFromBottomPct = ((targetH - scaledEyeY) / targetH) * 100; // % from bottom

    console.log(`[crop] Final metrics — headPct=${finalHeadPct.toFixed(1)}% (target ${Math.round(MIN_HEAD_PCT * 100)}–${Math.round(MAX_HEAD_PCT * 100)}%), eyeFromBottom=${finalEyeFromBottomPct.toFixed(1)}% (target ${Math.round(MIN_EYE_PCT * 100)}–${Math.round(MAX_EYE_PCT * 100)}%)`);

    const dbConnect = (await import("@/lib/mongodb")).default;
    const Photo = (await import("@/models/Photo")).default;

    await dbConnect();

    const photoRecord = await Photo.create({
      documentType: formData.get("type") as string || "general",
      secureUrl: secureUrl,
      previewUrl: previewUrl,
      printSheetUrl: printSheetUrl,
      metrics: {
        headSizePct: finalHeadPct.toFixed(1),
        eyeLevelPct: finalEyeFromBottomPct.toFixed(1), // % from bottom, matches US DoS spec
      },
    });

    console.log("Saved photoRecord:", photoRecord._id);

    return NextResponse.json({
      success: true,
      photoId: photoRecord._id.toString(),
      processedImageUrl: previewUrl,
      dimensions: `${targetW}×${targetH}`,
      format: filenameExt.toUpperCase(),
      sizeKb: Math.round(processedBuffer.length / 1024),
    });
  } catch (error: any) {
    console.error("Crop Error:", error);
    return NextResponse.json(
      { error: "Crop failed", details: error.message },
      { status: 500 }
    );
  }
}