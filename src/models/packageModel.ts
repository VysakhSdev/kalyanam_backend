import mongoose, { Schema, Document } from "mongoose";

export interface IPackage extends Document {
  pk_id?: number;
  pk_name: string;
  pk_rate: number;
  pk_validity: number;
  pk_cntlimit: number;
  pk_msglimit: number;
  pk_details?: string | null;
  pk_commisi: number;
  isActive: boolean;
}

const PackageSchema: Schema = new Schema(
  {
    pk_id: { type: Number},
    pk_name: { type: String, required: true },
    pk_rate: { type: Number, required: true },
    pk_validity: { type: Number, required: true },
    pk_cntlimit: { type: Number, required: true },
    pk_msglimit: { type: Number, required: true },
    pk_details: { type: String, default: null },
    pk_commisi: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true } 
  },
  { timestamps: true},
  
);

export default mongoose.model<IPackage>("Packages", PackageSchema);
