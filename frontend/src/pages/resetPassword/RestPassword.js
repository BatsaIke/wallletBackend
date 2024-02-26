// ResetPassword.js

import React, { useState } from 'react';
import './ResetPassword.css';
import api from '../../api/api';
import { set_Alert } from '../../api/alertAction';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';

const ResetPassword = () => {
  const dispatch =useDispatch()
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      // Make the API call to send the password reset email
      await api.post('password/request-password-reset', { email });
      // Handle the response, you can customize this based on your API
      dispatch(set_Alert("Password reset email sent: kindy check your email for confirmation","success",10000))
      dispatch(logout)
     // Dispatch the setLoggedOut action
      // Reset the form and state
      setEmail('');
      setError(null);
    } catch (error) {
      // Handle errors, such as displaying an error message to the user
      dispatch(set_Alert(error.response.data.message|| 'An error occurred',"danger"))
      setError(error.response.data.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='container'>
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <p>Enter your email to reset password</p>
      <form className="reset-password-form" onSubmit={handleSubmit}>
        <label htmlFor="email">User Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='input-field'
        />

        <button type="submit" disabled={isSubmitting} className='button'>
          Submit email
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
    </div>
  );
};

export default ResetPassword;
