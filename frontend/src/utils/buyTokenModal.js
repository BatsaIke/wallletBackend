// BuyTokenModal.jsx

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../redux/modalSlice";
import { makePayment } from "../api/apiActions";
import { InputWithValidation } from "./inputValidation";

export const BuyTokenModal = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showValidation, setShowValidation] = useState(false); // State to control when to show validation errors
  const isModalOpen = useSelector((state) => state.modal);

  const { inputPlaceholder = "", buttonText = "" } = isModalOpen.body || "";

  const handleBuyNow = async () => {
    try {
      if (paymentMethod.trim() === "" || amount.trim() === "") {
        // If payment method or amount is missing, show validation error
        setShowValidation(true);
        setTimeout(() => setShowValidation(false), 3000);
        return;
      }

      const paymentData = {
        paymentMethod,
        amount,
      };

      await dispatch(makePayment(paymentData));
      dispatch(closeModal());
    } catch (error) {
      console.error("Error making payment:", error.message);
    }
  };

  const doubledAmount = amount ? (parseFloat(amount) * 10.0).toFixed(3) : null;

  // Options for the select element
  const paymentMethodOptions = [
    { value: "", label: "Select payment method", disabled: true },
    { value: "momo", label: "Mobile Money (MoMo)" },
    { value: "card", label: "Credit Card" },
  ];

  return (
    <>
      <InputWithValidation
        label="Select Payment Method:"
        value={paymentMethod}
        onChange={(value) => setPaymentMethod(value)}
        placeholder="Select payment method"
        options={paymentMethodOptions}
        errorMessage="Select payment method to continue"
        validate={showValidation}
        type="select"
      />
      <InputWithValidation
        label="Enter amount to buy:"
        value={amount}
        onChange={(value) => setAmount(value)}
        placeholder={inputPlaceholder}
        errorMessage="Enter amount to continue"
        validate={showValidation}
        type="number"
      />

      {doubledAmount && (
        <p style={{ color: "#094DC3" }}>
          The token equivalent is: <strong>{doubledAmount}Tks</strong>
        </p>
      )}

      <button className="button" onClick={handleBuyNow}>
        {buttonText}
      </button>
    </>
  );
};
