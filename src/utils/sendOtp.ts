import twilio from "twilio";

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export const sendOtp = async (mobile: string, otp: string) => {
  try {
    const message = await twilioClient.messages.create({
      body: `Your verification code is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER!,
      to: mobile.startsWith("+") ? mobile : `+91${mobile}` // defaults to India code
    });

    return {
      success: true,
      sid: message.sid
    };
  } catch (error: any) {
    console.error("Error sending OTP via Twilio:", error);
    return {
      success: false,
      error: error.message
    };
  }
};
