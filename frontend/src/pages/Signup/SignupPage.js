// SignupPage.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { set_Alert, signupActions } from '../../api/signupActions';
import { setUsername, setEmail, setPassword, setPhone } from '../../redux/signupSlice';
import '../../App.css'; // Import the CSS file
import { Link } from 'react-router-dom';

const SignupPage = () => {
  const dispatch = useDispatch();
  const signupState = useSelector((state) => state.signup);

  const handleSubmit = () => {
    // Get data from signupState or any other source
    const userData = {
      name: signupState.username,
      email: signupState.email,
      password: signupState.password,
      phone: signupState.phone,
    };

    dispatch(signupActions(userData));
    console.log(userData);
  };

  return (
    <>
    
      <div className='container'>
        <div className="signup-container">
          <h2>Welcome!</h2>
          <p>Create an account to get started.</p>

          <input
            type="text"
            placeholder="Username"
            value={signupState.username}
            onChange={(e) => dispatch(setUsername(e.target.value))}
            className="input-field"
          />
          <input
            type="email"
            placeholder="Email"
            value={signupState.email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={signupState.password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
            className="input-field"
          />

          <input
            type="text"
            placeholder="Phone"
            value={signupState.phone}
            onChange={(e) => dispatch(setPhone(e.target.value))}
            className="input-field"
          />
          <button onClick={handleSubmit} className="button">
            Sign Up
          </button>
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
          
          {/* Add loading and error handling UI based on signupState.loading and signupState.error */}
        </div>
      </div>
    </>
  );
};

export default SignupPage;
