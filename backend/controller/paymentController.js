const { validationResult } = require("express-validator");
const User = require("../model/UserModel");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { payWithMomo, payWithCard } = require("../moddleware/payWithMomoorCard");
const {
  findUserById,
  getMostRecentPayment,
  verifyPayment,
  calculateAccountBalance,
  tokenValue,
} = require("../moddleware/otherHelperFunctions");
const { updatePaymentStatus } = require("../moddleware/updatePaymentStatus");
dotenv.config();
const mongoose = require("mongoose");
const generateUniqueToken = require("../utils/generateUniqueUsertoken");

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

//pay for token
//@rout POST api/v1/payment/pay
//@desc payment route
//access private
const payAsGuest = async (req, res) => {
  const { paymentMethod, amount, email } = req.body;
  try {
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
const verifyPament = async (req, res) => {
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
      const tokenBalance = tokenValue(totalAccountBalance);

      res.send(updatedUser);
    } else {
      res.status(400).send("Payment verification failed");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// buyProduct - handles product purchase by subtracting amount from user's balance
//@route POST api/v1/payment/buy-product
//@desc Buy a product
//access private
const buyProduct = async (req, res) => {
  const { amount } = req.body; // This is the amount to deduct from totalBalance
  const numericAmount = parseFloat(amount); // Ensure amount is a number

  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Log to debug
    console.log(
      `User totalBalance before purchase: ${user.balance.totalBalance}, Purchase amount: ${numericAmount}`
    );

    // Validate user's totalBalance and the numericAmount
    if (isNaN(user.balance.totalBalance) || isNaN(numericAmount)) {
      return res.status(400).json({ error: "Invalid totalBalance or amount" });
    }

    // Check if the user's totalBalance is sufficient for the purchase
    if (user.balance.totalBalance < numericAmount) {
      return res
        .status(400)
        .json({ error: "Total balance is too low for this purchase" });
    }

    // Deduct the amount from the user's totalBalance
    user.balance.totalBalance -= numericAmount;

    // Update tokenBalance based on the new totalBalance
    // Assuming 1 totalBalance = 10 tokenBalance
    user.balance.tokenValue = user.balance.totalBalance * 10;

    await user.save();

    res.status(200).json({
      message: "Purchase successful",
      newTotalBalance: user.balance.totalBalance,
      newTokenBalance: user.balance.tokenValue,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error during purchase");
  }
};

module.exports = {
  verifyPament,
  payToken,
  buyProduct,
  payAsGuest,
};
