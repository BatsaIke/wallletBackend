import api from "../api";
import { setAffiliates, setLoading } from "../redux/slices/affiliateSlice";
import apiErrorHandler from "../utils/apiHandleError";


export const getAffiliates = (sortBy, sortOrder) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    let url = "/affiliate/get";
    if (sortBy && sortOrder) {
      url += `?sortBy=${sortBy}&sortOrder=${sortOrder}`;
    }
    const res = await api.get(url);
    dispatch(setAffiliates(res.data));
    return { success: true };
  } catch (error) {
    apiErrorHandler(dispatch, error);
  } finally {
    dispatch(setLoading(false));
  }
};


export const createAffiliate = (affiliateData) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
  let res=    await api.post("/affiliate/create", affiliateData);
      dispatch(setAffiliates(res.data));
      return { success: true };
    } catch (error) {
      apiErrorHandler(dispatch, error); 
      return { success: false };
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  export const getAffiliateById = (id) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await api.get(`/affiliate/get/${id}`);
      dispatch(setAffiliates(res.data));
      return { success: true };
    } catch (error) {
      apiErrorHandler(dispatch, error);
      return null;
    } finally {
      dispatch(setLoading(false));
    }
  };
