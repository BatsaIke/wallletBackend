import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css';
import { loginActions } from '../../api/loginActions';
import { set_Alert } from '../../api/alertAction';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    emailPhone: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loginState.isAuthenticated) {
      set_Alert('Login Successful', 'success', 2000);
      navigate('/');
    }
  }, [loginState.isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const userData = {
      text: formData.emailPhone,
      password: formData.password,
    };

    try {
      // Dispatch the login action here
      await dispatch(loginActions(userData));
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="login-container">
          <h2>Welcome!</h2>
          <p>Kindly login to continue.</p>

          <input
            type="text"
            placeholder="Email or Phone Number"
            name="emailPhone"
            value={formData.emailPhone}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input-field"
          />

          <button onClick={handleSubmit} className="button" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
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
