import mongoose, { Document, Schema } from "mongoose";
interface IExamResult extends Document {
  sbd: string;
  toan?: number;
  ngu_van?: number;
  ngoai_ngu?: number;
  vat_li?: number;
  hoa_hoc?: number;
  sinh_hoc?: number;
  lich_su?: number;
  dia_li?: number;
  gdcd?: number;
  ma_ngoai_ngu?: string;
}

const examResultsSchema: Schema<IExamResult> = new Schema({
  sbd: { type: String, required: true, unique: true },
  toan: { type: Number },
  ngu_van: { type: Number },
  ngoai_ngu: { type: Number },
  vat_li: { type: Number },
  hoa_hoc: { type: Number },
  sinh_hoc: { type: Number },
  lich_su: { type: Number },
  dia_li: { type: Number },
  gdcd: { type: Number },
  ma_ngoai_ngu: { type: String },
});

const Result = mongoose.model<IExamResult>("Result", examResultsSchema);

export default Result;
export type { IExamResult };
