import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { ICountry } from "./countryModel"; // Import the Country interface if needed

// Interface for the State document
interface IState extends Document {
  s_id: number;
  s_name: string;
  c_id: Types.ObjectId | ICountry; // Can reference either ObjectId or populated Country
}

// State Schema
const stateSchema: Schema = new Schema({
  s_id: { 
    type: Number, 
    required: true, 
    unique: true, 
    index: true 
  },
  s_name: { 
    type: String, 
    required: true, 
    maxlength: 45 
  },
  c_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'Country', 
    required: true, 
    index: true 
  }
}, { 
  collection: 'states' 
});

// State Model
const State: Model<IState> = mongoose.model<IState>('State', stateSchema);

export { IState, State };