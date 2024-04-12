import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignupPage.module.css"; // Path to your CSS module for the signup page
import { signupActions } from "../../actions/authAction";
import { set_Alert } from "../../actions/alertAction";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data)
    try {
      const response = await dispatch(signupActions(data));
      if (response.success === true) {
        dispatch(set_Alert("Signup successful. Kidly login ", "success"));
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <form className={styles.signupForm} onSubmit={handleSubmit(onSubmit)}>
        <h2>Sign Up</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Username</label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Username is required" })}
          />
          {errors.name && (
            <p className={styles.errorText}>{errors.name.message}</p>
          )}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Entered value does not match email format",
              },
            })}
          />
          {errors.email && (
            <p className={styles.errorText}>{errors.email.message}</p>
          )}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must have at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className={styles.errorText}>{errors.password.message}</p>
          )}
        </div>
        <button type="submit" className={styles.signupButton}>
          Sign Up
        </button>
        <p className={styles.loginPrompt}>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
