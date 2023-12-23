import { set_Alert } from "./alertAction";
import api from "./api";
import handleApiError from  '../utils/apiHandleError'
import { setLoading } from "../redux/signupSlice";

// Async action using Redux Thunk for API call
export const signupActions = (userData) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.post('user/create-user', userData);
      console.log('API Response:', response.data);
  
      // Handle success response
      dispatch(set_Alert("Registrtion Successful", "successful"))
  
      // For example, you might dispatch an action like: dispatch(setSuccess(true));
  
    } catch (error) {
      handleApiError(dispatch, error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  