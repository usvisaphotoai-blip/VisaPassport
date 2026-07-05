import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Photo from "@/models/Photo";
import { sendEmail } from "@/lib/mail";
import { getSafeSpec } from "@/lib/specs";
import { getPayPalAccessToken, PAYPAL_API_BASE } from "@/lib/paypal";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { orderID, photoId } = await req.json();

    if (!orderID || !photoId) {
      return NextResponse.json(
        { error: "Missing required payment verification parameters" },
        { status: 400 }
      );
    }

    await dbConnect();
    const photo = await Photo.findById(photoId);

    if (!photo) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    if (photo.userId) {
      // @ts-ignore
      if (!session || !session.user || photo.userId.toString() !== session.user.id.toString()) {
        return NextResponse.json({ error: "Unauthorized photo access" }, { status: 403 });
      }
    }

    if (photo.status === "paid") {
      return NextResponse.json({ success: true, message: "Payment already verified successfully" });
    }

    const accessToken = await getPayPalAccessToken();

    // Capture the order
    const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderID}/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    let isCompleted = false;
    let paymentId = orderID;
    let payerEmail = "";

    if (!response.ok) {
      if (data.details && data.details.some((d: any) => d.issue === "ORDER_ALREADY_CAPTURED")) {
        const orderRes = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderID}`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        const orderData = await orderRes.json();
        if (orderData.status === "COMPLETED") {
          isCompleted = true;
          paymentId = orderData.purchase_units?.[0]?.payments?.captures?.[0]?.id || orderID;
          payerEmail = orderData.payer?.email_address;
        } else {
          return NextResponse.json({ error: "Order not completed" }, { status: 400 });
        }
      } else {
        console.error("PayPal Capture Error:", data);
        return NextResponse.json({ error: "Failed to capture payment" }, { status: 400 });
      }
    } else {
      if (data.status === "COMPLETED") {
        isCompleted = true;
        paymentId = data.purchase_units?.[0]?.payments?.captures?.[0]?.id || orderID;
        payerEmail = data.payer?.email_address;
      } else {
        return NextResponse.json({ error: "Payment not completed" }, { status: 400 });
      }
    }

    photo.status = "paid";
    photo.paypalPaymentId = paymentId;
    if (payerEmail && !photo.guestEmail) {
      photo.guestEmail = payerEmail;
    }
    await photo.save();

    // Email fulfillment
    const userEmail = session?.user?.email || (photo as any).guestEmail;
    if (userEmail) {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pixpassport.com';
      const photoDownloadUrl = photo.secureUrl || '';
      const printSheetDownloadUrl = photo.printSheetUrl || '';
      const previewLink = `${appUrl}/preview/${photoId}`;
      const spec = getSafeSpec(photo.documentType);
      const documentName = spec.name || "Passport Photo";

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
            html: `<p>Hi there,</p><p>We have received your payment for the expert photo edit for your <strong>${documentName}</strong>. Our team is working on your photo now and will email it back to you when it is ready.</p><p>Thank you for choosing PixPassport!</p>`,
          });
        } else {
          await sendEmail({
            to: userEmail,
            subject: "Your Passport Photo is ready — Download now! 🎉",
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; background: #f8fafc; padding: 32px; border-radius: 16px;">
                <div style="text-align: center; margin-bottom: 24px;">
                  <h1 style="font-size: 22px; color: #0f172a; margin: 0 0 8px;">Your ${documentName} is Ready! ✅</h1>
                  <p style="color: #64748b; font-size: 14px; margin: 0;">Thank you for your purchase</p>
                </div>
                <div style="background: white; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                  <h3 style="margin: 0 0 16px; font-size: 15px; color: #334155;">📸 Your Downloads</h3>
                  <div style="margin-bottom: 16px;">
                    <p style="margin: 0 0 6px; font-size: 13px; color: #64748b; font-weight: 600;">Digital Photo (${spec.width_px}×${spec.height_px}, ${documentName} Ready)</p>
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
                    <tr><td style="padding: 4px 0;">Size</td><td style="text-align: right; font-weight: 600;">${spec.width_px}×${spec.height_px} px ${spec.width_mm !== "unspecified" ? `(${spec.width_mm}×${spec.height_mm} mm)` : ""}</td></tr>
                    <tr><td style="padding: 4px 0;">Resolution</td><td style="text-align: right; font-weight: 600;">${spec.dpi || 300} DPI</td></tr>
                    <tr><td style="padding: 4px 0;">Format</td><td style="text-align: right; font-weight: 600;">JPEG, sRGB</td></tr>
                    <tr><td style="padding: 4px 0;">Background</td><td style="text-align: right; font-weight: 600;">${spec.bg_color.charAt(0).toUpperCase() + spec.bg_color.slice(1)}</td></tr>
                  </table>
                </div>
                <div style="text-align: center; padding: 16px 0;">
                  <p style="font-size: 13px; color: #64748b; margin: 0 0 8px;"><strong>We'd love your feedback!</strong></p>
                  <p style="font-size: 12px; color: #94a3b8; margin: 0;">Reply to this email with a quick testimonial and we may feature it on our site!</p>
                </div>
              </div>
            `
          });
        }
      } catch (err) {
        console.error("Failed to send email", err);
      }
    }

    return NextResponse.json({ success: true, message: "Payment verified successfully" });
  } catch (error: any) {
    console.error("PayPal Capture Error:", error);
    return NextResponse.json(
      { error: "Failed to capture payment order" },
      { status: 500 }
    );
  }
}
