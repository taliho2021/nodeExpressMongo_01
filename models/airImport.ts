import { Document, Schema, model } from 'mongoose';

interface AirImport extends Document {
  seqNo: number;
  refNo: string;
  carrier: string;
  carrierName: string;
  flightNo1: string;
  flightNo2: string;
  locationCode: string;
  address1: string;
  address2: string;
  cityStateZip: string;
  addAddr1: string;
  addAddr2: string;
  refDate: Date;
  user: string;
}

const airImportSchema = new Schema<AirImport>({
  seqNo: { type: Number, required: true },
  refNo: { type: String, required: true },
  carrier: { type: String, required: true },
  carrierName: { type: String, required: true },
  flightNo1: { type: String, required: true },
  flightNo2: { type: String, required: true },
  locationCode: { type: String, required: true },
  address1: { type: String, required: true },
  address2: { type: String, required: true },
  cityStateZip: { type: String, required: true },
  addAddr1: { type: String, required: true },
  addAddr2: { type: String, required: true },
  refDate: { type: Date, required: true },
  user: { type: String, required: true },
});

const AirImportModel = model<AirImport>('airImport', airImportSchema);

export { AirImportModel, AirImport };
