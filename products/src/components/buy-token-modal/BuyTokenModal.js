import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./BuyTokenModal.module.css"; // Ensure this path is correct

export const BuyTokenModal = ({email,makePayment}) => {
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("");
  const totalAmount = useSelector((state) => state.cart.totalPrice);

  // Token equivalent calculation
  const doubledAmount = totalAmount ? (parseFloat(totalAmount) * 10.0).toFixed(3) : null;

  const handleBuyNow = async () => {
    if (!totalAmount || !paymentMethod) {
    //   alert("Please fill all fields");
      return;
    }

    const paymentData = {
      paymentMethod,
      amount:totalAmount,
      email,
    };

    // Dispatch the makePayment action with paymentData
    dispatch(makePayment(paymentData));
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.inputGroup}>
        <label htmlFor="paymentMethod">Select Payment Method:</label>
        <select
          id="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className={styles.selectInput}
        >
          <option value="" disabled>Select payment method</option>
          <option value="momo">Mobile Money (MoMo)</option>
          <option value="card">Credit Card</option>
        </select>
      </div>


      {doubledAmount && (
        <p className={styles.tokenEquivalent}>
           <strong>{doubledAmount} Tks</strong> = ₵{totalAmount} 
        </p>
      )}
      <button className={styles.buyNowButton} onClick={handleBuyNow}>Pay Now</button>
    </div>
  );
};
