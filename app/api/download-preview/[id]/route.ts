import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Photo from "@/models/Photo";

export async function GET(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params;
  try {
    await dbConnect();
    const photo = await Photo.findById(id);

    if (!photo) {
      return new NextResponse("Photo not found", { status: 404 });
    }

    // Fetch image from Cloudinary to hide the URL from the user (Reverse Proxy)
    if (!photo.previewUrl || !photo.previewUrl.startsWith("http")) {
      return new NextResponse("Invalid preview source in database", { status: 500 });
    }

    try {
      const response = await fetch(photo.previewUrl);
      if (!response.ok) throw new Error("Failed to fetch image from Cloudinary");
      
      const buffer = await response.arrayBuffer();
      const contentType = response.headers.get('content-type') || 'image/jpeg';
      const ext = contentType === 'image/png' ? '.png' : '.jpeg';

      return new NextResponse(buffer, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": `attachment; filename="preview-studio-photo-${photo.documentType}${ext}"`,
        },
      });
    } catch (fetchError) {
      console.error("Fetch Error:", fetchError);
      return new NextResponse("Failed to download preview image", { status: 500 });
    }
  } catch (error: any) {
    console.error("Download Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
