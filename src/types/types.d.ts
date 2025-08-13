import { Document } from "mongoose";
import { IUserLogin } from "../models/userModel";


declare global {
  namespace Express {
    export interface Request {
      user?: IUserLogin;
    }
  }
}

export {};
