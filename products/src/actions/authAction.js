import api from "../api";
import { setError, setLoading, setToken, setUser } from "../redux/slices/authSlice";
import apiErrorHandler from "../utils/apiHandleError";
import setAuthToken from "../utils/setAuthToken";

//get login user
export const getLoginUser = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await api.get("/auth/user");
    dispatch(setUser(res))
    dispatch(setLoading(false))
  } catch (error) {
    apiErrorHandler(dispatch, error);
    return { success: false };
  } finally {
    dispatch(setLoading(false));
  }
};



// login
export const loginUser = (userData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await api.post("/auth/user", userData);
    // Handle success response
    const token = response.data.token;
    // Dispatch the action to set the token and update isAuthenticated
    dispatch(setToken(token));
    setAuthToken(token);
   dispatch(getLoginUser())
    return { success: true };
  } catch (error) {
    // Handle API error using the shared errorHandler
    apiErrorHandler(dispatch, error);
   dispatch(setError(error))
    return { success: false };
  } finally {
    dispatch(setLoading(false));
  }
};

// Async action using Redux Thunk for API call
export const signupActions = (userData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await api.post("user/create-user", userData);
    return { success: true };
  } catch (error) {
    apiErrorHandler(dispatch, error);
    return { success: false };
  } finally {
    dispatch(setLoading(false));
  }
};


// Assume api is an instance of axios or a similar HTTP client
export const updateUserProfile = (userId, editedData) => async (dispatch) => {
  console.log(userId)
  setLoading(true);
  try {
    await api.put(`/user/update-user/${userId}`, editedData);
    return { success: true };
    // Dispatch any action or handle the response as needed
  } catch (error) {
    apiErrorHandler(dispatch, error);
    return { success: false };
  } finally {
    dispatch(setLoading(false));
  }
};


