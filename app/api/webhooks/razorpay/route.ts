import { NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/mongodb";
import Photo from "@/models/Photo";
import ExpertOrder from "@/models/ExpertOrder";
import { sendEmail } from "@/lib/mail";
import { getSafeSpec } from "@/lib/specs";
import { sendGA4PurchaseEvent } from "@/lib/ga4";

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

          // Fire GA4 Purchase Event
          if (notes.gaClientId) {
            const spec = getSafeSpec(photo.documentType);
            await sendGA4PurchaseEvent({
              clientId: notes.gaClientId,
              transactionId: paymentEntity.id,
              amount: paymentEntity.amount / 100,
              currency: paymentEntity.currency,
              items: [
                {
                  item_id: photoId,
                  item_name: `${spec.name || "Passport Photo"} ${photo.isExpert ? "(Expert Review)" : "(Standard)"}`,
                  price: paymentEntity.amount / 100,
                  quantity: 1,
                  item_category: photo.isExpert ? "Expert Edit" : "Standard Photo",
                },
              ],
            });
          }

          const userEmail = (photo as any).guestEmail || paymentEntity.email;
          if (userEmail) {
            const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pixpassport.com';
            const photoDownloadUrl = photo.secureUrl || '';
            const printSheetDownloadUrl = photo.printSheetUrl || '';
            const previewLink = `${appUrl}/preview/${photoId}`;
            const spec = getSafeSpec(photo.documentType);
            const documentName = spec.name || "Passport Photo";
            const countryName = spec.country || spec.name || "Passport Photo";
            
            try {
              if (photo.isExpert) {
                const adminHtml = `
                  <h2>New Expert Edit Order (Photo Upgrade - Webhook)</h2>
                  <p><strong>Photo ID:</strong> ${photo._id}</p>
                  <p><strong>Customer Email:</strong> ${userEmail}</p>
                  <p><strong>Selected Country:</strong> ${countryName}</p>
                  <p><strong>Document Type:</strong> ${documentName}</p>
                  <p><strong>Photos:</strong></p>
                  <ul>
                    ${photo.originalUrl ? `<li><strong>Original Image:</strong> <a href="${photo.originalUrl}">${photo.originalUrl}</a></li>` : ''}
                    <li><strong>Processed Image:</strong> <a href="${photo.secureUrl}">${photo.secureUrl}</a></li>
                  </ul>
                `;

                const adminEmail = process.env.ADMIN_EMAILS || process.env.RESEND_REPLY_TO;
                if (adminEmail) {
                  await sendEmail({
                    to: adminEmail,
                    subject: `New Expert Edit Order: ${photo._id} (${countryName})`,
                    html: adminHtml,
                  });
                }

                await sendEmail({
                  to: userEmail,
                  subject: "Your Expert Photo Edit Order is Confirmed - PixPassport",
                  html: `<p>Hi there,</p><p>We have received your payment for the expert photo edit for your <strong>${countryName} (${documentName})</strong>.</p>${photo.originalUrl ? `<p><strong>Original Image:</strong> <a href="${photo.originalUrl}">${photo.originalUrl}</a></p>` : ''}<p>Our team is working on your photo now and will email it back to you when it is ready.</p><p>Thank you for choosing PixPassport!</p>`,
                });
                console.log(`[WEBHOOK] Expert emails sent successfully for photo ${photoId}`);
              } else {
                await sendEmail({
                  to: userEmail,
                  subject: `Your ${countryName} (${documentName}) photo is ready — Download now! 🎉`,
                  html: `
                    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; background: #f8fafc; padding: 32px; border-radius: 16px;">
                      <div style="text-align: center; margin-bottom: 24px;">
                        <h1 style="font-size: 22px; color: #0f172a; margin: 0 0 8px;">Your ${countryName} (${documentName}) is Ready! ✅</h1>
                        <p style="color: #64748b; font-size: 14px; margin: 0;">Thank you for your purchase</p>
                      </div>

                      <div style="background: white; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                        <h3 style="margin: 0 0 16px; font-size: 15px; color: #334155;">📸 Your Downloads</h3>

                        <div style="margin-bottom: 16px;">
                          <p style="margin: 0 0 6px; font-size: 13px; color: #64748b; font-weight: 600;">Digital Photo (${spec.width_px}×${spec.height_px}, ${countryName} ${documentName} Ready)</p>
                          <a href="${photoDownloadUrl}" style="display: inline-block; background: #0f172a; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 700;">⬇ Download Photo</a>
                        </div>

                        ${photo.originalUrl ? `
                        <div style="margin-bottom: 16px;">
                          <p style="margin: 0 0 6px; font-size: 13px; color: #64748b; font-weight: 600;">Original Uploaded Image</p>
                          <a href="${photo.originalUrl}" style="display: inline-block; background: #475569; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 700;">⬇ Download Original Image</a>
                        </div>
                        ` : ''}

                        ${printSheetDownloadUrl ? `
                        <div style="margin-bottom: 16px;">
                          <p style="margin: 0 0 6px; font-size: 13px; color: #64748b; font-weight: 600;">A4 Print Sheet (ready to cut)</p>
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
                          <tr><td style="padding: 4px 0;">Selected Country</td><td style="text-align: right; font-weight: 600;">${countryName}</td></tr>
                          <tr><td style="padding: 4px 0;">Document Type</td><td style="text-align: right; font-weight: 600;">${documentName}</td></tr>
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

                      <div style="text-align: center; padding-top: 16px; border-top: 1px solid #e2e8f0;">
                        <p style="font-size: 11px; color: #cbd5e1; margin: 0;">PixPassport — Professional Visa Photo Processing</p>
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

          // Fire GA4 Purchase Event
          if (notes.gaClientId) {
            await sendGA4PurchaseEvent({
              clientId: notes.gaClientId,
              transactionId: paymentEntity.id,
              amount: paymentEntity.amount / 100,
              currency: paymentEntity.currency,
              items: [
                {
                  item_id: expertOrderId,
                  item_name: "Expert Manual Photo Edit",
                  price: paymentEntity.amount / 100,
                  quantity: 1,
                  item_category: "Expert Edit",
                },
              ],
            });
          }

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
            const adminEmail = process.env.ADMIN_EMAILS || process.env.RESEND_REPLY_TO;
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
            const spec = getSafeSpec(photo.documentType);
            const documentName = spec.name || "Passport Photo";
            const countryName = spec.country || spec.name || "Passport Photo";
            const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pixpassport.com';
            const previewLink = `${appUrl}/preview/${photoId}`;
            const previewImageUrl = photo.secureUrl || photo.previewUrl || '';

            try {
              await sendEmail({
                to: userEmail,
                subject: `Payment Failed — Your ${countryName} Photo is Waiting! 📸`,
                html: `
                  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; background: #f8fafc; padding: 32px; border-radius: 16px;">
                    <div style="text-align: center; margin-bottom: 24px;">
                      <div style="display: inline-block; background: #fef2f2; border-radius: 50%; width: 56px; height: 56px; line-height: 56px; font-size: 28px; margin-bottom: 12px;">⚠️</div>
                      <h1 style="font-size: 22px; color: #0f172a; margin: 0 0 8px;">Payment Could Not Be Processed</h1>
                      <p style="color: #64748b; font-size: 14px; margin: 0;">Don't worry — your photo is saved and ready!</p>
                    </div>

                    ${previewImageUrl ? `
                    <div style="background: white; border-radius: 12px; padding: 16px; border: 1px solid #e2e8f0; margin-bottom: 20px; text-align: center;">
                      <p style="margin: 0 0 12px; font-size: 13px; color: #64748b; font-weight: 600;">Your Processed ${countryName} ${documentName}</p>
                      <img src="${previewImageUrl}" alt="${countryName} ${documentName} Preview" style="max-width: 180px; height: auto; border-radius: 8px; border: 2px solid #e2e8f0; box-shadow: 0 2px 8px rgba(0,0,0,0.08);" />
                    </div>
                    ` : ''}

                    <div style="background: white; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                      <p style="margin: 0 0 12px; font-size: 15px; color: #334155;">Hi there,</p>
                      <p style="margin: 0 0 12px; font-size: 14px; color: #475569; line-height: 1.6;">We noticed your recent payment for your <strong>${countryName} (${documentName})</strong> could not be completed. Your photo has been processed and is waiting for you!</p>
                      <p style="margin: 0 0 20px; font-size: 14px; color: #475569; line-height: 1.6;">Click below to return to your photo and complete your purchase:</p>
                      
                      <div style="text-align: center; margin: 24px 0;">
                        <a href="${previewLink}" style="display: inline-block; background: linear-gradient(135deg, #0f172a 0%, #1e40af 100%); color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-size: 15px; font-weight: 700; box-shadow: 0 4px 14px rgba(15,23,42,0.25);">Complete Your Purchase →</a>
                      </div>
                    </div>

                    <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                      <h3 style="margin: 0 0 8px; font-size: 15px; color: #334155;">📋 Your Photo Details</h3>
                      <table style="width: 100%; font-size: 13px; color: #475569;">
                        <tr><td style="padding: 4px 0;">Country</td><td style="text-align: right; font-weight: 600;">${countryName}</td></tr>
                        <tr><td style="padding: 4px 0;">Document</td><td style="text-align: right; font-weight: 600;">${documentName}</td></tr>
                        <tr><td style="padding: 4px 0;">Size</td><td style="text-align: right; font-weight: 600;">${spec.width_px}×${spec.height_px} px</td></tr>
                        <tr><td style="padding: 4px 0;">Status</td><td style="text-align: right; font-weight: 600; color: #f59e0b;">⏳ Awaiting Payment</td></tr>
                      </table>
                    </div>

                    <div style="text-align: center; padding: 12px 0;">
                      <p style="font-size: 12px; color: #94a3b8; margin: 0 0 4px;">Direct link to your photo:</p>
                      <a href="${previewLink}" style="font-size: 12px; color: #2563eb;">${previewLink}</a>
                    </div>

                    <div style="text-align: center; padding-top: 16px; border-top: 1px solid #e2e8f0;">
                      <p style="font-size: 11px; color: #cbd5e1; margin: 0;">PixPassport — Professional Visa Photo Processing</p>
                    </div>
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
            const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pixpassport.com';
            const retryLink = `${appUrl}/expert-edit`;

            try {
              await sendEmail({
                to: userEmail,
                subject: "Payment Failed for Expert Edit — Your Photos Are Waiting! 📸",
                html: `
                  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; background: #f8fafc; padding: 32px; border-radius: 16px;">
                    <div style="text-align: center; margin-bottom: 24px;">
                      <div style="display: inline-block; background: #fef2f2; border-radius: 50%; width: 56px; height: 56px; line-height: 56px; font-size: 28px; margin-bottom: 12px;">⚠️</div>
                      <h1 style="font-size: 22px; color: #0f172a; margin: 0 0 8px;">Expert Edit Payment Failed</h1>
                      <p style="color: #64748b; font-size: 14px; margin: 0;">Don't worry — your photos are saved!</p>
                    </div>

                    ${order.photos && order.photos.length > 0 ? `
                    <div style="background: white; border-radius: 12px; padding: 16px; border: 1px solid #e2e8f0; margin-bottom: 20px; text-align: center;">
                      <p style="margin: 0 0 12px; font-size: 13px; color: #64748b; font-weight: 600;">Your Uploaded Photos</p>
                      <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
                        ${order.photos.slice(0, 3).map((url: string) => `<img src="${url}" alt="Uploaded Photo" style="max-width: 120px; height: auto; border-radius: 8px; border: 2px solid #e2e8f0; box-shadow: 0 2px 8px rgba(0,0,0,0.08);" />`).join('')}
                      </div>
                    </div>
                    ` : ''}

                    <div style="background: white; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                      <p style="margin: 0 0 12px; font-size: 15px; color: #334155;">Hi there,</p>
                      <p style="margin: 0 0 12px; font-size: 14px; color: #475569; line-height: 1.6;">Unfortunately, your payment for the <strong>Expert Photo Edit</strong> could not be processed. Your edit request is currently on hold.</p>
                      <p style="margin: 0 0 20px; font-size: 14px; color: #475569; line-height: 1.6;">Please try again so our team can get started on your photos right away!</p>
                      
                      <div style="text-align: center; margin: 24px 0;">
                        <a href="${retryLink}" style="display: inline-block; background: linear-gradient(135deg, #0f172a 0%, #1e40af 100%); color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-size: 15px; font-weight: 700; box-shadow: 0 4px 14px rgba(15,23,42,0.25);">Retry Payment →</a>
                      </div>
                    </div>

                    <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                      <h3 style="margin: 0 0 8px; font-size: 15px; color: #334155;">📋 Order Details</h3>
                      <table style="width: 100%; font-size: 13px; color: #475569;">
                        <tr><td style="padding: 4px 0;">Order ID</td><td style="text-align: right; font-weight: 600;">${order._id}</td></tr>
                        <tr><td style="padding: 4px 0;">Photos</td><td style="text-align: right; font-weight: 600;">${order.photos?.length || 0} uploaded</td></tr>
                        <tr><td style="padding: 4px 0;">Status</td><td style="text-align: right; font-weight: 600; color: #f59e0b;">⏳ Awaiting Payment</td></tr>
                      </table>
                    </div>

                    <div style="text-align: center; padding-top: 16px; border-top: 1px solid #e2e8f0;">
                      <p style="font-size: 11px; color: #cbd5e1; margin: 0;">PixPassport — Professional Visa Photo Processing</p>
                    </div>
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
