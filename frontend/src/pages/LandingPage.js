import React, { useEffect, useState } from 'react';
import Header from '../components/header/Header';
import LeftSideBar from '../components/left-sidebare/LeftSideBar';
import '../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal } from '../redux/modalSlice';
import Modal from '../components/UI/Modal';
import { BuyTokenModal } from '../utils/buyTokenModal';
import { useNavigate } from 'react-router';
import TransactionHistory from './transactions/Transactions.js';
import ResetPassword from './resetPassword/RestPassword.js';
import Profile from './profile/Profile.js';
import ResetPasswordComponent from './resetPassword/ResetPasswordComponent.js';
import WalletPage from './walletPage.js/WalletPage.js';
import { loadUser, verifyPayment } from '../api/apiActions.js';
// ... (import statements)

const LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const paymentStatus = useSelector((state) => state.paymentStatus);
  const isModalOpen = useSelector((state) => state.modal);

  const modalBody = BuyTokenModal();
  const { user, loading } = useSelector((state) => state.user);

  const openModalHandler = () => {
    dispatch(
      openModal({
        title: 'Buy Token',
        body: {
          inputPlaceholder: 'Enter amount',
          buttonText: 'Buy Now',
        },
      })
    );
  };

  useEffect(() => {
   verifyPayment()
    openModalHandler();
  }, []);

  // Local state to track the selected component
  const [selectedComponent, setSelectedComponent] = useState('WalletPage');

  return (
    <>
      <Header />
      <div className="container">
        <div className="sidebar">
          {/* Pass a callback to set the selected component */}
          <LeftSideBar onSelectComponent={setSelectedComponent} />
        </div>
        <div className="main-content">
          {/* Check if user exists and is not empty before rendering components */}
          {user ? (
            <>
              {selectedComponent === 'Transactions' && (
                <TransactionHistory user={user} loading={loading} />
              )}
              {selectedComponent === 'Profile' && (
                <Profile user={user} loading={loading} />
              )}
              {selectedComponent === 'ResetPassword' && <ResetPassword />}
              {selectedComponent === '/reset-password/:id' && (
                <ResetPasswordComponent />
              )}
              {selectedComponent === 'WalletPage' && (
                <WalletPage user={user} loading={loading} />
              )}
            </>
          ) : (
            // Render loading state or fallback content here
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default LandingPage;
