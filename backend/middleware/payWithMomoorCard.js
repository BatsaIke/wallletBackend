const User = require("../model/UserModel");

const dotenv = require("dotenv");
dotenv.config()

const Paystack = require("paystack")(process.env.PAYSTACK_KEY)


//pay with momo
const payWithMomo = async (email, amount) => {
    try {
      const transaction = Paystack.transaction;
      const response = await transaction.initialize({
        paymentMethod: "momo",
        email,
        amount: parseInt(amount) * 100,
        currency: "GHS",
      });
  
      if (response.status === true) {
        const user = await User.findOneAndUpdate(
          { email },
          {
            $push: {
              payments: {
                reference: response.data.reference,
                amount,
                paymentMethod: "momo",
                timestamp: new Date(),
              },
            },
          },
          { new: true }
        ).select("-password");
        return { response, user };
      }
    } catch (error) {
      console.error(error.message);
      throw new Error("Server error");
    }
  };


//paywith card
  const payWithCard = async (email, amount) => {
    try {
      const response = await Paystack.transaction.initialize({
        email,
        amount: parseInt(amount) * 100,
        currency: "GHS",
        channels: ["card"],
      });
  
      if (response.status === true) {
        const user = await User.findOneAndUpdate(
          { email },
          {
            $push: {
              payments: {
                reference: response.data.reference,
                amount,
                paymentMethod: "card",
                timestamp: new Date(),
              },
            },
          },
          { new: true }
        ).select("-password");
        return { response, user };
      }
    } catch (error) {
      console.error(error);
      throw new Error("An unexpected error occurred");
    }
  };
module.exports = {payWithMomo,payWithCard}