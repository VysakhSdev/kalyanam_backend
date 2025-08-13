import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { IState } from "./stateModel"; // Import the State interface if needed

// Interface for the District document
interface IDistrict extends Document {
  d_id: number;
  d_name: string;
  s_id: Types.ObjectId | IState; // Can reference either ObjectId or populated State
}

// District Schema
const districtSchema: Schema = new Schema({
  d_id: { 
    type: Number, 
    required: true, 
    unique: true, 
    index: true 
  },
  d_name: { 
    type: String, 
    required: true, 
    maxlength: 45 
  },
  s_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'State', 
    required: true, 
    index: true 
  }
}, { 
  collection: 'districts',
  timestamps: false // Explicitly disabled (optional)
});

// District Model
const District: Model<IDistrict> = mongoose.model<IDistrict>('District', districtSchema);

export { IDistrict, District };