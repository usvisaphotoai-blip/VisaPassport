import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPrintSheetOrder extends Document {
  status: 'pending_payment' | 'paid' | 'payment_failed';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  amount: number;
  currency: string;
  paperSize?: string;
  photoSize?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PrintSheetOrderSchema: Schema = new Schema(
  {
    status: {
      type: String,
      enum: ['pending_payment', 'paid', 'payment_failed'],
      default: 'pending_payment',
    },
    razorpayOrderId: { type: String, index: true },
    razorpayPaymentId: { type: String, index: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    paperSize: { type: String },
    photoSize: { type: String },
  },
  { timestamps: true }
);

const PrintSheetOrder: Model<IPrintSheetOrder> =
  mongoose.models.PrintSheetOrder ||
  mongoose.model<IPrintSheetOrder>('PrintSheetOrder', PrintSheetOrderSchema);

export default PrintSheetOrder;
