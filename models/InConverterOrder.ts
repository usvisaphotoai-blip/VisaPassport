import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IInConverterOrder extends Document {
  status: 'pending_payment' | 'paid' | 'payment_failed';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  amount: number;
  currency: string;
  preset?: string;
  createdAt: Date;
  updatedAt: Date;
}

const InConverterOrderSchema: Schema = new Schema(
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
    preset: { type: String },
  },
  { timestamps: true }
);

const InConverterOrder: Model<IInConverterOrder> =
  mongoose.models.InConverterOrder ||
  mongoose.model<IInConverterOrder>('InConverterOrder', InConverterOrderSchema);

export default InConverterOrder;
