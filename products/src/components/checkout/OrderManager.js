// OrderManager.js
import { useDispatch } from 'react-redux';
import {  verifyPayment } from "../../actions/paymentActions";
import { createOrder } from "../../actions/orderActions";

const useOrderManager = () => {
    const dispatch = useDispatch();
  
    const verifyAndCreateOrder = async (reference,callBackreference, storedOrderData) => {
      if (reference) {
        const verifyResult = await dispatch(verifyPayment(callBackreference));
        console.log('Verification result:', verifyResult);
        if (verifyResult.success) {
          if (storedOrderData) {
            const orderResult = await dispatch(createOrder(storedOrderData));
            if (orderResult.success) {
              localStorage.removeItem('orderData');  // Clear order data on success
              localStorage.removeItem('reference');
              return true;
            }
          }
        } else if (storedOrderData) { // Additional check if initial verification fails
          const verifyUsingStoredRef = await dispatch(verifyPayment(reference));
          if (verifyUsingStoredRef.success) {
            const orderResult = await dispatch(createOrder(storedOrderData));
            if (orderResult.success) {
              localStorage.removeItem('orderData');
              localStorage.removeItem('reference');
              return true;
            }
          }
        }
      }
      return false;
    };
  
    return { verifyAndCreateOrder };
  };
  
  export default useOrderManager;