import mongoose, { Schema, Document, Model } from "mongoose";

// Interface for the Country document
export interface ICountry extends Document {
  c_id: number;
  c_name: string;
}

// Country Schema
const countrySchema: Schema = new Schema({
  c_id: { 
    type: Number, 
    required: true, 
    unique: true, 
    index: true 
  },
  c_name: { 
    type: String, 
    required: true, 
    maxlength: 45 
  }
}, { 
  collection: 'countries' 
});

// Country Model
const Country: Model<ICountry> = mongoose.model<ICountry>('Country', countrySchema);

export default Country;