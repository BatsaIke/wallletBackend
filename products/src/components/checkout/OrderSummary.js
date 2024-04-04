import React from 'react';
import { useSelector } from 'react-redux';

import styles from './OrderSummary.module.css'; // CSS module for styling

const OrderSummary = () => {
    const subtotal = useSelector((state) => state.cart.totalPrice);
    let shippingFee= 30
const total = shippingFee + subtotal
  return (
    <div className={styles.orderSummaryContainer}>
      <h2 className={styles.orderHeader}>Order Summary</h2>
      <div className={styles.summaryItem}><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
      <div className={styles.summaryItem}><span>Shipping</span><span>TKS {shippingFee}</span></div>
      <div className={styles.total}><span>Total</span><span>TKS: {total.toFixed(2)}</span></div>
    </div>
  );
};

export default OrderSummary;