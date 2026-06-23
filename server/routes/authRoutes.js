const express = require("express");
const router = express.Router();

const {
  registerUser,
  verifyOTP,
  loginUser,
  getMe,
  logoutUser,
  resendOtp,
} = require("../controllers/authController");

const { registerValidator } = require("../validators/authValidator");
const { validateRequest } = require("../middleware/validateMiddleware");
const { protect } = require("../middleware/authMiddleware");

//Register
router.post("/register", registerValidator, validateRequest, registerUser);

// VERIFY OTP 
router.post("/verify-otp", verifyOTP);

//Login
router.post("/login", loginUser);

// LOGOUT 
router.post("/logout", logoutUser);

// GET CURRENT USER 
router.get("/me", protect, getMe);

// RESEND OTP 
router.post("/resend-otp", resendOtp);

module.exports = router;
