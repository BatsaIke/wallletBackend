import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './CheckoutPage.module.css'
import BillingDetails from './BillingDetails';
import OrderSummary from './OrderSummary';
import { makePayment } from "../../actions/paymentActions";


const CheckoutPage = () => {
  const dispatch = useDispatch();
  const paymentStatus = useSelector((state) => state.payment.paymentStatus);
  console.log(paymentStatus, "payment statu")

  // useEffect(() => {
  //   // Assuming you have a way to retrieve the payment reference, for example:
  //   const paymentReference = ""
  //   if (paymentReference) {
  //     dispatch(paymentStatus(paymentReference));
  //   }
  // }, [dispatch]);

  return (
    <div className={styles.checkoutPageContainer}>
      <div className={styles.billingSection}>
        <BillingDetails makePayment= {makePayment}/>
      </div>
      <div className={styles.orderSummarySection}>
        <OrderSummary />
      </div>
    </div>
  );
};

export default CheckoutPage;
