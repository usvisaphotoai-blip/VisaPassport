import mongoose, { Schema, Document, Model } from "mongoose";

export interface IInvoiceSequence extends Document {
  year: number;
  lastSeq: number;
  updatedAt: Date;
}

const InvoiceSequenceSchema: Schema = new Schema(
  {
    year: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    lastSeq: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

/**
 * Atomically increment and return the next invoice number for a given year.
 * Format: INV-YYYY-XXXXXX (e.g. INV-2026-000001)
 */
InvoiceSequenceSchema.statics.getNextInvoiceNumber = async function (
  year: number = new Date().getFullYear()
): Promise<string> {
  const result = await this.findOneAndUpdate(
    { year },
    { $inc: { lastSeq: 1 } },
    { returnDocument: "after", new: true, upsert: true, setDefaultsOnInsert: true }
  );

  const seqStr = String(result.lastSeq).padStart(6, "0");
  return `INV-${year}-${seqStr}`;
};

export interface IInvoiceSequenceModel extends Model<IInvoiceSequence> {
  getNextInvoiceNumber(year?: number): Promise<string>;
}

const InvoiceSequence: IInvoiceSequenceModel =
  (mongoose.models.InvoiceSequence as IInvoiceSequenceModel) ||
  mongoose.model<IInvoiceSequence, IInvoiceSequenceModel>(
    "InvoiceSequence",
    InvoiceSequenceSchema
  );

export default InvoiceSequence;
