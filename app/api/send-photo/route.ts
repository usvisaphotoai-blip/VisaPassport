import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mail";
import dbConnect from "@/lib/mongodb";
import Photo from "@/models/Photo";

export async function POST(req: Request) {
  try {
    const { email, photoUrl, documentType, photoId } = await req.json();

    if (!email || !photoUrl) {
      return NextResponse.json({ error: "Email and photo URL are required" }, { status: 400 });
    }

    // Fetch printSheetUrl from the database if photoId is provided
    let printSheetUrl = '';
    if (photoId) {
      try {
        await dbConnect();
        const photo = await Photo.findById(photoId);
        if (photo?.printSheetUrl) {
          printSheetUrl = photo.printSheetUrl;
        }
      } catch {
        // Non-critical — continue without print sheet
      }
    }

    const docName = documentType ? documentType.split('-').join(' ').toUpperCase() : 'Photo';
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://usvisaphotoai.pro';

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; background: #f8fafc; padding: 32px; border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="font-size: 22px; color: #0f172a; margin: 0 0 8px;">Your ${docName} is Ready! ✅</h1>
          <p style="color: #64748b; font-size: 14px; margin: 0;">Processed by USVisaPhotoAI</p>
        </div>

        <div style="background: white; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
          <h3 style="margin: 0 0 16px; font-size: 15px; color: #334155;">📸 Your Downloads</h3>

          <div style="margin-bottom: 16px;">
            <p style="margin: 0 0 6px; font-size: 13px; color: #64748b; font-weight: 600;">Digital Photo (600×600, DS-160 Ready)</p>
            <a href="${photoUrl}" style="display: inline-block; background: #0f172a; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 700;">⬇ Download Photo</a>
          </div>

          ${printSheetUrl ? `
          <div style="margin-bottom: 16px;">
            <p style="margin: 0 0 6px; font-size: 13px; color: #64748b; font-weight: 600;">A4 Print Sheet (20 photos, ready to cut)</p>
            <a href="${printSheetUrl}" style="display: inline-block; background: #166534; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 700;">⬇ Download Print Sheet</a>
          </div>
          ` : ''}

          ${photoId ? `
          <div style="border-top: 1px solid #f1f5f9; margin-top: 16px; padding-top: 12px;">
            <p style="margin: 0; font-size: 12px; color: #94a3b8;">You can also access your photo anytime at:<br/>
            <a href="${appUrl}/preview/${photoId}" style="color: #2563eb;">${appUrl}/preview/${photoId}</a></p>
          </div>
          ` : ''}
        </div>

        <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
          <h3 style="margin: 0 0 8px; font-size: 15px; color: #334155;">📋 Photo Specifications</h3>
          <table style="width: 100%; font-size: 13px; color: #475569;">
            <tr><td style="padding: 4px 0;">Size</td><td style="text-align: right; font-weight: 600;">600×600 px (2×2 in)</td></tr>
            <tr><td style="padding: 4px 0;">Resolution</td><td style="text-align: right; font-weight: 600;">300 DPI</td></tr>
            <tr><td style="padding: 4px 0;">Format</td><td style="text-align: right; font-weight: 600;">JPEG, sRGB</td></tr>
            <tr><td style="padding: 4px 0;">Background</td><td style="text-align: right; font-weight: 600;">White</td></tr>
          </table>
        </div>

        <div style="text-align: center; padding: 16px 0; border-top: 1px solid #e2e8f0;">
          <p style="font-size: 11px; color: #cbd5e1; margin: 0;">USVisaPhotoAI — AI-Powered Visa Photo Processing</p>
        </div>
      </div>
    `;

    const result = await sendEmail({
      to: email,
      subject: `Your ${docName} Delivery - USVisaPhotoAI`,
      html: htmlContent,
    });

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      throw new Error("SMTP sending failed");
    }
  } catch (error: any) {
    console.error("Failed to send photo via email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
