const express = require("express");
const router = express.Router();

const {
  forgotPassword,
  resetPassword
} = require("../controllers/password.controller");

// Forgot password route
router.post("/forgot-password", forgotPassword);

// Reset password route
router.post("/reset-password/:token", resetPassword);

module.exports = router;