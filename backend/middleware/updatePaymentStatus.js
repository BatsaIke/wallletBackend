const { calculateAccountBalance, tokenValue } = require("./otherHelperFunctions");
const User = require("../model/UserModel");

const updatePaymentStatus = async (userId, paymentId, amount) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $inc: { "payments.$[elem].walletBalance": amount },
        $set: { "payments.$[elem].paymentStatus": "success" },
      },
      {
        new: true,
        arrayFilters: [
          { "elem._id": paymentId, "elem.paymentStatus": { $ne: "success" } },
        ],
      }
    ).select("-password");

    // Calculate total account balance after the update
    const totalAccountBalance = calculateAccountBalance(updatedUser.payments);
  
    
    // Calculate token value based on the total account balance
    const tokenBalance = tokenValue(totalAccountBalance);

    await User.findByIdAndUpdate(
      userId,
      { $set: { "balance.totalBalance": totalAccountBalance } },
      { new: true, w: "majority" }
    );

    // Update the tokenValue field in the user's balance schema
    await User.findByIdAndUpdate(
      userId,
      { $set: { "balance.tokenValue":  tokenBalance.toFixed(3)} },
      { new: true, w: "majority" }
    );

    return updatedUser;
  } catch (error) {
    console.error("Error updating payment status:", error);
    throw error;
  }
};

module.exports = { updatePaymentStatus };
