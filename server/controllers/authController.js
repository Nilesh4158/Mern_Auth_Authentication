// controllers/authController.js

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";
import {
  EMAIL_VERIFY_TEMPLATE,
  PASSWORD_RESET_TEMPLATE,
  WELCOME_TEMPLATE,
} from "../config/emailTemplates.js";

// ------------------- Helpers -------------------

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

const generateOtp = () =>
  String(Math.floor(100000 + Math.random() * 900000));

const sendMail = async (to, subject, html) => {
  await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to,
    subject,
    html,
  });
};

// ------------------- Controllers -------------------

// Register User
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.json({ success: false, message: "Missing details" });

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    const token = generateToken(user._id);
    res.cookie("token", token, COOKIE_OPTIONS);

    await sendMail(
      email,
      "🎉 Welcome to REAL WORLD",
      WELCOME_TEMPLATE.replace("{{email}}", email)
    );

    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Login User
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.json({
      success: false,
      message: "Email and password are required",
    });

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.json({ success: false, message: "Invalid password" });

    const token = generateToken(user._id);
    res.cookie("token", token, COOKIE_OPTIONS);

    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", COOKIE_OPTIONS);
    return res.json({ success: true, message: "Logged out" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Send Verification OTP
export const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);

    if (!user) return res.json({ success: false, message: "User not found" });
    if (user.isAccountVerified)
      return res.json({ success: false, message: "Account already verified" });

    const otp = generateOtp();
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000; // 24h
    await user.save();

    await sendMail(
      user.email,
      "🔑 Account Verification OTP",
      EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace(
        "{{email}}",
        user.email
      )
    );

    res.json({ success: true, message: "Verification OTP sent on email" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Verify Email
export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;

  if (!userId || !otp)
    return res.json({ success: false, message: "Missing details" });

  try {
    const user = await userModel.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    if (!user.verifyOtp || user.verifyOtp !== otp)
      return res.json({ success: false, message: "Invalid OTP" });

    if (user.verifyOtpExpireAt < Date.now())
      return res.json({ success: false, message: "OTP expired" });

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();

    return res.json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Check Authentication
export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Send Password Reset OTP
export const sendResetOtp = async (req, res) => {
  const { email } = req.body;
  if (!email)
    return res.json({ success: false, message: "Email is required" });

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    const otp = generateOtp();
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 60 * 60 * 1000; // 1h
    await user.save();

    await sendMail(
      user.email,
      "🔒 Password Reset OTP",
      PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace(
        "{{email}}",
        user.email
      )
    );

    return res.json({ success: true, message: "OTP sent to email" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword)
    return res.json({
      success: false,
      message: "Email, OTP, and new password are required",
    });

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    if (!user.resetOtp || user.resetOtp !== otp)
      return res.json({ success: false, message: "Invalid OTP" });

    if (user.resetOtpExpireAt < Date.now())
      return res.json({ success: false, message: "OTP expired" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    await user.save();

    return res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
