import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Photo from "@/models/Photo";
import Payment from "@/models/Payment";
import crypto from "crypto";
import { localeFromReferer } from "@/lib/email-templates/email-i18n";
import { fulfillPhotoPayment } from "@/lib/photo-fulfillment";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      photoId,
      gaClientId,
      locale: bodyLocale,
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

    const expectedSignBuf = Buffer.from(expectedSign, "hex");
    const signatureBuf = Buffer.from(razorpay_signature, "hex");

    if (
      expectedSignBuf.length !== signatureBuf.length ||
      !crypto.timingSafeEqual(expectedSignBuf, signatureBuf)
    ) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    // Payment signature is valid, fetch photo and verify order linkage
    await dbConnect();
    const photo = await Photo.findById(photoId);

    if (!photo) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    // Ensure the verified order ID belongs to this photo — the latest checkout, or an earlier
    // one we created for it (buyer opened checkout twice and paid in the older window)
    if (
      photo.razorpayOrderId &&
      photo.razorpayOrderId !== razorpay_order_id &&
      !(await Payment.exists({ gatewayOrderId: razorpay_order_id, photoId: photo._id }))
    ) {
      return NextResponse.json(
        { error: "Payment does not correspond to this photo order" },
        { status: 400 }
      );
    }

    // Replay attack guard: Ensure this payment ID was not already redeemed for another photo
    const existingPhotoWithPayment = await Photo.findOne({
      razorpayPaymentId: razorpay_payment_id,
      _id: { $ne: photo._id },
    });
    if (existingPhotoWithPayment) {
      return NextResponse.json(
        { error: "This payment transaction has already been redeemed" },
        { status: 400 }
      );
    }

    const existingPaymentRecord = await Payment.findOne({
      razorpayPaymentId: razorpay_payment_id,
    });
    if (
      existingPaymentRecord &&
      existingPaymentRecord.photoId &&
      existingPaymentRecord.photoId.toString() !== photo._id.toString()
    ) {
      return NextResponse.json(
        { error: "This payment transaction has already been redeemed for another order" },
        { status: 400 }
      );
    }

    // If photo is linked to a user account, enforce access control
    if (photo.userId) {
      // @ts-ignore
      if (!session || !session.user || photo.userId.toString() !== session.user.id.toString()) {
        return NextResponse.json({ error: "Unauthorized photo access" }, { status: 403 });
      }
    }

    const result = await fulfillPhotoPayment({
      photoId: photo._id.toString(),
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      actor: "system",
      sessionUserId: (session?.user as any)?.id,
      sessionEmail: session?.user?.email || undefined,
      gaClientId,
      // Language the customer bought in (set at create-order; body/referer as fallback)
      localeHint: bodyLocale || localeFromReferer(req.headers.get("referer")),
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error || "Failed to verify payment" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      downloadToken: result.downloadToken,
    });
  } catch (error: any) {
    console.error("Payment Verification Error:", error);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
