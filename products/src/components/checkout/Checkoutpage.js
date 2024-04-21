// CheckoutPage.js
import React, { useEffect, useState } from "react";
import useOrderManager from "./OrderManager";
import styles from "./CheckoutPage.module.css";
import BillingDetails from "./BillingDetails";
import OrderSummary from "./OrderSummary";
import PaymentSuccessModal from "./PaymentSuccessModal";

const CheckoutPage = () => {
  const { verifyAndCreateOrder } = useOrderManager();
  const [isPaymentSuccessModalOpen, setPaymentSuccessModalOpen] = useState(false);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const callbackReference = urlSearchParams.get("reference");
    const storedReference = localStorage.getItem('reference');
    const storedOrderData = JSON.parse(localStorage.getItem('orderData'));

    verifyAndCreateOrder(callbackReference, storedReference, storedOrderData).then(success => {
      if (success) {
        setPaymentSuccessModalOpen(true);
      }
    });
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
