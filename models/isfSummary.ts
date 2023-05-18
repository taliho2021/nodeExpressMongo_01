import { Document, Schema, model } from 'mongoose';

interface IsfSummary extends Document {
  seqNo: number;
  refNo: number;
  fileNo: string;
  branch: string;
  isfNo: string;
  status: string;
  disposition: string;
  type: number;
  shipmentType: string;
  actReason: string;
  importerCode: string;
  ImpIdtype: string;
  importerName: string;
  bondHolderId: string;
  bondActCode: string;
  bondtype: string;
  houseBL: string;
  regularBL: number;
  masterBL: string;
  oiRefNo: string;
  updatedDate: Date;
  user: string;
  invDate: Date;
}

const isfSummarySchema = new Schema<IsfSummary>({
  seqNo: { type: Number, required: true },
  refNo: { type: Number, required: true },
  fileNo: { type: String, required: true },
  branch: { type: String, required: true },
  isfNo: { type: String, required: true },
  status: { type: String, required: true },
  disposition: { type: String, required: true },
  type: { type: Number, required: true },
  shipmentType: { type: String, required: true },
  actReason: { type: String, required: true },
  importerCode: { type: String, required: true },
  ImpIdtype: { type: String, required: true },
  importerName: { type: String, required: true },
  bondHolderId: { type: String, required: true },
  bondActCode: { type: String, required: true },
  bondtype: { type: String, required: true },
  houseBL: { type: String, required: true },
  regularBL: { type: Number, required: true },
  masterBL: { type: String, required: true },
  oiRefNo: { type: String, required: true },
  updatedDate: { type: Date, required: true },
  user: { type: String, required: true },
  invDate: { type: Date, required: true },
});

const IsfSummaryModel = model<IsfSummary>('isfSummary', isfSummarySchema);

export { IsfSummaryModel, IsfSummary };
