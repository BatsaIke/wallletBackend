const express = require("express");
const bodyParser = require("body-parser");
// const Paystack = require('paystack');

const app = express();
const port = 3000;

// Replace with your Paystack secret key
// const paystack = Paystack('sk_live_3f73be377353a06d83708ff111b5cf41d50d4ac6');
const Paystack = require("paystack")(
  "sk_test_629a0e97a3f4f238b6184becf2a917fb9edd7c9f"
); // Replace with your secret key

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/pay", async (req, res) => {
  try {
    const { paymentMethod, email, amount } = req.body;

    // Create a new transaction instance
    const transaction = Paystack.transaction;

    // Use the initialize method for Mobile Money
    const response = await transaction.initialize({
      paymentMethod,
      email,
      amount: parseInt(amount), // Convert to kobo
      currency: "GHS", // Use GHS for Ghana Cedis or USD for US Dollars
      ref: "2", // Replace with a reference you generated
    });
    res.json(response);
    if (response.status === "success") {
      res
        .status(200)
        .json({
          message: "Payment successful",
          reference: response.data.reference,
        });
    } else {
      res.status(400).json({ error: response.error });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/verify/:reference", async (req, res) => {
  try {
    const reference = req.params.reference;

    // Verify the payment with the provided reference
    const verifyResponse = await Paystack.transaction.verify(reference);

    // Handle the verification response
    if (verifyResponse.data.status === "success") {
      const paymentDetails = verifyResponse.data;

      // Perform actions after successful payment
      console.log("Payment complete! Reference:", paymentDetails.reference);

      // Send a response to the client
      res.send("Payment complete! Reference: " + paymentDetails.reference);
    } else {
      // Handle failed verification
      console.log("Payment verification failed");
      res.status(400).send("Payment verification failed");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});