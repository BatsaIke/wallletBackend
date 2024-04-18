import { setLoading, setToken } from '../redux/authSlice';
import setAuthToken from '../utils/setAuthToken';
import api from './api';
import apiErrorHandler from '../utils/apiHandleError';

// login
export const loginActions = (userData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await api.post('/auth/user', userData);
    // Handle success response
    const token = response.data.token;

    // Dispatch the action to set the token and update isAuthenticated
    dispatch(setToken(token));
    setAuthToken(token);

  } catch (error) {
    // Handle API error using the shared errorHandler
    apiErrorHandler(dispatch, error);
  } finally {
    dispatch(setLoading(false));
  }
};

// Note: Do not use useNavigate here; it should be used in functional components.
