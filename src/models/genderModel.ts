import mongoose, { Schema, Document, Model } from "mongoose";

// Interface for the Gender document
interface IGender extends Document {
  gn_id: number;
  gn_name?: string;
}

// Gender Schema
const genderSchema: Schema = new Schema({
  gn_id: { type: Number, required: true, unique: true, index: true },
  gn_name: { type: String, required: false, maxlength: 45, default: '' }
}, { 
  collection: 'genders' 
});

// Gender Model
const Gender: Model<IGender> = mongoose.model<IGender>('Gender', genderSchema);

export default Gender;