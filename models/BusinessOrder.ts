import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBusinessOnboarding {
  workspaceName?: string;
  adminName?: string;
  adminEmail?: string;
  teamEmails?: string[];
  locations?: number;
  useCases?: string[];
  primaryCountries?: string;
  printerModel?: string;
  paperSizes?: string[];
  logoUrl?: string;
  notes?: string;
  submittedAt?: Date;
}

export interface IBusinessOrder extends Document {
  status: "pending_payment" | "paid" | "payment_failed";
  planId: string;
  planName: string;
  photoLimit: number | null;
  amount: number;
  currency: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  /** Secret handed to the buyer after payment; required to submit the onboarding form */
  onboardingToken: string;
  billing: {
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    country: string;
    businessType: string;
    website?: string;
    taxId?: string;
    address?: string;
  };
  onboarding?: IBusinessOnboarding;
  onboardingStatus: "pending" | "submitted";
  periodStart?: Date;
  periodEnd?: Date;
  adminNotifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BusinessOrderSchema: Schema = new Schema(
  {
    status: {
      type: String,
      enum: ["pending_payment", "paid", "payment_failed"],
      default: "pending_payment",
      index: true,
    },
    planId: { type: String, required: true },
    planName: { type: String, required: true },
    photoLimit: { type: Number, default: null },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    razorpayOrderId: { type: String, index: true },
    razorpayPaymentId: { type: String, index: true },
    onboardingToken: { type: String, required: true, select: false },
    billing: {
      companyName: { type: String, required: true },
      contactName: { type: String, required: true },
      email: { type: String, required: true, index: true },
      phone: { type: String, required: true },
      country: { type: String, required: true },
      businessType: { type: String, required: true },
      website: { type: String },
      taxId: { type: String },
      address: { type: String },
    },
    onboarding: {
      workspaceName: { type: String },
      adminName: { type: String },
      adminEmail: { type: String },
      teamEmails: [{ type: String }],
      locations: { type: Number },
      useCases: [{ type: String }],
      primaryCountries: { type: String },
      printerModel: { type: String },
      paperSizes: [{ type: String }],
      logoUrl: { type: String },
      notes: { type: String },
      submittedAt: { type: Date },
    },
    onboardingStatus: {
      type: String,
      enum: ["pending", "submitted"],
      default: "pending",
    },
    periodStart: { type: Date },
    periodEnd: { type: Date },
    adminNotifiedAt: { type: Date },
  },
  { timestamps: true }
);

const BusinessOrder: Model<IBusinessOrder> =
  mongoose.models.BusinessOrder ||
  mongoose.model<IBusinessOrder>("BusinessOrder", BusinessOrderSchema);

export default BusinessOrder;
