import mongoose, { Schema, Document, Model } from "mongoose";

export interface IInvoiceLineItem {
  name: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface IBusinessDetails {
  name: string;
  email: string;
  address: string;
  website: string;
  taxId?: string;
}

export interface IFulfillmentEvidence {
  orderStatus?: string;
  paymentStatus?: string;
  documentType?: string;
  photoProcessed?: boolean;
  photoDimensions?: string;
  backgroundValidated?: boolean;
  emailDelivered?: boolean;
  emailRecipient?: string;
  emailDeliveredAt?: Date;
  downloadCount?: number;
  firstDownloadedAt?: Date;
  lastDownloadedAt?: Date;
  downloadIp?: string;
  downloadUserAgent?: string;
  notes?: Record<string, unknown>;
}

export interface IPdfMetadata {
  generatedAt?: Date;
  downloadCount?: number;
  lastDownloadedAt?: Date;
}

export interface IGatewayDetails {
  gatewayPaymentId?: string;
  gatewayOrderId?: string;
  bankRrn?: string;
  authCode?: string;
  cardId?: string;
  cardHolderName?: string;
  cardLast4?: string;
  cardNetwork?: string;
  cardType?: string;
  cardSubType?: string;
  fee?: number;
  tax?: number;
  description?: string;
  notes?: Record<string, any>;
  contact?: string;
}

export interface IInvoice extends Document {
  invoiceNumber: string;
  paymentId: mongoose.Types.ObjectId | string;
  gatewayPaymentId: string;
  gatewayOrderId?: string;
  orderId?: mongoose.Types.ObjectId | string;
  orderNumber?: string;
  photoId?: mongoose.Types.ObjectId | string | string;
  userId?: mongoose.Types.ObjectId | string;
  customerName?: string;
  customerEmail: string;
  customerPhone?: string;
  customerCountry?: string;
  customerAddress?: string;
  amount: number;
  currency: string;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: "DRAFT" | "ISSUED" | "PAID" | "VOID";
  paymentGateway: "razorpay" | "stripe";
  paymentMethod?: string;
  paymentDate: Date;
  invoiceDate: Date;
  cloudinaryUrl?: string;
  cloudinaryPublicId?: string;
  pdfUrl?: string;
  lineItems: IInvoiceLineItem[];
  businessDetails: IBusinessDetails;
  gatewayDetails?: IGatewayDetails;
  fulfillmentEvidence?: IFulfillmentEvidence;
  pdfMetadata?: IPdfMetadata;
  createdAt: Date;
  updatedAt: Date;
}

const InvoiceSchema: Schema = new Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    paymentId: {
      type: Schema.Types.Mixed,
      required: true,
      unique: true,
      index: true,
    },
    gatewayPaymentId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    gatewayOrderId: {
      type: String,
      required: false,
      index: true,
    },
    orderId: {
      type: Schema.Types.Mixed,
      required: false,
      index: true,
    },
    orderNumber: {
      type: String,
      required: false,
      index: true,
    },
    photoId: {
      type: Schema.Types.Mixed,
      required: false,
      index: true,
    },
    userId: {
      type: Schema.Types.Mixed,
      required: false,
      index: true,
    },
    customerName: {
      type: String,
      required: false,
    },
    customerEmail: {
      type: String,
      required: true,
      index: true,
    },
    customerPhone: {
      type: String,
      required: false,
    },
    customerCountry: {
      type: String,
      required: false,
    },
    customerAddress: {
      type: String,
      required: false,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      default: "USD",
      index: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["DRAFT", "ISSUED", "PAID", "VOID"],
      default: "PAID",
      index: true,
    },
    paymentGateway: {
      type: String,
      enum: ["razorpay", "stripe"],
      default: "razorpay",
      index: true,
    },
    paymentMethod: {
      type: String,
      required: false,
    },
    paymentDate: {
      type: Date,
      required: true,
      index: true,
    },
    invoiceDate: {
      type: Date,
      required: true,
      index: true,
    },
    cloudinaryUrl: {
      type: String,
      required: false,
    },
    cloudinaryPublicId: {
      type: String,
      required: false,
    },
    pdfUrl: {
      type: String,
      required: false,
    },
    lineItems: [
      {
        name: { type: String, required: true },
        description: { type: String, required: false },
        quantity: { type: Number, required: true, default: 1 },
        unitPrice: { type: Number, required: true },
        total: { type: Number, required: true },
      },
    ],
    businessDetails: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
      website: { type: String, required: true },
      taxId: { type: String, required: false },
    },
    gatewayDetails: {
      type: Schema.Types.Mixed,
      required: false,
    },
    fulfillmentEvidence: {
      type: Schema.Types.Mixed,
      required: false,
    },
    pdfMetadata: {
      generatedAt: { type: Date, required: false },
      downloadCount: { type: Number, default: 0 },
      lastDownloadedAt: { type: Date, required: false },
    },
  },
  { timestamps: true }
);

// Permanent collection - no TTL expiration
const Invoice: Model<IInvoice> =
  mongoose.models.Invoice || mongoose.model<IInvoice>("Invoice", InvoiceSchema);

export default Invoice;
