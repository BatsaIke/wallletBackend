// BillingDetails.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./BillingDetails.module.css"; // CSS module for styling
import Modal from "../../UI/modal/Modal";
import LoginPage from "../../pages/Login/Loginpage";
import { BuyTokenModal } from "../buy-token-modal/BuyTokenModal";

const BillingDetails = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector((state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
  }));

  const [formData, setFormData] = useState({
    deliveryContact: "",
    location: "",
    additionalInfo: "",
    email: "",
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showBuyToken, setShowBuyToken] = useState(false);
  // Destructure formData for easy access
  const { deliveryContact, location, additionalInfo, email } = formData;

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      setModalOpen(false);
    }
  }, [isAuthenticated]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isAuthenticated) {
      setModalOpen(true);
    } else {
      console.log("Proceed with payment");
    }
  };

  const handleContinueAsGuest = () => {
    // Logic for continuing as a guest, possibly involving an API call
    console.log("Continue as guest");
    setShowBuyToken(true); // Show the BuyTokenModal
    setModalOpen(false); // Close the current modal
    // Proceed with the necessary guest checkout process
  };
  return (
    <div className={styles.billingContainer}>
      <h2 className={styles.orderHeader}>Billing Details</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="deliveryContact">Delivery Contact</label>
        <input
          type="text"
          id="deliveryContact"
          name="deliveryContact"
          required
          value={deliveryContact}
          onChange={handleChange}
        />

        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          required
          value={location}
          onChange={handleChange}
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
 
        <label htmlFor="additionalInfo">Additional Information</label>
        <textarea
          id="additionalInfo"
          name="additionalInfo"
          value={additionalInfo}
          onChange={handleChange}
        />
       

        <div className={styles.checkboxContainer}>
          <input type="checkbox" id="saveInfo" name="saveInfo" />
          <label htmlFor="saveInfo">Save this information for next time</label>
        </div>

        <button type="submit" className={styles.payNowButton}>
          Pay Now
        </button>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          header="Proceed with Payment"
          className={styles.billModal}
        >
          {showLogin ? (
            <LoginPage />
          ) : (
            <div className={styles.guestOrLoginContainer}>
              <p className={styles.choicePrompt}>
                Do you want to proceed as a guest or log in?
              </p>
              <div className={styles.buttonContainer}>
                <button
                  onClick={handleContinueAsGuest}
                  className={styles.guestButton}
                >
                  Continue as Guest
                </button>
                <button
                  onClick={() => setShowLogin(true)}
                  className={styles.loginButton}
                >
                  Log In
                </button>
              </div>
            </div>
          )}
        </Modal>

        {/* New Modal for BuyTokenModal when showBuyToken is true */}
        <Modal
          isOpen={showBuyToken}
          onClose={() => setShowBuyToken(false)}
          header="Make payment as Guest"
          className={styles.billModal}
        >
          <BuyTokenModal email={email} />
        </Modal>
      </form>
    </div>
  );
};

export default BillingDetails;
