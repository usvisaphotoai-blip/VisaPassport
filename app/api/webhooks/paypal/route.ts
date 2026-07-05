import { NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/mongodb";
import Photo from "@/models/Photo";
import ExpertOrder from "@/models/ExpertOrder";
import { sendEmail } from "@/lib/mail";
import { getSafeSpec } from "@/lib/specs";
import { sendGA4PurchaseEvent } from "@/lib/ga4";
import { getPayPalAccessToken, PAYPAL_API_BASE } from "@/lib/paypal";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const event = JSON.parse(rawBody);

    if (event.event_type === "PAYMENT.CAPTURE.COMPLETED") {
      const resource = event.resource || {};
      const customIdRaw = resource.custom_id;
      
      if (customIdRaw) {
        let customId;
        try {
          customId = JSON.parse(customIdRaw);
        } catch(e) {
          console.error("Failed to parse custom_id from PayPal Webhook", customIdRaw);
          return NextResponse.json({ success: true });
        }

        const { photoId, expertOrderId, gaClientId } = customId;

        await dbConnect();

        if (photoId) {
          const photo = await Photo.findById(photoId);
          // If already paid via the capture endpoint, we can skip processing
          if (photo && photo.status !== "paid") {
            photo.status = "paid";
            photo.paypalPaymentId = resource.id;
            await photo.save();

            // Fire GA4 Purchase Event
            if (gaClientId) {
              const spec = getSafeSpec(photo.documentType);
              await sendGA4PurchaseEvent({
                clientId: gaClientId,
                transactionId: resource.id,
                amount: parseFloat(resource.amount.value),
                currency: resource.amount.currency_code,
                items: [
                  {
                    item_id: photoId,
                    item_name: `${spec.name || "Passport Photo"} ${photo.isExpert ? "(Expert Review)" : "(Standard)"}`,
                    price: parseFloat(resource.amount.value),
                    quantity: 1,
                    item_category: photo.isExpert ? "Expert Edit" : "Standard Photo",
                  },
                ],
              });
            }

            let userEmail = (photo as any).guestEmail || customId.userId;

            if (!userEmail && photo.paypalOrderId) {
              try {
                const accessToken = await getPayPalAccessToken();
                const orderRes = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${photo.paypalOrderId}`, {
                  headers: { Authorization: `Bearer ${accessToken}` }
                });
                if (orderRes.ok) {
                  const orderData = await orderRes.json();
                  userEmail = orderData.payer?.email_address;
                  if (userEmail) {
                    photo.guestEmail = userEmail;
                    await photo.save();
                  }
                }
              } catch (err) {
                console.error("Failed to fetch order payer email in webhook:", err);
              }
            }

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
                    <h2>New Expert Edit Order (PayPal Webhook)</h2>
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
                  console.log(`[PAYPAL WEBHOOK] Expert emails sent successfully for photo ${photoId}`);
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
                            <p style="margin: 0 0 6px; font-size: 13px; color: #64748b; font-weight: 600;">Digital Photo Ready</p>
                            <a href="${photoDownloadUrl}" style="display: inline-block; background: #0f172a; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 700;">⬇ Download Photo</a>
                          </div>
                          ${printSheetDownloadUrl ? `
                          <div style="margin-bottom: 16px;">
                            <p style="margin: 0 0 6px; font-size: 13px; color: #64748b; font-weight: 600;">A4 Print Sheet (5 photos, ready to cut)</p>
                            <a href="${printSheetDownloadUrl}" style="display: inline-block; background: #166534; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 700;">⬇ Download Print Sheet</a>
                          </div>
                          ` : ''}
                          <div style="border-top: 1px solid #f1f5f9; margin-top: 16px; padding-top: 12px;">
                            <p style="margin: 0; font-size: 12px; color: #94a3b8;">You can also access your photo anytime at:<br/>
                            <a href="${previewLink}" style="color: #2563eb;">${previewLink}</a></p>
                          </div>
                        </div>
                      </div>
                    `
                  });
                  console.log(`[PAYPAL WEBHOOK] Email sent successfully for photo ${photoId}`);
                }
              } catch (err) {
                console.error(`[PAYPAL WEBHOOK] Failed to send email for photo ${photoId}:`, err);
              }
            }
          }
        }
      }
    } else if (event.event_type === "PAYMENT.CAPTURE.DENIED" || event.event_type === "PAYMENT.CAPTURE.DECLINED") {
      const resource = event.resource || {};
      const customIdRaw = resource.custom_id;
      
      if (customIdRaw) {
        let customId;
        try {
          customId = JSON.parse(customIdRaw);
        } catch(e) {
          return NextResponse.json({ success: true });
        }

        const { photoId } = customId;
        await dbConnect();
        
        if (photoId) {
          const photo = await Photo.findById(photoId);
          if (photo && photo.status !== "paid") {
            photo.status = "payment_failed";
            await photo.save();
          }
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("PayPal Webhook Error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
