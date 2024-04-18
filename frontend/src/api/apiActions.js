// apiActions.js
import api from './api';
 import handleApiError from '../utils/apiHandleError'


import { setError, setLoading, setUser } from '../redux/authSlice';


// Load user data function
export const loadUser = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // Make an API call to get user data
    const response = await api.get('/auth/user'); // Adjust the API endpoint as needed
    const userData = response.data; // Assuming the user data is available in the response
    dispatch(setUser(userData));
    dispatch(setLoading(false));
    

  } catch (error) {
    // Handle API error
    console.error('Error loading user:', error.message);
    dispatch(setError('Error loading user data'));
  }
};

// Assume api is an instance of axios or a similar HTTP client
export const updateUserProfile = (userId, editedData) => async (dispatch) => {
  setLoading(true);
  try {
    const response = await api.put(`/user/update-user/${userId}`, editedData);
    console.log(response.data);
    // Dispatch any action or handle the response as needed
  } catch (error) {
    console.error('Error updating user profile:', error.message);
    dispatch(setError('Error updating user profile'));
  } finally {
    setLoading(false);
  }
};





// Function to make a GET call to verify the payment
export const verifyPayment = async () => {
  try {
    const response = await api.get('/payment/verify');
    // Handle the response as needed
    console.log('Payment verification response:', response.data);
  } catch (error) {
    console.error('Error verifying payment:', error.message);
    // Handle the error
  }
};

export const makePayment = (paymentData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    // Make an API call to make the payment
    const response = await api.post('/payment/pay', paymentData);
    // Check if the payment was successful
    if ( response.status === 200) {
      // Payment successful, open the authorization URL in a new window
      const authorizationUrl = response.data.response.data.authorization_url
      console.log(response.data.response.data.authorization_url
        );
        window.open(authorizationUrl, '_self');
      dispatch(setError('Payment was not successful'));
    }
  } catch (error) {
    console.error('Error making payment:', error.message);
    dispatch(setError('Error making payment'));
    handleApiError(error, dispatch);
  } finally {
    // Set loading to false after completing the payment process
    dispatch(setLoading(false));
  }
};
