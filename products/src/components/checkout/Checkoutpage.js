import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './CheckoutPage.module.css';
import BillingDetails from './BillingDetails';
import OrderSummary from './OrderSummary';
import { checkPaymentStatus } from '../../actions/paymentActions';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const paymentState = useSelector((state) => state.payment);
  console.log(paymentState, "payment status");

  useEffect(() => {
   dispatch(checkPaymentStatus)
  }, [dispatch]);
console.log("HElloo checko")
  return (
    <div className={styles.checkoutPageContainer}>
      <div className={styles.billingSection}>
        <BillingDetails />
      </div>
      <div className={styles.orderSummarySection}>
        <OrderSummary />
      </div>
      {/* Display payment status or other related information */}
      {paymentState.status && <div>Payment Status: {paymentState.status}</div>}
    </div>
  );
};

export default CheckoutPage;
