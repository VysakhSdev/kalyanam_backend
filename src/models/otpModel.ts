import mongoose, { Schema, Document } from "mongoose";

interface IOtp extends Document {
  mobile: string;
  otp: string;
  expiresAt: Date;
}

const otpSchema = new Schema<IOtp>(
  {
    mobile: { type: String, required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IOtp>("Otp", otpSchema);
