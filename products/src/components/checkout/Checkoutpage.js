import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './CheckoutPage.module.css'
import BillingDetails from './BillingDetails';
import OrderSummary from './OrderSummary';
import { makePayment } from "../../actions/paymentActions";


const CheckoutPage = () => {
  const dispatch = useDispatch();
  const [referece, setReferece] = useState();
  // const paymentStatus = useSelector((state) => state.payment.paymentStatus);
  // console.log(paymentStatus, "payment statu")

  useEffect(() => {
 const ref =   localStorage.getItem('pref')
 setReferece(ref)
  }, [dispatch]);

  console.log(referece, "referece")

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
