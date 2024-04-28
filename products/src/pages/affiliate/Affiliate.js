import React, { useState } from "react";
import styles from "./AffiliatePage.module.css";
import Modal from "../../UI/modal/Modal";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { createAffiliate } from "../../actions/affiliateAction";
import { set_Alert } from "../../actions/alertAction";

const AffiliatePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    // Split the products string into an array based on comma
    data.products = data.products.split(",").map((product) => product.trim());

    console.log(data);
    try {
      let res = await dispatch(createAffiliate(data));
      if (res.success) {
        dispatch(
          set_Alert(
            "Affiliate successfully sent, kindly wait for response",
            "success"
          )
        );
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.affiliatePage}>
      <h1>Become an Affiliate</h1>
      <p>Fill in the forms below and we will get back to you shortly.</p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.affiliateForm}>
        <input
          type="text"
          name="name"
          placeholder="Name to call you"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        <input
          type="text"
          name="location"
          placeholder="Location"
          {...register("location", { required: "Location is required" })}
        />
        {errors.location && (
          <p className={styles.error}>{errors.location.message}</p>
        )}
        <input
          type="text"
          name="products"
          placeholder="What types of products do you have? (Separate with comma)"
          {...register("products", {
            required: "Product types are required",
          })}
        />
        {errors.products && (
          <p className={styles.error}>{errors.products.message}</p>
        )}
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number to call"
          {...register("phoneNumber", {
            required: "Contact number is required",
          })}
        />
        {errors.phoneNumber && (
          <p className={styles.error}>{errors.phoneNumber.message}</p>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email Address (optional)"
          {...register("email", {
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <p className={styles.error}>
            {errors.email.type === "pattern"
              ? "Invalid email address"
              : "Email is optional"}
          </p>
        )}
        <button type="submit">Submit</button>
      </form>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        Submission successful, we'll get back to you shortly.
      </Modal>
    </div>
  );
};

export default AffiliatePage;
