import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"; // Import useDispatch if using Redux
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css"; // Path to your CSS module for the login page
import { loginUser } from "../../actions/authAction";
import { set_Alert } from "../../actions/alertAction";

const LoginPage = () => {
  const [text, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const nagigate = useNavigate();

  const { user,} = useSelector((state) => state.auth);
  console.log(user)
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let status = await dispatch(loginUser({ text, password }));
      if (status.success === true) {
        dispatch(set_Alert("Login successful", "success"));
        nagigate("/");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="text">Email</label>
          <input
            type="text"
            id="text"
            value={text}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.loginButton}>
          Sign In
        </button>
        <Link to="/forgot-password" className={styles.forgotPasswordLink}>
          Forgotten password?
        </Link>
        <p className={styles.signupPrompt}>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
