const express = require("express");
const router = express.Router();
const auth =require('../middleware/auth.js')
const { check } = require("express-validator");

const {
 getAuthenticatedUser, authenticateUser,
} = require("../controller/authController.js");
router
  .route("/")
  .get(auth, getAuthenticatedUser)
  .post([
    check("password", "Password is required").exists(),
    check("text").custom((value, { req }) => {
      if (!value) {
        throw new Error("Enter a valid email or phone number");     
       }
    
      const isEmail = /^\S+@\S+\.\S+$/.test(value);
      const isPhone = /^\d{9,10}$/.test(value);
    
      if (!isEmail && !isPhone) {
        throw new Error("Enter a valid email or phone number");
      }
    
      return true;
    }), 
  ], authenticateUser);

module.exports = router;


