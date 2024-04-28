import api from "../api";
import { setContact, setContacts, setLoading } from "../redux/slices/contactSlice";
import apiErrorHandler from "../utils/apiHandleError";

export const getContacts = (sortBy, sortOrder) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    let url = "/contact/get";
    if (sortBy && sortOrder) {
      url += `?sortBy=${sortBy}&sortOrder=${sortOrder}`;
    }
    const res = await api.get(url);
    dispatch(setContacts(res.data));
  } catch (error) {
    apiErrorHandler(dispatch, error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const createContact = (contactData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await api.post("/contact/create", contactData);
    // Fetch updated list of contacts after creating a new one
  
    // dispatch(setContacts(res.data)); // Update contacts list in the store
    return { success: true };
  } catch (error) {
    apiErrorHandler(dispatch, error);
    return { success: false };
  } finally {
    dispatch(setLoading(false));
  }
};


export const getContactById = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await api.get(`/contact/get/${id}`);
    console.log(res.data,"contact")
    dispatch(setContact(res.data)); 
    return res.data;
  } catch (error) {
    apiErrorHandler(dispatch, error);
    return null;
  } finally {
    dispatch(setLoading(false));
  }
};
