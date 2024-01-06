const { validationResult } = require("express-validator");
const User = require("../model/UserModel");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { payWithMomo, payWithCard } = require("../moddleware/payWithMomoorCard");
const { findUserById, getMostRecentPayment, verifyPayment, calculateAccountBalance } = require("../moddleware/otherHelperFunctions");
const { updatePaymentStatus } = require("../moddleware/updatePaymentStatus");
dotenv.config();
const mongoose = require("mongoose");

const Paystack = require("paystack")(process.env.PAYSTACK_KEY); // Replace with your secret key

//@rout POST api/v1/users/create-user
//@desc test route
//access public
const createUserDetails = async (req, res) => {
  const errors = validationResult(req);
  //check if no errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, phone, password } = req.body;
  try {
    //check if user exist
    let user = await User.findOne({
      $or: [{ email }, { phone }],
    });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exist" }] });
    }
    //get users gravatar
    const avatar = gravatar.url(email, {
      s: 200,
      r: "pg",
      d: "mm",
    });
    //create instance of user
    user = new User({
      name,
      email,
      phone,
      password,
      avatar,
    });

    //encrypt passeord using bcrypt
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    //return jsonwebtoken
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
    res.status(500).send("Server error1");
  }
};

//pay for token
//@rout POST api/v1/payment/pay
//@desc payment route
//access private
const payToken = async (req, res) => {
  const { paymentMethod, amount } = req.body;
  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const { email } = user;

    let paymentResult;
    if (paymentMethod === "momo") {
      paymentResult = await payWithMomo(email, amount);
    } else if (paymentMethod === "card") {
      paymentResult = await payWithCard(email, amount);
    } else {
      return res.status(400).json({ error: "Invalid payment method" });
    }

    res.status(200).json(paymentResult);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error@PaymentMethod");
  }
};



//get payment status
//@route GET api/v1/payment/verify
//@desc payment route
//access private
const verifyPament= async (req, res) => {
  try {
    //find the current user
    const user = await findUserById(req.user.id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    //get the very last payment
    const mostRecentPayment = getMostRecentPayment(user.payments);

    if (!mostRecentPayment) {
      return res.status(400).send("No payment found for the user");
    }

    //get the payment reference
    const reference = mostRecentPayment.reference;
    const paymentDetails = await verifyPayment(reference);

    if (paymentDetails.status === "success") {
      const updatedUser = await updatePaymentStatus(
        user._id,
        mostRecentPayment._id,
        mostRecentPayment.amount
      );

      // Wait for the balance update to complete before sending the response
      const totalAccountBalance = calculateAccountBalance(updatedUser.payments);
      console.log("Total Account Balance:", totalAccountBalance);

      res.send(updatedUser);
    } else {
      res.status(400).send("Payment verification failed");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


//updated user profile


const updateUserProfile = async (req, res) => {
  const userId = req.params.id; // Use userId consistently
  const updatedData = req.body;

  try {
    // Make sure to handle the case where the provided id is not a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user id' });
    }

    // Assuming you want to update the user with the provided id
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Handle the update logic based on the edited data
    // Update the user properties as needed
    user.name = updatedData.name || user.name;
    user.email = updatedData.email || user.email;
    user.phone = updatedData.phone || user.phone;

    await user.save();

    // Respond with the updated user data and a message
    res.status(200).json({
      message: 'User profile updated successfully',
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error4');
  }
};

module.exports = {
  verifyPament,
  createUserDetails,
  payToken,
  updateUserProfile
};