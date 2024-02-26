// ResetPasswordComponent.js

import React, { useState } from "react";
import api from "../../api/api";
import "./ResetPassword.css";
import { useNavigate, useParams } from "react-router";
import { set_Alert } from "../../api/alertAction";
import { useDispatch } from "react-redux";

const ResetPasswordComponent = ({ match }) => {
    const dispatch = useDispatch()
  const navigate = useNavigate();
  const { id: resetToken } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      setIsSubmitting(true);

      // Make the API call to reset the password
       await api.post("password/reset-password", {
        resetToken,
        newPassword: password,
      });

      // Handle the response, you can customize this based on your API
      dispatch(set_Alert("Password reset successful","success"));
     (navigate("/login"))

      // Reset the form and state
      setPassword("");
      setConfirmPassword("");
      setError(null);
    } catch (error) {
      // Handle errors, such as displaying an error message to the user
      dispatch(set_Alert(`Password reset failed ${error.response.data}`,"danger"));
      setError(error.response.data.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='container'>
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <form className="reset-password-form" onSubmit={handleSubmit}>
        <label htmlFor="password">New Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input-field"
        />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="input-field"
        />

        <button type="submit" disabled={isSubmitting} className="button">
          Reset Password
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
    </div>
  );
};

export default ResetPasswordComponent;
