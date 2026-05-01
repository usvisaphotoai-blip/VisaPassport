import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Photo from "@/models/Photo";
import crypto from "crypto";
import { sendEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      photoId,
    } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !photoId) {
      return NextResponse.json(
        { error: "Missing required payment verification parameters" },
        { status: 400 }
      );
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature !== expectedSign) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    // Payment is valid, update photo status
    await dbConnect();
    const photo = await Photo.findById(photoId);

    if (!photo) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    // If photo is linked to a user account, enforce access control
    if (photo.userId) {
      // @ts-ignore
      if (!session || !session.user || photo.userId.toString() !== session.user.id.toString()) {
        return NextResponse.json({ error: "Unauthorized photo access" }, { status: 403 });
      }
    }

    // Idempotency check: if already paid (e.g., via webhook), skip sending emails again
    if (photo.status === "paid") {
      return NextResponse.json({ success: true, message: "Payment verified successfully" });
    }

    photo.status = "paid";
    photo.razorpayPaymentId = razorpay_payment_id;
    await photo.save();

    // Fire & forget delivery + testimonial email
    const userEmail = session?.user?.email || (photo as any).guestEmail;
    console.log(`[PAYMENT VERIFY] Attempting to send email for photo ${photoId} to: ${userEmail}`);

    if (userEmail) {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pixpassport.com';
      const photoDownloadUrl = photo.secureUrl || '';
      const printSheetDownloadUrl = photo.printSheetUrl || '';
      const previewLink = `${appUrl}/preview/${photoId}`;

      try {
        if (photo.isExpert) {
          const adminHtml = `
            <h2>New Expert Edit Order (Photo Upgrade)</h2>
            <p><strong>Photo ID:</strong> ${photo._id}</p>
            <p><strong>Customer Email:</strong> ${userEmail}</p>
            <p><strong>Photo to Edit:</strong></p>
            <ul>
              <li><a href="${photo.secureUrl}">${photo.secureUrl}</a></li>
            </ul>
          `;

          const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
          if (adminEmail) {
            await sendEmail({
              to: adminEmail,
              subject: `New Expert Edit Order: ${photo._id}`,
              html: adminHtml,
            });
          }

          await sendEmail({
            to: userEmail,
            subject: "Your Expert Photo Edit Order is Confirmed - PixPassport",
            html: `<p>Hi there,</p><p>We have received your payment for the expert photo edit. Our team is working on your photo now and will email it back to you when it is ready.</p><p>Thank you for choosing PixPassport!</p>`,
          });
          console.log(`[PAYMENT VERIFY] Expert emails sent successfully for photo ${photoId}`);
        } else {
          await sendEmail({
            to: userEmail,
            subject: "Your Passport Photo is ready — Download now! 🎉",
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; background: #f8fafc; padding: 32px; border-radius: 16px;">
                <div style="text-align: center; margin-bottom: 24px;">
                  <h1 style="font-size: 22px; color: #0f172a; margin: 0 0 8px;">Your Photo is Ready! ✅</h1>
                  <p style="color: #64748b; font-size: 14px; margin: 0;">Thank you for your purchase</p>
                </div>

                <div style="background: white; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                  <h3 style="margin: 0 0 16px; font-size: 15px; color: #334155;">📸 Your Downloads</h3>

                  <div style="margin-bottom: 16px;">
                    <p style="margin: 0 0 6px; font-size: 13px; color: #64748b; font-weight: 600;">Digital Photo (600×600, DS-160 Ready)</p>
                    <a href="${photoDownloadUrl}" style="display: inline-block; background: #0f172a; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 700;">⬇ Download Photo</a>
                  </div>

                  ${printSheetDownloadUrl ? `
                  <div style="margin-bottom: 16px;">
                    <p style="margin: 0 0 6px; font-size: 13px; color: #64748b; font-weight: 600;">A4 Print Sheet (20 photos, ready to cut)</p>
                    <a href="${printSheetDownloadUrl}" style="display: inline-block; background: #166534; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 700;">⬇ Download Print Sheet</a>
                  </div>
                  ` : ''}

                  <div style="border-top: 1px solid #f1f5f9; margin-top: 16px; padding-top: 12px;">
                    <p style="margin: 0; font-size: 12px; color: #94a3b8;">You can also access your photo anytime at:<br/>
                    <a href="${previewLink}" style="color: #2563eb;">${previewLink}</a></p>
                  </div>
                </div>

                <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                  <h3 style="margin: 0 0 8px; font-size: 15px; color: #334155;">📋 Photo Specifications</h3>
                  <table style="width: 100%; font-size: 13px; color: #475569;">
                    <tr><td style="padding: 4px 0;">Size</td><td style="text-align: right; font-weight: 600;">600×600 px (2×2 in)</td></tr>
                    <tr><td style="padding: 4px 0;">Resolution</td><td style="text-align: right; font-weight: 600;">300 DPI</td></tr>
                    <tr><td style="padding: 4px 0;">Format</td><td style="text-align: right; font-weight: 600;">JPEG, sRGB</td></tr>
                    <tr><td style="padding: 4px 0;">Background</td><td style="text-align: right; font-weight: 600;">White</td></tr>
                    <tr><td style="padding: 4px 0;">File Size</td><td style="text-align: right; font-weight: 600;">Under 240 KB</td></tr>
                  </table>
                </div>

                <div style="text-align: center; padding: 16px 0;">
                  <p style="font-size: 13px; color: #64748b; margin: 0 0 8px;"><strong>We'd love your feedback!</strong></p>
                  <p style="font-size: 12px; color: #94a3b8; margin: 0;">Reply to this email with a quick testimonial and we may feature it on our site!</p>
                </div>

                <div style="text-align: center; padding-top: 16px; border-top: 1px solid #e2e8f0;">
                  <p style="font-size: 11px; color: #cbd5e1; margin: 0;">PixPassport — AI-Powered Visa Photo Processing</p>
                </div>
              </div>
            `
          });
          console.log(`[PAYMENT VERIFY] Email sent successfully for photo ${photoId}`);
        }
      } catch (err) {
        console.error(`[PAYMENT VERIFY] Failed to send email for photo ${photoId}:`, err);
      }
    } else {
      console.warn(`[PAYMENT VERIFY] No email found for photo ${photoId}, skipping gift delivery email.`);
    }

    return NextResponse.json({ success: true, message: "Payment verified successfully" });
  } catch (error: any) {
    console.error("Payment Verification Error:", error);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
