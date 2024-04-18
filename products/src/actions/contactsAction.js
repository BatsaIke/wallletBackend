import api from "../api";
import { setLoading } from "../redux/slices/authSlice";
import { addContact, setContacts } from "../redux/slices/cantactSlice";
import apiErrorHandler from "../utils/apiHandleError";


// Action to get all contacts
export const getAllContacts = (groupId = null) => async (dispatch) => {
  dispatch(setLoading(true));
  try {

    const url = groupId ? `/contacts?groupId=${groupId}` : "/contacts";
    const response = await api.get(url);
    dispatch(setContacts(response.data)); // Update the state with the fetched contacts
    return { success: true };
  } catch (error) {
    apiErrorHandler(dispatch, error);
    return { success: false };
  } finally {
    dispatch(setLoading(false));
  }
};



// Action to create a new contact
export const createContact = (contactData, groupId = null) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // If there's a groupId, include it in the contactData
    if (groupId) {
      contactData.groupId = groupId;
    }

    const response = await api.post("/contacts", contactData);
    dispatch(addContact(response.data)); // Add the newly created contact to the state
    return { success: true, data: response.data };
  } catch (error) {
    apiErrorHandler(dispatch, error);
    return { success: false };
  } finally {
    dispatch(setLoading(false));
  }
};
