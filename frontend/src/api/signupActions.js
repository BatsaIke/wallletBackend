import api from "./api";
import handleApiError from  '../utils/apiHandleError'
import { setLoading } from "../redux/authSlice";
import { set_Alert } from "./alertAction";


// Async action using Redux Thunk for API call
export const signupActions = (userData) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
       await api.post('user/create-user', userData);
      dispatch(set_Alert('Signup Successful', 'success', 2000));
      return { success: true };
    } catch (error) {
      handleApiError(dispatch, error);
      return { success: false }
    } finally {
      dispatch(setLoading(false));
    }
  };
  