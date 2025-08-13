import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { IInterest } from "./intrestModel"; 

interface IUserInterest extends Document {
  user_id: Types.ObjectId; // Ref to User
  interest_id: Types.ObjectId | IInterest; // Ref to Interest
  date_added?: Date;
}

const userInterestSchema: Schema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  interest_id: {
    type: Schema.Types.ObjectId,
    ref: 'Interest',
    required: true,
    index: true
  },
  date_added: {
    type: Date,
    required: false,
    default: Date.now
  }
}, {
  collection: 'user_interests'
});

// Prevent duplicates (same user selecting same interest twice)
userInterestSchema.index({ user_id: 1, interest_id: 1 }, { unique: true });

const UserInterest: Model<IUserInterest> = mongoose.model<IUserInterest>('UserInterest', userInterestSchema);

export { IUserInterest, UserInterest };

// sample code for matching using interest 
// const myInterests = await UserInterest.find({ user_id: myUserId }).select('interest_id');

// const interestIds = myInterests.map(i => i.interest_id);

// const matches = await UserInterest.aggregate([
//   { $match: { user_id: { $ne: myUserId }, interest_id: { $in: interestIds } } },
//   { $group: { _id: "$user_id", commonInterests: { $sum: 1 } } },
//   { $sort: { commonInterests: -1 } } // Highest shared interests first
// ]);
