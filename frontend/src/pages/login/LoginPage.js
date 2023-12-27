// LoginPage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmailPhone, setPassword, setLoading, setError, setToken, resetLogin } from '../../redux/loginSlice';
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css';
import { loginActions } from '../../api/loginActions';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.login);

  const handleSubmit = async () => {
    dispatch(setLoading(true));

    const userData = {
      text: loginState.emailPhone,
      password: loginState.password,
    };

    try {
      await dispatch(loginActions(userData));

      if (loginState.isAuthenticated) {
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <div className='container'>
        <div className="login-container">
          <input
            type="text"
            placeholder="Email or Phone Number"
            value={loginState.emailPhone}
            onChange={(e) => dispatch(setEmailPhone(e.target.value))}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={loginState.password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
            className="input-field"
          />

          <button onClick={handleSubmit} className="button">
            Login
          </button>

          <p>
            <Link to="/reset">Forgot Password?</Link>
          </p>

          <p>
            Don't have an account? <Link to="/signup">Signup here</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
