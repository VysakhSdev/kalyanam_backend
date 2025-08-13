import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { IReligion } from "./religionModel"; // Import Religion interface

// Interface for Cast document
interface ICast extends Document {
  ct_id: number;
  ct_name: string;
  ct_relig: Types.ObjectId | IReligion; // Reference to Religion
}

// Cast Schema
const castSchema: Schema = new Schema({
  ct_id: { 
    type: Number, 
    required: true, 
    unique: true, 
    index: true 
  },
  ct_name: { 
    type: String, 
    required: true, 
    maxlength: 45 
  },
  ct_relig: { 
    type: Schema.Types.ObjectId, 
    ref: 'Religion', 
    required: true, 
    index: true 
  }
}, { 
  collection: 'casts' 
});

// Cast Model
const Cast: Model<ICast> = mongoose.model<ICast>('Cast', castSchema);

export { ICast, Cast };