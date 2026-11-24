import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IExpertOrder extends Document {
  email: string;
  photos: string[]; // URLs or base64 strings
  status: 'pending_payment' | 'paid' | 'completed' | 'payment_failed';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  amount?: number;
  currency?: string;
  country?: string;
  /** Set when the order's photos were deleted by the cleanup cron (30 days after the order) */
  photosPurgedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ExpertOrderSchema: Schema = new Schema(
  {
    email: { type: String, required: true },
    photos: { type: [String], required: true },
    status: {
      type: String,
      enum: ['pending_payment', 'paid', 'completed', 'payment_failed'],
      default: 'pending_payment',
    },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    amount: { type: Number },
    currency: { type: String },
    country: { type: String },
    photosPurgedAt: { type: Date },
  },
  { timestamps: true }
);

const ExpertOrder: Model<IExpertOrder> =
  mongoose.models.ExpertOrder || mongoose.model<IExpertOrder>('ExpertOrder', ExpertOrderSchema);

export default ExpertOrder;
