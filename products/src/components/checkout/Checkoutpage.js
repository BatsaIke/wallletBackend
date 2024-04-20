// CheckoutPage.js
import React, { useEffect, useState } from "react";
import useOrderManager from "./OrderManager";  // Import the custom hook
import styles from "./CheckoutPage.module.css";
import BillingDetails from "./BillingDetails";
import OrderSummary from "./OrderSummary";
import PaymentSuccessModal from "./PaymentSuccessModal";

const CheckoutPage = () => {
  const { verifyAndCreateOrder } = useOrderManager();
  const [isPaymentSuccessModalOpen, setPaymentSuccessModalOpen] = useState(false);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const callBackreference = urlSearchParams.get("reference");
    const storedOrderData = JSON.parse(localStorage.getItem('orderData'));
    const reference = localStorage.getItem('reference');

    if (reference || storedOrderData) {
      verifyAndCreateOrder(callBackreference,reference, storedOrderData).then(success => {
        if (success) {
          setPaymentSuccessModalOpen(true);
        }
      });
    }
  }, []);

  return (
    <div className={styles.checkoutPageContainer}>
      <div className={styles.billingSection}>
        <BillingDetails />
      </div>
      <div className={styles.orderSummarySection}>
        <OrderSummary />
      </div>

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
