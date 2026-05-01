import { NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/mongodb";
import Photo from "@/models/Photo";
import ExpertOrder from "@/models/ExpertOrder";
import { sendEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!secret) {
      console.error("Missing RAZORPAY_WEBHOOK_SECRET");
      return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(rawBody);

    // Handle payment.captured or order.paid
    // Razorpay often sends order.paid which contains order and payment entities
    if (event.event === "order.paid" || event.event === "payment.captured") {
      const paymentEntity = event.payload?.payment?.entity || {};
      const notes = paymentEntity.notes || {};
      const { photoId, expertOrderId } = notes;

      await dbConnect();

      if (photoId) {
        const photo = await Photo.findById(photoId);
        if (photo && photo.status !== "paid") {
          photo.status = "paid";
          photo.razorpayPaymentId = paymentEntity.id;
          await photo.save();

          const userEmail = (photo as any).guestEmail || paymentEntity.email;
          if (userEmail) {
            const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pixpassport.com';
            const photoDownloadUrl = photo.secureUrl || '';
            const printSheetDownloadUrl = photo.printSheetUrl || '';
            const previewLink = `${appUrl}/preview/${photoId}`;
            
            try {
              if (photo.isExpert) {
                const adminHtml = `
                  <h2>New Expert Edit Order (Photo Upgrade - Webhook)</h2>
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
                console.log(`[WEBHOOK] Expert emails sent successfully for photo ${photoId}`);
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
                console.log(`[WEBHOOK] Email sent successfully for photo ${photoId}`);
              }
            } catch (err) {
              console.error(`[WEBHOOK] Failed to send email for photo ${photoId}:`, err);
            }
          }
        }
      } else if (expertOrderId) {
        const order = await ExpertOrder.findById(expertOrderId);
        if (order && order.status !== "paid") {
          order.status = "paid";
          order.razorpayPaymentId = paymentEntity.id;
          await order.save();

          try {
            const adminHtml = `
              <h2>New Expert Edit Order (Webhook Verified)</h2>
              <p><strong>Order ID:</strong> ${order._id}</p>
              <p><strong>Customer Email:</strong> ${order.email || paymentEntity.email}</p>
              <p><strong>Photos to Edit:</strong></p>
              <ul>
                ${order.photos.map((url: string) => `<li><a href="${url}">${url}</a></li>`).join("")}
              </ul>
            `;

            // Notify Admin
            const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
            if (adminEmail) {
              await sendEmail({
                to: adminEmail,
                subject: `New Expert Edit Order: ${order._id}`,
                html: adminHtml,
              });
            }

            // Notify Customer
            await sendEmail({
              to: order.email || paymentEntity.email,
              subject: "Your Expert Photo Edit Order is Confirmed - PixPassport",
              html: `<p>Hi there,</p><p>We have received your payment for the expert photo edit. Our team is working on your photos now and will email them back to you when they are ready.</p><p>Thank you for choosing PixPassport!</p>`,
            });
            console.log(`[WEBHOOK] Emails sent successfully for expert order ${expertOrderId}`);
          } catch (mailError) {
            console.error(`[WEBHOOK] Failed to send emails for expert edit ${expertOrderId}:`, mailError);
          }
        }
      }
    } else if (event.event === "payment.failed") {
      const paymentEntity = event.payload?.payment?.entity || {};
      const notes = paymentEntity.notes || {};
      const { photoId, expertOrderId } = notes;

      await dbConnect();

      if (photoId) {
        const photo = await Photo.findById(photoId);
        if (photo && photo.status !== "paid") {
          photo.status = "payment_failed";
          await photo.save();

          const userEmail = (photo as any).guestEmail || paymentEntity.email;
          if (userEmail) {
            try {
              await sendEmail({
                to: userEmail,
                subject: "Payment Failed — PixPassport",
                html: `
                  <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                    <h2 style="color: #dc2626;">Payment Failed</h2>
                    <p>Hi there,</p>
                    <p>We noticed your recent payment attempt for your passport photo failed. Your order has not been completed.</p>
                    <p>Please try checking out again or contact support if you need assistance.</p>
                  </div>
                `
              });
              console.log(`[WEBHOOK] Payment failed email sent for photo ${photoId}`);
            } catch (err) {
              console.error(`[WEBHOOK] Failed to send payment failed email for photo ${photoId}:`, err);
            }
          }
        }
      } else if (expertOrderId) {
        const order = await ExpertOrder.findById(expertOrderId);
        if (order && order.status !== "paid") {
          order.status = "payment_failed";
          await order.save();

          const userEmail = order.email || paymentEntity.email;
          if (userEmail) {
            try {
              await sendEmail({
                to: userEmail,
                subject: "Payment Failed for Expert Edit — PixPassport",
                html: `
                  <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                    <h2 style="color: #dc2626;">Payment Failed</h2>
                    <p>Hi there,</p>
                    <p>Unfortunately, your payment for the Expert Photo Edit could not be processed. Your edit request is currently on hold.</p>
                    <p>Please try again with a different payment method so our team can get started on your photos!</p>
                  </div>
                `
              });
              console.log(`[WEBHOOK] Payment failed email sent for expert order ${expertOrderId}`);
            } catch (err) {
              console.error(`[WEBHOOK] Failed to send payment failed email for expert order ${expertOrderId}:`, err);
            }
          }
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Razorpay Webhook Error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
