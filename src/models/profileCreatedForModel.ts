import mongoose, { Schema, Document, Model } from "mongoose";

// Interface for the ProfileCreated document
interface IProfileCreated extends Document {
  prc_id: number;
  prc_name?: string;  // Optional field
}

// ProfileCreated Schema
const profileCreatedSchema: Schema = new Schema({
  prc_id: { 
    type: Number, 
    required: true, 
    unique: true, 
    index: true 
  },
  prc_name: { 
    type: String, 
    required: false, 
    maxlength: 45, 
    default: '' 
  }
}, { 
  collection: 'profile_created' 
});

// ProfileCreated Model
const ProfileCreated: Model<IProfileCreated> = mongoose.model<IProfileCreated>(
  'ProfileCreated', 
  profileCreatedSchema
);

export { IProfileCreated, ProfileCreated };