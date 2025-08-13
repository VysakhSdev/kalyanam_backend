import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError, ApiResponse } from "../utils/apiHandlerHelpers";
import User from "../models/userModel";
import Otp from "../models/otpModel"; // store OTP temporarily
import { sendOtp } from "../utils/sendOtp"; // integrate SMS gateway
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

/**
 * Step 1: Send OTP
 */
export const sendOtpToMobile = asyncHandler(async (req: Request, res: Response) => {
  const { mobile } = req.body;

  if (!mobile) {
    throw new ApiError(400, "Mobile number is required");
  }

  // Generate random OTP
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

  // Store OTP in DB (expires in 5 min)
  await Otp.create({
    mobile,
    otp: otpCode,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  });

  // Send OTP (SMS Gateway integration)
  await sendOtp(mobile, otpCode);

  res.status(200).json(new ApiResponse(200, null, "OTP sent successfully"));
});


export const verifyOtp = asyncHandler(async (req: Request, res: Response) => {
  const { mobile, otp } = req.body;

  if (!mobile || !otp) {
    throw new ApiError(400, "Mobile number and OTP are required");
  }

  // Check OTP
  const otpRecord = await Otp.findOne({ mobile, otp }).sort({ createdAt: -1 });

  if (!otpRecord || otpRecord.expiresAt < new Date()) {
    throw new ApiError(400, "Invalid or expired OTP");
  }

  // Find or create user
  let user = await User.findOne({ mobile });

  if (!user) {
    user = await User.create({
      mobile,
      isRegistrationComplete: false,
    });
  }

  // Delete OTP record after verification
  await Otp.deleteMany({ mobile });

  // Generate token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  // Response
  res.status(200).json(
    new ApiResponse(200, { token, user }, "OTP verified successfully")
  );
});


export const completeRegistration = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.user as { id: string }; // From JWT middleware
  const {
    name,
    email,
    dob,
    gender,
    location,
    interests,
  } = req.body;

  // Validate required fields
  if (!name || !dob || !gender) {
    throw new ApiError(400, "Name, DOB, and gender are required");
  }

  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.isRegistrationComplete) {
    throw new ApiError(400, "Registration already completed");
  }

  user.name = name;
  user.email = email;
  user.dob = dob;
  user.gender = gender;
  user.location = location;
  user.interests = interests;
  user.isRegistrationComplete = true;

  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, user, "Registration completed successfully"));
});


export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.user as { id: string };
  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json(new ApiResponse(200, user, "Profile fetched successfully"));
});
