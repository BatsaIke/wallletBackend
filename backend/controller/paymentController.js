const User = require("../model/UserModel");
const PaymentSession = require('../model/PaymentSessionModel');
const { v4: uuidv4 } = require('uuid');

const dotenv = require("dotenv");
const { payWithMomo, payWithCard } = require("../middleware/payWithMomoorCard");
const {
  findUserById,
  getMostRecentPayment,
  verifyPayment,
  calculateAccountBalance,
  tokenValue,
} = require("../middleware/otherHelperFunctions");
dotenv.config();

const { updatePaystackStatus } = require("../middleware/payStackWebhook");

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
  
  const { paymentMethod, amount, } = req.body;
  const email='giftiesrawbites@gmail.com'
  const sessionID = uuidv4(); 

  try {
    let paymentResult;
    if (paymentMethod === "momo") {
      paymentResult = await payWithMomo(email, amount);
    } else if (paymentMethod === "card") {
      paymentResult = await payWithCard(email, amount);
    } else {
      return res.status(400).json({ error: "Invalid payment method" });
    }

    if (!paymentResult.response.data?.reference) {
      return res.status(500).json({ error: "Failed to obtain payment reference" });
    }

    // Initialize and save the payment session document with the reference
    let paymentSession = await PaymentSession.create({
      sessionID,
      email,
      amount,
      paymentMethod,
      status: 'initialized',
      reference: paymentResult.response.data?.reference, 
    });
    res.status(200).json({
      ...paymentResult,
      sessionID: paymentSession.sessionID, 
    });
  } catch (error) {
    console.error("Server error@PaymentMethod:", error.message);
    res.status(500).send("Server error during payment initialization");
  }
};



const paymentStatus = async (req, res) => {
  console.log("payment statu displatch backend")

  try {
    const { sessionID } = req.params;
    const paymentSession = await PaymentSession.findOne({ sessionID });

    if (!paymentSession) {
        return res.status(404).json({ message: "Payment session not found." });
    }

    // Respond with the status of the payment session
    res.json({ status: paymentSession.status, reference: paymentSession.reference });
} catch (error) {
    console.error(`Error fetching payment status: `, error);
    res.status(500).send('Internal Server Error');
}
};

//get payment status
//@route GET api/v1/payment/verify
//@desc payment route
//access private

const verifyPament = async (req, res) => {
  const { reference } = req.query;  

  if (!reference) {
    return res.status(400).send("Payment reference is required");
  }

  try {
    const paymentDetails = await verifyPayment(reference);

    if (!paymentDetails) {
      return res.status(404).send("Payment details not found");
    }
    console.log(paymentDetails,"inside the payment destais verify") 


    if (paymentDetails.status === "success") {
      // Assuming you handle some business logic here, like confirming an order
      return res.status(200).json({
        message: "Payment verified successfully",
        details: paymentDetails
      });
    } else {
      return res.status(402).send("Payment verification failed: " + paymentDetails.message);
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    return res.status(500).send("Internal Server Error");
  }
};

// const verifyPament = async (req, res) => {
//   const { reference } = req.query;  // Expecting 'reference' to be passed as a URL query parameter

//   if (!reference) {
//     return res.status(400).send("Payment reference is required");
//   }

//   try {
//     const paymentDetails = await verifyPayment(reference);

//     if (!paymentDetails) {
//       return res.status(404).send("Payment details not found");
//     }

//     if (paymentDetails.status === "success") {
//       // Assuming you handle some business logic here, like confirming an order
//       return res.status(200).json({
//         message: "Payment verified successfully",
//         details: paymentDetails
//       });
//     } else {
//       return res.status(402).send("Payment verification failed: " + paymentDetails.message);
//     }
//   } catch (error) {
//     console.error('Payment verification error:', error);
//     return res.status(500).send("Internal Server Error");
//   }
// };

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
  paymentStatus
};
