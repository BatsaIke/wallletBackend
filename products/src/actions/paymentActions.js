import api from "../api";
import { setLoading } from "../redux/slices/authSlice";
import { setError, setPaymentStatus } from "../redux/slices/paymentSlice";
import apiErrorHandler from "../utils/apiHandleError";




export const payToken = (paymentData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await api.post('/payment/pay', paymentData);
    if (response.status === 200) {
      console.log(response)
     await response.data.response.data.authorization_url;
      // window.open(authorizationUrl, '_self');
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

export const checkPaymentStatus = () => async (dispatch) => {
  dispatch(setLoading(true));
  const sessionID = localStorage.getItem('payment');
  try {
    // Assuming your API expects a POST request. For a GET request, the approach will differ.
    const response = await api.post(`/payment/status/${sessionID}`);
    dispatch(setPaymentStatus(response.data)); // Assuming you have a reducer action for this
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error verifying:', error);
    dispatch(setError('Error verifying payment'));
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
      const { authorization_url: authorizationUrl } = response.data.response.data;
      const sessionID = response.data.sessionID
      localStorage.setItem('payment', sessionID)
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


export const verifyPayment = (reference) => async (dispatch) => {
  dispatch(setLoading(true));
  
  try {
    // Perform a GET request to your server endpoint that verifies the payment
    const response = await api.get(`/payment/verify?reference=${reference}`);
    console.log(response)

    // Handle response based on your application's needs
    if (response.status === 200 && response.data.details.status === "success") {
      dispatch(setPaymentStatus({
        status: 'verified',
        details: response.data.details
      }));
      return { success: true, data: response.data };
    } else {
      dispatch(setPaymentStatus({
        status: 'failed',
        message: response.data.message
      }));
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    dispatch(setError('Error verifying payment'));
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


