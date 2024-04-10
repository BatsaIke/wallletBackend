// BillingDetails.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./BillingDetails.module.css"; // CSS module for styling
import Modal from "../../UI/modal/Modal";
import LoginPage from "../../pages/Login/Loginpage";
import { BuyTokenModal } from "../buy-token-modal/BuyTokenModal";
import BillingForm from "./BillingForm";

const BillingDetails = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const subtotal = useSelector((state) => state.cart.totalPrice); 

  const { isAuthenticated, error } = useSelector((state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
  }));

  const [formData, setFormData] = useState({
    deliveryContact: "",
    additionalInfo: "",
    email: "",
    saveInfo: false,
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showBuyToken, setShowBuyToken] = useState(false);
  // Destructure formData for easy access
  const { deliveryContact, location, additionalInfo, email } = formData;

  // Function to handle form input changes
  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      setModalOpen(false);
    }
  }, [isAuthenticated]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const orderItems = cartItems.map(item => ({
      product: item.id,
      quantity: item.quantity
    }));

   const orderData = {
    ...formData,
    items: orderItems,
    totalAmount:subtotal,  
    deliveryContact: formData.deliveryContact,
    deliveryLocation: formData.location,
    additionalInfo: formData.additionalInfo,
    quantity:cartItems.length
  };
   // Store the orderData in local storage
   localStorage.setItem('orderData', JSON.stringify(orderData));
      if (!isAuthenticated) {
      setModalOpen(true);
    } else {
      console.log("Proceed with payment");
    }
  };

  const handleContinueAsGuest = () => {
    console.log("Continue as guest");
    setShowBuyToken(true);
    setModalOpen(false);
  };

  return (
    <div className={styles.billingContainer}>
       <BillingForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                showLoginModal={showLogin}
                email={formData.email}
            />
      
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
      
    </div>
  );
};

export default BillingDetails;
