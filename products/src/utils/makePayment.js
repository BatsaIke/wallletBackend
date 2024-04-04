import { payWithCard, payWithMomo } from "./payWithMomoorCard";

const payToken = async (email, paymentMethod, amount) => {
   
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

  export default payToken