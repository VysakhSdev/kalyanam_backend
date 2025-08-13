import mongoose, { Schema, Document, Model } from "mongoose";

// Interface for the User document
export interface IUserLogin extends Document {
  us_prfid: number;
  us_phone?: string;
  us_email?: string;
  us_password?: string;
  us_salt?: string;
  us_package?: number;
  us_regdate?: Date;
  us_gender?: mongoose.Types.ObjectId;
  us_name?: string;
  us_dob?: Date;
  us_district?: mongoose.Types.ObjectId;
  us_location?: string;
  us_religion?: mongoose.Types.ObjectId;
  us_cast?: mongoose.Types.ObjectId;
  us_cratedfor?: mongoose.Types.ObjectId;
  us_age?: number;
  us_address1?: string;
  us_address2?: string;
  us_state?: mongoose.Types.ObjectId;
  us_country?: mongoose.Types.ObjectId;
  us_city?: string;
  us_otherno?: string;
  us_status?: mongoose.Types.ObjectId;
  us_photo_prct?: boolean;
  us_c_code?: string;
  us_o_c_code?: string;
  Reg_IP?: string;
  Lt_ip?: string;
  profile_des?: string;
  disability?: boolean;
  isRegistrationComplete:boolean;
}

// User Schema
const userLoginSchema: Schema = new Schema({
  us_prfid: { type: Number, required: true, unique: true, index: true },
  us_phone: { type: String, required: false, maxlength: 45, default: '' },
  us_email: { type: String, required: false, maxlength: 65, default: '' },
  us_password: { type: String, required: false, maxlength: 155, default: '' },
  us_salt: { type: String, required: false, maxlength: 45, default: '' },
  us_package: { type: Number, required: false, default: 0 },
  us_regdate: { type: Date, required: false, default: Date.now },
  us_gender: { type: Schema.Types.ObjectId, ref: 'Gender', required: false, index: true },
  us_name: { type: String, required: false, maxlength: 45, default: '' },
  us_dob: { type: Date, required: false },
  us_district: { type: Schema.Types.ObjectId, ref: 'District', required: false, index: true },
  us_location: { type: String, required: false, maxlength: 45, default: '' },
  us_religion: { type: Schema.Types.ObjectId, ref: 'Religion', required: false, index: true },
  us_cast: { type: Schema.Types.ObjectId, ref: 'Cast', required: false, index: true },
  us_cratedfor: { type: Schema.Types.ObjectId, ref: 'ProfileCreated', required: false, index: true },
  us_age: { type: Number, required: false, index: true },
  us_address1: { type: String, required: false },
  us_address2: { type: String, required: false },
  us_state: { type: Schema.Types.ObjectId, ref: 'State', required: false, index: true },
  us_country: { type: Schema.Types.ObjectId, ref: 'Country', required: false, index: true },
  us_city: { type: String, required: false, maxlength: 45, default: '' },
  us_otherno: { type: String, required: false, maxlength: 15, default: '' },
  us_status: { type: Schema.Types.ObjectId, ref: 'MaritalStatus', required: false, index: true },
  us_photo_prct: { type: Boolean, required: false, default: false },
  us_c_code: { type: String, required: false, maxlength: 6, default: '' },
  us_o_c_code: { type: String, required: false, maxlength: 6, default: '' },
  Reg_IP: { type: String, required: false, maxlength: 150, default: '' },
  Lt_ip: { type: String, required: false, maxlength: 50, default: '' },
  profile_des: { type: String, required: false, maxlength: 200, default: '' },
  disability: { type: Boolean, required: false, default: false },
  isRegistrationComplete:{type:Boolean,default:false}
}, {
  collection: 'users',
  indexes: [
    { key: { us_phone: 1, us_email: 1 } }
  ]
});

// User Model
const UserLogin: Model<IUserLogin> = mongoose.model<IUserLogin>('User', userLoginSchema);

export default UserLogin;