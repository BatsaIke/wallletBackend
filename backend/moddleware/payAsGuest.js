const dotenv = require("dotenv");
dotenv.config()

const Paystack = require("paystack")(process.env.PAYSTACK_KEY);

// Pay with mobile money
const payWithMomo = async (email, amount) => {
  try {
    const transaction = Paystack.transaction;
    const response = await transaction.initialize({
      paymentMethod: "momo",
      email,
      amount: parseInt(amount) * 100,
      currency: "GHS",
    });

    if (response.data.status === true && response.data.data) {
      console.log(response.data.data)
      return { success: true, authorizationUrl: response.data.data.authorization_url };
    } else {
      return { success: false, message: 'Payment initialization failed' };
    }
  } catch (error) {
    console.error(error.message);
    throw new Error("Server error");
  }
};

// Pay with card
const payWithCard = async (email, amount) => {
  try {
    const response = await Paystack.transaction.initialize({
      email,
      amount: parseInt(amount) * 100,
      currency: "GHS",
      channels: ["card"],
    });

    if (response.data.status === true && response.data.data) {
      console.log(response.data.data)
      return { success: true, authorizationUrl: response.data.data.authorization_url };
    } else {
      return { success: false, message: 'Payment initialization failed' };
    }
  } catch (error) {
    console.error(error);
    throw new Error("An unexpected error occurred");
  }
};

// Remember to export your functions if you're using them in different modules
module.exports = { payWithMomo, payWithCard };
