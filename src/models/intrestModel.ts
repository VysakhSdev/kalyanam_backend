import mongoose, { Schema, Document, Model } from "mongoose";

// Interface for Interest document
interface IInterest extends Document {
  int_id: number;
  int_name: string;
}

const interestSchema: Schema = new Schema({
  int_id: {
    type: Number,
    required: true,
    unique: true,
    index: true
  },
  int_name: {
    type: String,
    required: true,
    maxlength: 45
  }
}, {
  collection: 'interests'
});

const Interest: Model<IInterest> = mongoose.model<IInterest>('Interest', interestSchema);

export { IInterest, Interest };
