// BillingForm.js
import React from "react";
import styles from "./BillingDetails.module.css";

const BillingForm = ({ formData, handleChange, handleSubmit, email }) => {
  return (
    <div className={styles.billingContainer}>
      <h2 className={styles.orderHeader}>Billing Details</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="deliveryContact">Delivery Contact nunber</label>
        <input
          type="text"
          id="deliveryContact"
          name="deliveryContact"
          value={formData.deliveryContact}
          onChange={handleChange}
          required
        />
        <label htmlFor="Email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          required
          value={email}
          onChange={handleChange}
        />
        <label
          htmlFor="deliveryLocation"
        >
          Delivery Location
        </label>
        <textarea
          id="deliveryLocation"
          name="deliveryLocation"
          value={formData.deliveryLocation}
          onChange={handleChange}
        />

        <label htmlFor="additionalInfo">Additional Information</label>
        <textarea
          id="additionalInfo"
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleChange}
        />
        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="saveInfo"
            name="saveInfo"
            checked={formData.saveInfo}
            onChange={handleChange}
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
