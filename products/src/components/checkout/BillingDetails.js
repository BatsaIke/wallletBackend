import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import styles from "./BillingDetails.module.css";
import Modal from "../../UI/modal/Modal";
import LoginPage from "../../pages/Login/Loginpage";
import { BuyTokenModal } from "../buy-token-modal/BuyTokenModal";
import BillingForm from "./BillingForm";

const BillingDetails = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const subtotal = useSelector((state) => state.cart.totalPrice);

  // Memoizing the selector
  const authSelector = useMemo(
    () => (state) => ({
      isAuthenticated: state.auth.isAuthenticated,
      error: state.auth.error,
    }),
    []
  );

  const { isAuthenticated } = useSelector(authSelector);

  const [formData, setFormData] = useState({
    deliveryContact: "",
    additionalInfo: "",
    email: "",
    saveInfo: false,
    deliveryLocation: "",
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showBuyToken, setShowBuyToken] = useState(false);

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
  const { email } = formData;
  const handleSubmit = async (event) => {
    const orderItems = cartItems.map((item) => ({
      product: item._id,
      quantity: item.quantity,
    }));

    const orderData = {
      ...formData,
      items: orderItems,
      totalAmount: subtotal,
      deliveryContact: formData.deliveryContact,
      deliveryLocation: formData.deliveryLocation,
      additionalInfo: formData.additionalInfo,
      quantity: cartItems.length,
    };
console.log(formData,"ALLform data");
    localStorage.setItem("orderData", JSON.stringify(orderData));
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
        onSubmit={handleSubmit}
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
                disabled={true}
              >
                Log In
              </button>
            </div>
          </div>
        )}
      </Modal>

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
