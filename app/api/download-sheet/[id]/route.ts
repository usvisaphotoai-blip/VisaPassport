import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Photo from "@/models/Photo";

export async function GET(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params;
  try {
    const session = await getServerSession(authOptions);

    await dbConnect();
    const photo = await Photo.findById(id);

    if (!photo) {
      return new NextResponse("Photo not found", { status: 404 });
    }

    if (photo.userId) {
      if (!session || !session.user || photo.userId.toString() !== (session.user as any).id) {
        return new NextResponse("Unauthorized photo access", { status: 403 });
      }
    }

    if (photo.status !== "paid") {
      return new NextResponse("Payment required", { status: 402 });
    }

    // Fetch image from Cloudinary to hide the URL from the user (Reverse Proxy)
    if (!photo.printSheetUrl || !photo.printSheetUrl.startsWith("http")) {
      return new NextResponse("Print sheet not found in database", { status: 404 });
    }

    try {
      const response = await fetch(photo.printSheetUrl);
      if (!response.ok) throw new Error("Failed to fetch image from Cloudinary");
      
      const buffer = await response.arrayBuffer();
      const contentType = response.headers.get('content-type') || 'image/jpeg';
      const ext = contentType === 'image/png' ? '.png' : '.jpeg';

      return new NextResponse(buffer, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": `attachment; filename="studio-photo-${photo.documentType}-print-sheet-A4${ext}"`,
        },
      });
    } catch (fetchError) {
      console.error("Fetch Error:", fetchError);
      return new NextResponse("Failed to download image", { status: 500 });
    }
  } catch (error: any) {
    console.error("Download Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
