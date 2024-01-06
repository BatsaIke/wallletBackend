import axios from 'axios';
import store from '../redux';
import { setLoggedOut } from '../redux/logoutSlice';

// Create an instance of axios
const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1/', // Remove the extra '/' at the beginning
  headers: {
    'Content-Type': 'application/json'
  }
});

/*
  NOTE: Intercept any error responses from the API
  and check if the token is no longer valid.
  ie. Token has expired or the user is no longer
  authenticated.
  Logout the user if the token has expired.
*/

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      store.dispatch(setLoggedOut()); // Fix the dispatch to use setLoggedOut action
    }
    return Promise.reject(err);
  }
);

export default api;
