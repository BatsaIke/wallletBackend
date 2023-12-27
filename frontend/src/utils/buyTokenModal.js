import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../redux/modalSlice";
import { makePayment } from "../api/apiActions";

export const BuyTokenModal = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const isModalOpen = useSelector((state) => state.modal);

  // Destructure with default values to handle null case
  const { inputPlaceholder = "", buttonText = "" } = isModalOpen.body || {};

  const handleBuyNow = async () => {
    try {
      const paymentData = {
        paymentMethod,
        amount,
      };
      console.log(paymentData);
      // Dispatch the makePayment action with the payment data
      await dispatch(makePayment(paymentData));

      // Close the modal after a successful payment
      dispatch(closeModal());
    } catch (error) {
      console.error("Error making payment:", error.message);
    }
  };

  return (
    <>
      <p>Select Pament Method:</p>
      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="input-field"
        required
      >
        <option value="" disabled>
          Select payment method
        </option>
        <option value="momo">Mobile Money (MoMo)</option>
        <option value="card">Credit Card</option>
      </select>
      <p>Enter amount to buy:</p>

      <input
        type="number"
        placeholder={inputPlaceholder}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="input-field"
        required
      />
      <button className="button" onClick={handleBuyNow}>
        {buttonText}
      </button>
    </>
  );
};
