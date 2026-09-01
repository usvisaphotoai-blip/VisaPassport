import { NextRequest, NextResponse } from "next/server";
import { uploadBufferToCloudinary } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, paperSize, photoSize, format } = body;

    if (!image || typeof image !== "string") {
      return NextResponse.json(
        { error: "Image data URL is required" },
        { status: 400 }
      );
    }

    // Extract base64 part if it's a data URL
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    const tags = [
      "print-template",
      "print-sheet",
      paperSize ? `paper-${paperSize}` : "paper-custom",
      photoSize ? `photo-${photoSize}` : "photo-custom",
      format ? `format-${format}` : "format-jpg",
    ];

    const cloudinaryUrl = await uploadBufferToCloudinary(
      buffer,
      "visa-photos-pixpassport",
      tags
    );

    return NextResponse.json({
      success: true,
      url: cloudinaryUrl,
    });
  } catch (error: any) {
    console.error("[upload-template] Error uploading to Cloudinary:", error);
    return NextResponse.json(
      { error: "Failed to upload image to Cloudinary", details: error.message },
      { status: 500 }
    );
  }
}
