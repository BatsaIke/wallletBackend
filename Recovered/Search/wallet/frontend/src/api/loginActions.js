// loginActions.js
import { setLoading } from '../redux/loginSlice';
import setAuthToken from '../utils/setAuthToken';
import { set_Alert } from './alertAction';
import api from './api';
import apiErrorHandler from '../utils/apiHandleError';

// login
export const loginActions = (userData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await api.post('auth/user/', userData);
    console.log('API Response:', response.data);

    // Handle success response
    const token = response.data.token;
    dispatch(set_Alert('Login Successful', 'success'));

    // Dispatch the action to set the token and update isAuthenticated
    dispatch(setAuthToken(token));

    // Show success alert and navigate to '/'
    dispatch(set_Alert('Login success', 'success',2000));

    // You can add additional logic or dispatch other actions based on success if needed

  } catch (error) {
    // Handle API error using the shared errorHandler
    apiErrorHandler(dispatch, error);
  } finally {
    dispatch(setLoading(false));
  }
};
