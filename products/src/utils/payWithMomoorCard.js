

const Paystack = process.env.REACT_APP_PAYSTACK_KEY;



//pay with momo
export const payWithMomo = async (email, amount) => {
  console.log(Paystack);
    try {
      const transaction = Paystack.transaction;
      const response = await transaction.initialize({
        paymentMethod: "momo",
        email,
        amount: parseInt(amount) * 100,
        currency: "GHS",
      });
  
      if (response.status === true && response.data) {
        // Assuming response.data.authorization_url is the URL to redirect the user for payment
        return { success: true, authorizationUrl: response.data.authorization_url };
      } else {
        // Handle cases where response.status isn't true or response.data is missing
        return { success: false, message: 'Payment initialization failed' };
      }
    } catch (error) {
      console.error(error.message);
      throw new Error("Server error");
    }
  };


//paywith card
export  const payWithCard = async (email, amount) => {
    try {
      const response = await Paystack.transaction.initialize({
        email,
        amount: parseInt(amount) * 100,
        currency: "GHS",
        channels: ["card"],
      });
      if (response.status === true && response.data) {
        // Assuming response.data.authorization_url is the URL to redirect the user for payment
        return { success: true, authorizationUrl: response.data.authorization_url };
      } else {
        // Handle cases where response.status isn't true or response.data is missing
        return { success: false, message: 'Payment initialization failed' };
      }
    } catch (error) {
      console.error(error);
      throw new Error("An unexpected error occurred");
    }
  };
