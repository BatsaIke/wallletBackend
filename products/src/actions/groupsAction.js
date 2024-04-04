import api from "../api";
import apiErrorHandler from "../utils/apiHandleError";
import { setGroups, addGroup, removeGroup,setLoading } from "../redux/slices/groupSlice"; 

// Action to get all groups
export const getAllGroups = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await api.get("/contacts/groups");
    dispatch(setGroups(response.data));
    return { success: true };
  } catch (error) {
    apiErrorHandler(dispatch, error);
    return { success: false };
  } finally {
    dispatch(setLoading(false));
  }
};

// Action to create a new group
export const createGroup = (groupData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await api.post("/contacts/groups", groupData);
    dispatch(addGroup(response.data));
    return { success: true, data: response.data };
  } catch (error) {
    apiErrorHandler(dispatch, error);
    return { success: false };
  } finally {
    dispatch(setLoading(false));
  }
};

// Action to delete a group
export const deleteGroup = (groupId) => async (dispatch) => {
  console.log(groupId)
  dispatch(setLoading(true));
  try {
    await api.delete(`/contacts/groups/${groupId}`);
    dispatch(removeGroup(groupId));
    return { success: true };
  } catch (error) {
    apiErrorHandler(dispatch, error);
    return { success: false };
  } finally {
    dispatch(setLoading(false));
  }
};
