import api from '../api/api';

// Store our JWT in local storage and set axios headers if we do have a token

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['x-auth-token'] = token;
    localStorage.setItem('token', token);

    // Log the token when it is set
    console.log('Token set:', token);
  } else {
    delete api.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
  }
};

export default setAuthToken;
