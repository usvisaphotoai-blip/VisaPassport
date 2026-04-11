import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ValidationRecord from "@/models/ValidationRecord";
import sharp from "sharp";
import { uploadBufferToCloudinary } from "@/lib/cloudinary";
import {
  EYE_LEVEL_MIN,
  EYE_LEVEL_MAX,
  HEAD_SIZE_MIN,
  HEAD_SIZE_MAX,
  CENTERING_THRESHOLD,
} from "@/lib/mediapipe";

// ------------------------------------------------------------------
// SERVER-SIDE VALIDATION — Sharp quality checks ONLY (no face-api)
// Face/biometric checks come from the client and are merged here.
// ------------------------------------------------------------------

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;
    const documentType = (formData.get("type") as string) || "general";

    // Client-side face detection results (pre-computed in browser)
    const clientDataRaw = formData.get("clientData") as string | null;
    let clientData: {
      faceCount: number;
      eyeLevelPct: number | null;
      headSizePct: number | null;
      brightness: number;
      orientationRatio: number | null;
      faceBox: { x: number; y: number; width: number; height: number } | null;
    } | null = null;

    try {
      if (clientDataRaw) clientData = JSON.parse(clientDataRaw);
    } catch {
      // ignore malformed
    }

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // --- SHARP QUALITY CHECKS ---
    let metadata;
    try {
      metadata = await sharp(buffer).metadata();
    } catch (sharpErr: any) {
      console.error("Sharp metadata error:", sharpErr);
      return NextResponse.json(
        { error: "Could not read image", details: "The uploaded file could not be processed. Please upload a valid JPEG or PNG image." },
        { status: 400 }
      );
    }

    const isJpeg = metadata.format === "jpeg" || metadata.format === "jpg";
    const isPng = metadata.format === "png";
    const sizeKb = buffer.length / 1024;

    let brightness = 0;
    try {
      const stats = await sharp(buffer).stats();
      if (stats.channels.length >= 3) {
        brightness =
          (stats.channels[0].mean +
            stats.channels[1].mean +
            stats.channels[2].mean) /
          3;
      }
    } catch {
      // If stats fail, use client brightness as fallback
      brightness = clientData?.brightness ?? 128;
    }

    const checks: { name: string; status: string; detail: string }[] = [];
    let overallStatus = "PASS";

    const strictDocs = ["us-visa", "dv-lottery", "us-passport", "green-card"];
    const isStrict = strictDocs.includes(documentType);

    // 1. File Format
    if (isJpeg) {
      checks.push({
        name: "File Format",
        status: "PASS",
        detail: "Valid JPEG format",
      });
    } else if (isPng) {
      checks.push({
        name: "File Format",
        status: isStrict ? "FAIL" : "WARN",
        detail: isStrict 
          ? "PNG detected. Official DS-160/US Visa submissions strictly require JPEG format." 
          : "PNG detected. JPEG is recommended for official submissions.",
      });
    } else {
      checks.push({
        name: "File Format",
        status: documentType === "general" ? "WARN" : "FAIL",
        detail: `Format is ${metadata.format}. JPEG required.`,
      });
      if (documentType !== "general") overallStatus = "FAIL";
    }

    // 2. File Size
    if (sizeKb <= 240) {
      checks.push({
        name: "File Size",
        status: "PASS",
        detail: `${Math.round(sizeKb)} KB (Under 240 KB limit)`,
      });
    } else {
      checks.push({
        name: "File Size",
        status: "WARN",
        detail: `${Math.round(sizeKb)} KB exceeds 240 KB (will be compressed during processing)`,
      });
    }

    // 3. Image Dimensions - STRICT MINIMUM BLOCK
    const imgW = metadata.width || 0;
    const imgH = metadata.height || 0;
    
    // Short circuit error if less than 600x600
    if (imgW < 600 || imgH < 600) {
      return NextResponse.json(
        { 
          error: "Low Resolution Error", 
          details: `The uploaded image is ${imgW}×${imgH} pixels. The minimum acceptable resolution for US Visas/Passports is 600×600 pixels. Please upload a higher quality photo.` 
        },
        { status: 400 }
      );
    }

    if (imgW === 600 && imgH === 600) {
      checks.push({
        name: "Image Resolution",
        status: "PASS",
        detail: "Exactly 600×600 px — target resolution matched",
      });
    } else {
      checks.push({
        name: "Image Resolution",
        status: "WARN",
        detail: `${imgW}×${imgH} px — meets minimum, but will be perfectly cropped to 600×600 on download`,
      });
    }

    // 4. Lighting / Brightness (server re-check via Sharp)
    if (brightness > 80 && brightness < 230) {
      checks.push({
        name: "Lighting",
        status: "PASS",
        detail: "Good exposure detected",
      });
    } else if (brightness <= 80) {
      checks.push({
        name: "Lighting",
        status: "WARN",
        detail: "Image appears too dark — use better lighting",
      });
    } else {
      checks.push({
        name: "Lighting",
        status: "WARN",
        detail: "Image appears overexposed — reduce lighting",
      });
    }

    // --- MERGE CLIENT-SIDE FACE DETECTION RESULTS ---
    if (clientData) {
      // Face count
      if (clientData.faceCount === 0) {
        checks.push({
          name: "Face Detection",
          status: "FAIL",
          detail: "No face detected in the image. Ensure your face is clearly visible.",
        });
        overallStatus = "FAIL";
      } else if (clientData.faceCount > 1) {
        checks.push({
          name: "Face Detection",
          status: "FAIL",
          detail: `${clientData.faceCount} faces detected. Only one person is allowed.`,
        });
        overallStatus = "FAIL";
      } else {
        checks.push({
          name: "Face Detection",
          status: "PASS",
          detail: "Exactly 1 face detected",
        });
      }

      // Eye Level
      if (clientData.eyeLevelPct !== null) {
        const pct = clientData.eyeLevelPct;
        if (pct >= EYE_LEVEL_MIN && pct <= EYE_LEVEL_MAX) {
          checks.push({
            name: "Eye Level",
            status: "PASS",
            detail: `${pct.toFixed(1)}% from bottom (Target: ${EYE_LEVEL_MIN}–${EYE_LEVEL_MAX}%)`,
          });
        } else {
          // If significantly off, mark as FAIL for strict docs
          const isExtreme = pct < 50 || pct > 75;
          checks.push({
            name: "Eye Level",
            status: (isStrict && isExtreme) ? "FAIL" : "WARN",
            detail: `${pct.toFixed(1)}% from bottom (Target: ${EYE_LEVEL_MIN}–${EYE_LEVEL_MAX}%) — ${pct < EYE_LEVEL_MIN ? "eyes are too low" : "eyes are too high"}`,
          });
        }
      }

      // Head Size
      if (clientData.headSizePct !== null) {
        const pct = clientData.headSizePct;
        if (pct >= HEAD_SIZE_MIN && pct <= HEAD_SIZE_MAX) {
          checks.push({
            name: "Head Size",
            status: "PASS",
            detail: `${pct.toFixed(1)}% of image height (Target: ${HEAD_SIZE_MIN}–${HEAD_SIZE_MAX}%)`,
          });
        } else {
          // If significantly off, mark as FAIL for strict docs
          const isExtremeHead = pct < 40 || pct > 80;
          checks.push({
            name: "Head Size",
            status: (isStrict && isExtremeHead) ? "FAIL" : "WARN",
            detail: `${pct.toFixed(1)}% of image height (Target: ${HEAD_SIZE_MIN}–${HEAD_SIZE_MAX}%) — ${pct < HEAD_SIZE_MIN ? "head is too small" : "head is too large"}`,
          });
        }
      }

      // Orientation
      if (clientData.orientationRatio !== null) {
        if (clientData.orientationRatio > 2.0) {
          checks.push({
            name: "Orientation",
            status: "WARN",
            detail: "Face may not be directly facing the camera — look straight ahead",
          });
        } else {
          checks.push({
            name: "Orientation",
            status: "PASS",
            detail: "Frontal orientation verified",
          });
        }
      }
    } else {
      // No client data — can't validate face
      checks.push({
        name: "Face Detection",
        status: isStrict ? "FAIL" : "WARN",
        detail: "Biometric face analysis data not received. Please use a modern browser for face validation.",
      });
    }

    // --- DERIVE OVERALL STATUS FROM CHECKS ---
    const hasFail = checks.some((c) => c.status === "FAIL");
    const hasWarn = checks.some((c) => c.status === "WARN");

    if (hasFail) {
      overallStatus = "FAIL";
    } else if (hasWarn) {
      overallStatus = "WARN";
    } else {
      overallStatus = "PASS";
    }

    // --- SAVE TO MONGODB (non-blocking — don't fail validation if DB is down) ---
    let reportId = null;
    try {
      await dbConnect();
      
      // Upload image to Cloudinary (as per user request: "save that image and only save them dont use that image for any purpose")
      const validationImageUrl = await uploadBufferToCloudinary(buffer, 'validations', ['validation-raw']);

      const record = await ValidationRecord.create({
        documentType,
        overallStatus,
        checks,
        imageUrl: validationImageUrl,
        metrics: {
          eyeLevelPct: clientData?.eyeLevelPct ?? null,
          headSizePct: clientData?.headSizePct ?? null,
          faceCount: clientData?.faceCount ?? null,
          fileSizeKb: sizeKb,
          brightness,
        },
      });
      reportId = record._id;
    } catch (dbErr) {
      console.warn("MongoDB save failed (non-critical):", dbErr);
      // Continue — validation result is still valid
    }

    return NextResponse.json({
      success: true,
      reportId,
      documentType,
      overallStatus,
      checks,
      imageDimensions: { width: imgW, height: imgH },
    });
  } catch (error: any) {
    console.error("Validation Error:", error);
    return NextResponse.json(
      { error: "Validation failed", details: error.message },
      { status: 500 }
    );
  }
}
