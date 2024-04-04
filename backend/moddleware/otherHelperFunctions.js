const User = require("../model/UserModel")
const Paystack = require("paystack")(process.env.PAYSTACK_KEY); // Replace with your secret key

const findUserById = async (userId) => {
    const user = await User.findById(userId);
    return user;
  };
  
  const getMostRecentPayment = (payments) => {
    const sortedPayments = payments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    return sortedPayments[0];
  };
  
  const verifyPayment = async (reference) => {
    const verifyResponse = await Paystack.transaction.verify(reference);
    return verifyResponse.data;
  };
  
  
  const calculateAccountBalance = (payments) => {
    return payments.reduce((total, payment) => total + payment.walletBalance, 0);
  };

  const tokenValue = (calculatedBalance) => {
    const tokenValue = (calculatedBalance * 10).toFixed(3);
    return parseFloat(tokenValue);
};

  
  module.exports ={verifyPayment,getMostRecentPayment,findUserById,calculateAccountBalance,tokenValue}