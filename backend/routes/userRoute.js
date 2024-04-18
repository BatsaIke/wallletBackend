const express = require("express");
const { check } = require("express-validator");
const {
  createUserDetails,
  updateUserProfile,
} = require("../controller/userController");

const router = express.Router();

router
  .route("/create-user")
  .post(
    [
      check("name", "Name is required").not().isEmpty(),
      check("email", "Enter a valid email").isEmail(),
      check("password", "Enter a valid password").isLength({ min: 6 }),
      // check("phone", "Enter a valid phone number")
        // .isMobilePhone("any", { strictMode: false })
        // .isLength({ min: 9, max: 10 }),
    ],
    createUserDetails
  );

router.put(
  "/update-user/:id",
  [
    check("name", "Name is required").notEmpty(),
    check("email", "Enter a valid email").isEmail(),
    // check("phone", "Phone number is required").notEmpty(),
  ],
  updateUserProfile
);



module.exports = router;


