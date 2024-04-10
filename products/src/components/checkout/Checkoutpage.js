// // CheckoutPage.js
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import styles from "./CheckoutPage.module.css";
// import BillingDetails from "./BillingDetails";
// import OrderSummary from "./OrderSummary";
// import { checkPaymentStatus } from "../../actions/paymentActions";
// import PaymentSuccessModal from "./PaymentSuccessModal";

// const CheckoutPage = () => {
//   const dispatch = useDispatch();
//   const paymentState = useSelector((state) => state.payment.paymentStatus);
//   const isCallback = window.location.search.includes("callback=true"); 

//   useEffect(() => {
//     // Only check payment status if we're in a callback scenario
//     if (isCallback) {
//       dispatch(checkPaymentStatus());
//     }
//   }, [dispatch, isCallback]);

  
//   return (
//     <div className={styles.checkoutPageContainer}>
//       <div className={styles.billingSection}>
//         <BillingDetails />
//       </div>
//       <div className={styles.orderSummarySection}>
//         <OrderSummary />
//       </div>
//       {/* Conditional rendering based on paymentState.status */}
//       {isCallback && paymentState.status === 'success' && (
//         <PaymentSuccessModal />
//       )}
//     </div>
//   );
// };

// export default CheckoutPage;


// CheckoutPage.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CheckoutPage.module.css";
import BillingDetails from "./BillingDetails";
import OrderSummary from "./OrderSummary";
import { checkPaymentStatus } from "../../actions/paymentActions";
import PaymentSuccessModal from "./PaymentSuccessModal";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  
  const [orderData, setOrderData] = useState(null);

  const handleOrderDataCreated = (data) => {
    setOrderData(data); // Set the order data state
    console.log(data); // Log the order data for debugging
  };

  const paymentState = useSelector((state) => state.payment.paymentStatus);
  console.log(paymentState)
  const urlSearchParams = new URLSearchParams(window.location.search);
  const trxref = urlSearchParams.get("trxref");
  const isCallback = Boolean(trxref);

  

  useEffect(() => {
    if (isCallback) {
      // Retrieve the orderData from local storage
      const storedOrderData = localStorage.getItem('orderData');
      if (storedOrderData) {
        const parsedOrderData = JSON.parse(storedOrderData);
        setOrderData(parsedOrderData); // Update state with the retrieved order data
        console.log(parsedOrderData, "Retrieved order data");
      }
  
      dispatch(checkPaymentStatus());
    }
  }, [dispatch, isCallback]);
  

  const [isPaymentSuccessModalOpen, setPaymentSuccessModalOpen] = useState(false);

  useEffect(() => {
    if (paymentState === 'successful') {
      setPaymentSuccessModalOpen(true);
    }
  }, [paymentState]);

  
  return (
    <div className={styles.checkoutPageContainer}>
      <div className={styles.billingSection}>
        <BillingDetails onOrderDataCreated={handleOrderDataCreated}/>
      </div>
      <div className={styles.orderSummarySection}>
        <OrderSummary />
      </div>
      {/* Conditional rendering based on paymentState.status */}
      {isCallback && paymentState === 'successful' && (
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
