import mongoose, { Schema, Document, Model } from "mongoose";

// Interface for MaritalStatus document
interface IMaritalStatus extends Document {
  ms_id: number;
  ms_name: string;
}

// MaritalStatus Schema
const maritalStatusSchema: Schema = new Schema({
  ms_id: { 
    type: Number, 
    required: true, 
    unique: true, 
    index: true 
  },
  ms_name: { 
    type: String, 
    required: true, 
    maxlength: 45 
  }
}, { 
  collection: 'marital_status',
  // Optional: Add timestamps if needed
  // timestamps: true 
});

// MaritalStatus Model
const MaritalStatus: Model<IMaritalStatus> = mongoose.model<IMaritalStatus>(
  'MaritalStatus', 
  maritalStatusSchema
);

export { IMaritalStatus, MaritalStatus };