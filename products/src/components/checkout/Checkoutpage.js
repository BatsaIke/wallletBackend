


// CheckoutPage.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CheckoutPage.module.css";
import BillingDetails from "./BillingDetails";
import OrderSummary from "./OrderSummary";
import {  verifyPayment } from "../../actions/paymentActions";
import PaymentSuccessModal from "./PaymentSuccessModal";
import { createOrder } from "../../actions/orderActions";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  

  const paymentState = useSelector((state) => state.payment.paymentStatus);
  console.log(paymentState)

  const urlSearchParams = new URLSearchParams(window.location.search);
  const reference = urlSearchParams.get("reference");

 const [isPaymentSuccessModalOpen, setPaymentSuccessModalOpen] = useState(false);

  

 useEffect(() => {
  const verifyAndCreateOrder = async () => {
    if (reference) {
      const verifyResult = await dispatch(verifyPayment(reference));
      console.log(verifyResult)
      if (verifyResult.success === true) {
        // Retrieve the orderData from local storage
        const storedOrderData = JSON.parse(localStorage.getItem('orderData'));
        if (storedOrderData) {
          const orderResult = await dispatch(createOrder(storedOrderData));
          if (orderResult.success) {
            setPaymentSuccessModalOpen(true); 
          }
        }
      }
    }
  };

  verifyAndCreateOrder();
}, [dispatch, reference]);
  


  useEffect(() => {
    if (paymentState === 'successful') {
      setPaymentSuccessModalOpen(true);
    }
  }, [paymentState]);

  
  return (
    <div className={styles.checkoutPageContainer}>
      <div className={styles.billingSection}>
        <BillingDetails />
      </div>
      <div className={styles.orderSummarySection}>
        <OrderSummary />
      </div>

      {/* Conditional rendering based on payment success status */}
      {isPaymentSuccessModalOpen && (
        <PaymentSuccessModal
          isOpen={isPaymentSuccessModalOpen}
          onClose={() => setPaymentSuccessModalOpen(false)}
          className={styles.paymentModal}
        />
      )}
    </div>
  );
};

export default CheckoutPage;
