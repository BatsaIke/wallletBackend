const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const { createUserDetails } = require("../controller/userController");

router
  .route("/create-user")
  .post(
    [
      check("name", "Name is required").not().isEmpty(),
      check("email", "Enter a valid email").isEmail(),
      check("password", "Enter a valid password").isLength({ min: 6 }),
      check("phone", "Enter a valid phone number")
  .isMobilePhone("any", { strictMode: false })
  .isLength({ min: 9, max: 10 })
    ],
    createUserDetails
  );

 

module.exports = router;
