const User = require("../model/UserModel");

const dotenv = require("dotenv");
dotenv.config()

const Paystack = require("paystack")(process.env.PAYSTACK_KEY)


const payWithMomo = async (email, amount) => {
  try {
      const transaction = Paystack.transaction;
      const response = await transaction.initialize({
          paymentMethod: "momo",
          email,
          amount: parseInt(amount) * 100, // Convert amount to smallest currency unit
          currency: "GHS",
      });

      if (response.status === true) {
          // First check if there's a user with the given email
          const user = await User.findOne({ email });

          if (user) {
              // If the user exists, update their payment records
              const updatedUser = await User.findOneAndUpdate(
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

              return { response, user: updatedUser };
          }

          // If no user is found, return the response with user set to null
          return { response, user: null };
      }

      // If the transaction was not successful, return only the response
      return { response };
  } catch (error) {
      console.error(error.message);
      throw new Error("Server error");
  }
};


//paywith card
const payWithCard = async (email, amount) => {
  try {
    // Initialize the transaction with Paystack
    const response = await Paystack.transaction.initialize({
      email,
      amount: parseInt(amount) * 100,  // Multiply by 100 to convert to smallest currency unit, e.g., cents or pesewas
      currency: "GHS",
      channels: ["card"],
    });

    if (response.status === true) {
      // Check if the email exists in the database
      const user = await User.findOne({ email });

      if (user) {
        // If the user exists, update their payment records
        const updatedUser = await User.findOneAndUpdate(
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

        return { response, user: updatedUser };
      }

      // If no user is found with that email, just return the Paystack response
      return { response, user: null };
    }
  } catch (error) {
    console.error(error);
    throw new Error("An unexpected error occurred");
  }
};

module.exports = {payWithMomo,payWithCard}