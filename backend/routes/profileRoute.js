const express = require("express");
const { check } = require("express-validator");

const router = express.Router(); 

const {
  requestPasswordReset,
  resetPassword,
} = require("../controller/profileController");

// Request password reset route
router.route("/request-password-reset").post(
  [
    check("email", "Enter a valid email").isEmail(),
  ],
  requestPasswordReset
);

// Reset password route
router.route("/reset-password").post(
    [
      check("newPassword", "Enter a valid password").isLength({ min: 6 }),
    ],
    resetPassword
  );

module.exports = router;
