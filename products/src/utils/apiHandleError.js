// apiErrorHandler.js

import { set_Alert } from "../actions/alertAction";

// Reusable function for handling API errors and dispatching alert messages
const apiErrorHandler = (dispatch, error) => {
  console.error('Error:', error.message);
  // Handle error
  const errorMessages = error.response?.data?.errors || [];
  errorMessages.forEach((errorObj) => {
    const errorMessage = `Error: ${errorObj.msg}`;
    dispatch(set_Alert(errorMessage, 'danger'));
  });
};

export default apiErrorHandler;
