import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./BuyTokenModal.module.css"; // Ensure this path is correct
import { useForm } from "react-hook-form";
import { makePayment } from "../../actions/paymentActions";
import Spinner from "../../UI/Spinner";

export const BuyTokenModal = ({ email }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const totalIncludingShipping = useSelector((state) => state.cart.totalIncludingShipping);

  const loading = useSelector((state) => state.payment.loading);


  const doubledAmount = totalIncludingShipping ? (parseFloat(totalIncludingShipping) * 1.0).toFixed(1) : null;

  const onFormSubmit = (data) => {
    if (!totalIncludingShipping) {
      alert("Invalid total amount!");
      return;
    }

    const paymentData = {
      paymentMethod: data.paymentMethod,
      amount: totalIncludingShipping,
      email,
    };

    dispatch(makePayment(paymentData));
  };

  console.log(loading,"LOaind")

  if (loading) {
    return <Spinner/>;
  }
  

  return (
    <div className={styles.modalContainer}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className={styles.inputGroup}>
          <label htmlFor="paymentMethod">Select Payment Method:</label>
          <select
            id="paymentMethod"
            {...register("paymentMethod", {
              required: "Payment method is required"
            })}
            className={styles.selectInput}
          >
            <option value="">Select payment method</option>
            <option value="momo">Mobile Money (MoMo)</option>
            <option value="card">Credit Card</option>
          </select>
          {errors.paymentMethod && <p className={styles.error}>{errors.paymentMethod.message}</p>}
        </div>

        {doubledAmount && (
          <p className={styles.tokenEquivalent}>
            <strong>{doubledAmount} Tks</strong> = ₵{totalIncludingShipping}
          </p>
        )}

        <button type="submit" className={styles.buyNowButton}>
          Pay Now
        </button>
      </form>
    </div>
  );
};
