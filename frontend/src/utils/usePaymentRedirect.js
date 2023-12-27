import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const usePaymentRedirect = (authorizationUrl) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) {
        return;
      }

      const { paymentVerification } = event.data;

      if (paymentVerification) {
        // Make a GET call to verify the payment
        verifyPayment().then((verification) => {
          console.log(verification);

          // Return to the payment page
          navigate('/'); 
        });
      }

      // Remove the event listener after handling the response
      window.removeEventListener('message', handleMessage);
    };

    window.addEventListener('message', handleMessage);

    return () => {
      // Cleanup: Remove the event listener when the component unmounts
      window.removeEventListener('message', handleMessage);
    };
  }, [navigate]);

  // Redirect the user to the authorization URL
  window.location.href = authorizationUrl;
};

// Use this hook in your functional component
export const BuyTokenModal = () => {
  // ...

  const handleBuyNow = async () => {
    // ...

    if (status) {
      // Authorization URL created
      const { authorization_url } = response.data.response.data;

      // Use the custom hook for payment redirection and verification
      usePaymentRedirect(authorization_url);
    } else {
      // Handle other cases (e.g., show an error message)
      dispatch(set_Alert(message, 'error', 2000));
      dispatch(setLoading(false));
    }
  };

 
};
