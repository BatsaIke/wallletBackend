// apiActions.js
import { setLoggedOut, resetLogout } from '../redux/logoutSlice'; // Adjust the path based on your project structure
import api from './api';
import { set_Alert } from './alertAction';
 import handleApiError from '../utils/apiHandleError'


import { setError, setLoading, setUser } from '../redux/userSlice';


// Load user data function
export const loadUser = () => async (dispatch) => {
  try {
    // Make an API call to get user data
    const response = await api.get('/auth/user'); // Adjust the API endpoint as needed
    const userData = response.data; // Assuming the user data is available in the response

    console.log(userData)
    // Dispatch the action to set the user data
    dispatch(setUser(userData));

  } catch (error) {
    // Handle API error
    console.error('Error loading user:', error.message);
    dispatch(setError('Error loading user data'));
  }
};









// load user

// logout
// logoutActions.js

// Action creator for setting the logged-out state
export const setLoggedOutAction = () => (dispatch) => {
  dispatch(setLoggedOut());
};

// Action creator for resetting the logged-out state
export const resetLogoutAction = () => (dispatch) => {
  dispatch(resetLogout());
};
