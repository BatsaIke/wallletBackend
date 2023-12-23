const User = require("../model/UserModel");
const { validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { payWithMomo, payWithCard } = require("../moddleware/payWithMomoorCard");
const { findUserById, getMostRecentPayment, verifyPayment, calculateAccountBalance } = require("../moddleware/otherHelperFunctions");
const { updatePaymentStatus } = require("../moddleware/updatePaymentStatus");
dotenv.config();

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
    res.status(500).send("Server error");
  }
};

//pay for token
//@rout POST api/v1/payment/pay
//@desc payment route
//access private

const payToken = async (req, res) => {
  const { paymentMethod, amount } = req.body;

  let user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).send("User not found");
  }

  const { email } = user;

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
    res.status(500).send(error.message);
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
    //verify the payment using the reference
    const paymentDetails = await verifyPayment(reference);

    //check if verification if successful and update the current balance
    if (paymentDetails.status === "success") {
      const updatedUser = await updatePaymentStatus( 
        user._id,
        mostRecentPayment._id,
        mostRecentPayment.amount
      );
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

module.exports = {
  verifyPament,
  createUserDetails,
  payToken,
};
