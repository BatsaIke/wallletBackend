import api from "../api";
import { setLoading } from "../redux/slices/authSlice";
import { setError, setPaymentStatus } from "../redux/slices/paymentSlice";
import apiErrorHandler from "../utils/apiHandleError";




export const payToken = (paymentData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await api.post('/payment/pay', paymentData);
    if (response.status === 200) {
      const authorizationUrl = response.data.response.data.authorization_url;
      window.open(authorizationUrl, '_self');
      return { success: true };
    } else {
      dispatch(setError('Payment was not successful'));
      return { success: false, message: 'Payment was not successful' };
    }
  } catch (error) {
    console.error('Error making payment:', error);
    dispatch(setError('Error making payment'));
    apiErrorHandler(error, dispatch);
    return { success: false, message: error.message };
  } finally {
    dispatch(setLoading(false));
  }
};

export const paymentStatus = (paymentData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await api.post('/payment/status', paymentData);
   
    console.log(response)
     return response
    
  } catch (error) {
    console.error('Error verifying:', error);
    dispatch(setError('Error making payment'));
    apiErrorHandler(error, dispatch);
    return { success: false, message: error.message };
  } finally {
    dispatch(setLoading(false));
  }
};

export const makePayment = (paymentData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await api.post('/payment/guest-payment', paymentData);
    if (response.status === 200) {
      const reference = response.data.response.data.reference;
      dispatch(setPaymentStatus(reference));
      const authorizationUrl = response.data.response.data.authorization_url;
      window.open(authorizationUrl, '_self');
    }
  } catch (error) {
    console.error('Error making payment:', error);
    dispatch(setError('Error making payment'));
    // Handle the error, potentially with apiErrorHandler
  } finally {
    dispatch(setLoading(false));
  }
};






// export const makePayment = (paymentData) => async (dispatch) => {
//     console.log(paymentData);
//     const { email, paymentMethod, amount } = paymentData; 
//     dispatch(setLoading(true));
  
//     try {
//       let paymentResult;
  
//       switch (paymentMethod) {
//         case "momo":
//           paymentResult = await payWithMomo(email, amount);
//           break;
//         case "card":
//           paymentResult = await payWithCard(email, amount);
//           break;
//         default:
//           dispatch(setError("Invalid payment method"));
//           return { success: false, message: "Invalid payment method" };
//       }
  
//       if (!paymentResult || !paymentResult.success) {
//         dispatch(setError(paymentResult.message || "Payment failed"));
//         return { success: false, message: paymentResult.message || "Payment failed" };
//       }
  
//       // Assuming paymentResult contains the URL to redirect the user for payment
//     //   if (paymentResult.url) {
//     //     window.location.href = paymentResult.url; // Redirect user to payment page
//     //   }
//   console.log(paymentResult);
//       return { success: true, ...paymentResult };
  
//     } catch (error) {
//       console.error("Error making payment:", error);
//       dispatch(setError('Error making payment'));
//       // It seems like apiErrorHandler is meant to handle dispatching the error state,
//       // Ensure it is implemented correctly or replace it with direct dispatch(setError(...)) if necessary.
//       // apiErrorHandler(error, dispatch);
//       return { success: false, message: "Error making payment" };
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };
  


// export const makePayment =(paymentData) => async (dispatch) => {
//   const { email, paymentMethod, amount } = paymentData; // Destructure data
// dispatch(setLoading(true));
//   try {
//     let paymentResult;
//     if (paymentMethod === "momo") {
//       paymentResult = await payWithMomo(email, amount);
//     } else if (paymentMethod === "card") {
//       paymentResult = await payWithCard(email, amount);
//     } else {
//       return { success: false, message: "Invalid payment method" };
//     }

//     return { success: true, ...paymentResult }; 

//   } catch (error) {
//     console.error("Error making payment:", error);
//     dispatch(setError('Error making payment'));
//     apiErrorHandler(error, dispatch);
//     return { success: false, message: "Error making payment" };
//   }
// };


