const { validationResult } = require("express-validator");
const User = require("../model/UserModel");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv"); 

dotenv.config();
const mongoose = require("mongoose");
const generateUniqueToken = require("../utils/generateUniqueUsertoken");

const Paystack = require("paystack")(process.env.PAYSTACK_KEY); // Replace with your secret key

//@rout POST api/v1/users/create-user
//@desc test route
//access public
const createUserDetails = async (req, res) => {
  const errors = validationResult(req);
  // Check if no errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (user) {
      return res.status(401).json({ errors: [{ msg: "User already exists" }] });
    }

    // Get user's gravatar
    const avatar = gravatar.url(email, {
      s: 200,
      r: "pg",
      d: "mm",
    });

    // Generate a unique tokenDigit
    const tokenDigit = generateUniqueToken();

    // Create an instance of user with tokenDigit
    user = new User({
      name,
      email,
      phone,
      password,
      avatar,
      tokenDigit,
    });

    // Encrypt password using bcrypt
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Return JSON Web Token
    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

//updated user profile
const updateUserProfile = async (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;

  try {
    // Make sure to handle the case where the provided id is not a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user id" });
    }

    // Assuming you want to update the user with the provided id
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Handle the update logic based on the edited data
    // Update the user properties as needed
    user.name = updatedData.name || user.name;
    user.email = updatedData.email || user.email;
    user.phone = updatedData?.phone || user.phone;

    await user.save();

    // Respond with the updated user data and a message
    res.status(200).json({
      message: "User profile updated successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error4");
  }
};

module.exports = {
  createUserDetails,
  updateUserProfile,
};
