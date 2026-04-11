import { NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/mongodb";
import ExpertOrder from "@/models/ExpertOrder";
import { sendEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      expertOrderId,
    } = await req.json();

    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (!secret) {
      return NextResponse.json({ error: "Server missing Razorpay secret" }, { status: 500 });
    }

    // Verify signature
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generated_signature = hmac.digest("hex");

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    await dbConnect();

    // Find the order
    const order = await ExpertOrder.findById(expertOrderId);

    if (!order) {
      return NextResponse.json({ error: "Expert Order not found" }, { status: 404 });
    }

    // Update expert order record
    order.status = "paid";
    order.razorpayPaymentId = razorpay_payment_id;
    await order.save();

    // Send confirmation to admin and user via SMTP
    try {
      const adminHtml = `
        <h2>New Expert Edit Order</h2>
        <p><strong>Order ID:</strong> ${order._id}</p>
        <p><strong>Customer Email:</strong> ${order.email}</p>
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
        to: order.email,
        subject: "Your Expert Photo Edit Order is Confirmed - PixPassport",
        html: `<p>Hi there,</p><p>We have received your payment for the expert photo edit. Our team is working on your photos now and will email them back to you when they are ready.</p><p>Thank you for choosing PixPassport!</p>`,
      });
    } catch (mailError) {
      console.error("Failed to send SMTP emails for expert edit:", mailError);
      // We don't fail the complete verification request if the email fails, we still return success.
    }

    return NextResponse.json({ success: true, message: "Payment verified successfully" });
  } catch (error: any) {
    console.error("Expert Edit Verification Error:", error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}
