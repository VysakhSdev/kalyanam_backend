import express from "express";
import {
  sendOtpToMobile,
  verifyOtp,
  completeRegistration,
  getProfile,
} from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware"; // JWT middleware

const router = express.Router();

// Step 1: Send OTP
router.post("/send-otp", sendOtpToMobile);

// Step 2: Verify OTP & Login/Register
router.post("/verify-otp", verifyOtp);

// Step 3: Complete Registration (JWT Protected)
router.post("/complete-registration", authMiddleware, completeRegistration);

// Step 4: Get Current User Profile (JWT Protected)
router.get("/profile", authMiddleware, getProfile);

export default router;
