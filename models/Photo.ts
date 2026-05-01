import mongoose, { Schema } from "mongoose";

const PhotoSchema = new Schema(
  {
    userId: {
      type: String, // Accepts both NextAuth String IDs and Mongo ObjectIds
      required: false, // Might be anonymous initially
    },
    guestEmail: {
      type: String,
      required: false,
    },
    documentType: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["unpaid", "paid", "payment_failed"],
      default: "unpaid",
    },
    secureUrl: {
      type: String,
      required: true,
    },
    previewUrl: {
      type: String,
      required: true,
    },
    printSheetUrl: {
      type: String,
      required: false,
    },
    metrics: {
      headSizePct: String,
      eyeLevelPct: String,
    },
    razorpayOrderId: {
      type: String,
    },
    razorpayPaymentId: {
      type: String,
    },
    isExpert: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

export default mongoose.models.Photo || mongoose.model("Photo", PhotoSchema);
