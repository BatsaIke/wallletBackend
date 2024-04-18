import React from "react";
import styles from "./BillingDetails.module.css";
import { useForm } from "react-hook-form";

const BillingForm = ({ formData, handleChange, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <div className={styles.billingContainer}>
      <h2 className={styles.orderHeader}>Billing Details</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="deliveryContact">Delivery Contact number</label>
        <input
          type="text"
          id="deliveryContact"
          {...register("deliveryContact", { required: "Delivery contact is required" })}
          onChange={handleChange}
          value={formData.deliveryContact}
        />
        {errors.deliveryContact && <p className={styles.error}>{errors.deliveryContact.message}</p>}

        <label htmlFor="deliveryLocation">Delivery Location</label>
        <textarea
          id="deliveryLocation"
          {...register("deliveryLocation", { required: "Delivery location is required" })}
          onChange={handleChange} 
          value={formData.deliveryLocation}
        />
        {errors.deliveryLocation && <p className={styles.error}>{errors.deliveryLocation.message}</p>}

        <label htmlFor="additionalInfo">Additional Information</label>
        <textarea
          id="additionalInfo"
          {...register("additionalInfo")} // Optional field, no validation rules
          onChange={handleChange} 
          value={formData.additionalInfo}
        />

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="saveInfo"
            name="saveInfo"
            checked={formData.saveInfo}
            onChange={handleChange}
            value={formData.saveInfo}
          />
          <label htmlFor="saveInfo">Save this information for next time</label>
        </div>

        <button type="submit" className={styles.payNowButton}>
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default BillingForm;
