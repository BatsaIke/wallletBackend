// apiActions.js
import { setLoggedOut, resetLogout } from '../redux/logoutSlice'; // Adjust the path based on your project structure
import api from './api';
import { set_Alert } from './alertAction';
 import handleApiError from '../utils/apiHandleError'
 import { useNavigate } from 'react-router-dom';


import { setError, setLoading, setPaymentData, setUser } from '../redux/userSlice';


// Load user data function
export const loadUser = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // Make an API call to get user data
    const response = await api.get('/auth/user'); // Adjust the API endpoint as needed
    const userData = response.data; // Assuming the user data is available in the response

    console.log(userData)
    // Dispatch the action to set the user data
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



// Action creator for setting the logged-out state
export const setLoggedOutAction = () => (dispatch) => {
  dispatch(setLoggedOut());
};

// Action creator for resetting the logged-out state
export const resetLogoutAction = () => (dispatch) => {
  dispatch(resetLogout());
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
      const paymentWindow =  window.open(authorizationUrl, '_self');
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
