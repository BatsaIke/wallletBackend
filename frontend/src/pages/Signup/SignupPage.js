import React, {  useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupActions } from '../../api/signupActions';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
  });

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async() => {
    const userData = {
      name: formData.username,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
    };

try {
  const result = await dispatch(signupActions(userData));
    if (result.success) {
      navigate('/login'); 
    }
} catch (error) {
  
}
  
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
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
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
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="input-field"
          />

          <button onClick={handleSubmit} className="button">
            Sign Up
          </button>
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
