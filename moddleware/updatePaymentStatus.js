const User = require("../model/UserModel");
const { calculateAccountBalance } = require("./otherHelperFunctions");

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

    // Update the totalBalance field in the user's balance schema
    await User.findByIdAndUpdate(
      userId,
      { $set: { "balance.totalBalance": totalAccountBalance } },
      { new: true, w: "majority" }
    );

    return updatedUser;
  } catch (error) {
    console.error("Error updating payment status:", error);
    throw error;
  }
};

module.exports = { updatePaymentStatus };
