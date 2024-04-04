// CheckoutPage.js
import React from 'react';
import styles from './CheckoutPage.module.css'; // CSS module for styling
import BillingDetails from './BillingDetails';
import OrderSummary from './OrderSummary';

const CheckoutPage = () => {
  return (
    <div className={styles.checkoutPageContainer}>
      <div className={styles.billingSection}>
        <BillingDetails />
      </div>
      <div className={styles.orderSummarySection}>
        <OrderSummary />
      </div>
    </div>
  );
};

export default CheckoutPage;
