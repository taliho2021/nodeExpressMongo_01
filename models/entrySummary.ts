import { Document, Schema, model } from 'mongoose';

interface EntrySummary extends Document {
  refNo: string;
  entryNo: string;
  entryType: string;
  importer: string;
  mot: string;
  custrefNo: string;
  entryDate: Date;
  rlseDate: Date;
  stmtDate: Date;
  entryport: string;
  description: string;
  vessel: string;
  user: string;
  arAmt: number;
  apAmt: number;
}

const entrySummarySchema = new Schema<EntrySummary>({
  refNo: { type: String, required: true },
  entryNo: { type: String, required: true },
  entryType: { type: String, required: true },
  importer: { type: String, required: true },
  mot: { type: String, required: true },
  custrefNo: { type: String, required: true },
  entryDate: { type: Date, required: true },
  rlseDate: { type: Date, required: true },
  stmtDate: { type: Date, required: true },
  entryport: { type: String, required: true },
  description: { type: String, required: true },
  vessel: { type: String, required: true },
  user: { type: String, required: true },
  arAmt: { type: Number, required: true },
  apAmt: { type: Number, required: true },
});

const EntrySummaryModel = model<EntrySummary>('entrySummary', entrySummarySchema);

export { EntrySummaryModel, EntrySummary };
