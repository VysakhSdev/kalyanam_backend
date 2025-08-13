import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiHandlerHelpers";
import { IUserLogin } from "../models/userModel";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    throw new ApiError(401, "Not authorized, no token provided");
  }

  token = token.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    req.user = decoded as IUserLogin; // Add user id to req
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token");
  }
};
