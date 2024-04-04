import api from "../api";
import { setLoading } from "../redux/slices/authSlice";
import { setError } from "../redux/slices/paymentSlice";
import apiErrorHandler from "../utils/apiHandleError";
import { payWithCard, payWithMomo } from "../utils/payWithMomoorCard";


export const verifyPayment = async (paymentReference) => {
  try {
    const response = await api.get(`/payment/verify/${paymentReference}`);
    console.log('Payment verification response:', response.data);
    if (response.status === 200 && response.data.success) {
      // Assuming payment verification was successful
      return { success: true, data: response.data };
    } else {
      // Verification failed or was not conclusive
      return { success: false, message: 'Payment verification failed.' };
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    return { success: false, message: error.message };
  }
};

export const payToken = (paymentData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await api.post('/payment/pay', paymentData);
    if (response.status === 200) {
      const authorizationUrl = response.data.response.data.authorization_url;
      window.open(authorizationUrl, '_self');
      // Optionally, after opening the authorization URL,
      // you could verify the payment by calling verifyPayment function with the payment reference.
      // const verificationResult = await verifyPayment(paymentReference);
      // if (verificationResult.success) {
      //   // Handle successful verification
      // } else {
      //   // Handle failed verification
      //   dispatch(setError(verificationResult.message));
      // }
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



export const makePayment = (paymentData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await api.post('/payment/guest-payment', paymentData);
    if (response.status === 200) {
      console.log(response,"in PAYMENT ACTIONS");
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


