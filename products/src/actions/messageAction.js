import api from "../api";
import { addMessage, setAllMessageStatuses, setError, setLoading, setMessageStatus } from "../redux/slices/messageSlice";
import apiErrorHandler from "../utils/apiHandleError";

// Action to send a new message
export const sendMessage = (messageData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await api.post("/message", messageData);
    dispatch(addMessage(response.data)); 
    return { success: true, data: response.data };
  } catch (error) {
    apiErrorHandler(dispatch, error);
    return { success: false };
  } finally {
    dispatch(setLoading(false));
  }
};

// Action to fetch SMS status
export const fetchMessageStatus = (messageId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await api.get(`/message/${messageId}`);
    dispatch(setMessageStatus(response.data)); // Update the message status in the state
    return { success: true, data: response.data };
  } catch (error) {
    apiErrorHandler(dispatch, error);
    return { success: false };
  } finally {
    dispatch(setLoading(false));
  }
};


export const fetchAllMessageStatuses = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await api.get("/message"); 
    dispatch(setAllMessageStatuses(response.data)); 
    return { success: true, data: response.data };
  } catch (error) {
    apiErrorHandler(dispatch, error);
    return { success: false };
  } finally {
    dispatch(setLoading(false));
  }
};