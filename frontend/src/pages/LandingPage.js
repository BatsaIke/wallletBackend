// LandingPage.js
import React, { useState } from 'react';
import Header from '../components/header/Header';
import LeftSideBar from '../components/left-sidebare/LeftSideBar';
import '../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal } from '../redux/modalSlice';
import Modal from '../components/UI/Modal';

const LandingPage = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.isOpen);
  const [amount, setAmount] = useState('');

  const buyToken = () => {
    dispatch(
      openModal({
        title: 'Buy Token',
        body: (
          <>
            <p>Enter amount to buy:</p>
            <input
              type="text"
              placeholder="Enter amount"
              value={amount}
              className="input-field"
              required
              onChange={(e) => setAmount(e.target.value)}
            />
            <button className="button" onClick={() => handleBuyNow(amount)}>
              Buy Now
            </button>
          </>
        ),
      })
    );
  };

  const handleBuyNow = (amount) => {
    // Handle the "Buy Now" logic here
    console.log(`Buying ${amount} tokens`);
    // Close the modal
    dispatch(closeModal());
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="sidebar">
          <LeftSideBar />
        </div>
        <div className="main-content">
          <button onClick={buyToken}>Open Modal</button>
          {isModalOpen && <Modal onClose={() => dispatch(closeModal())} />}
        </div>
      </div>
    </>
  );
};

export default LandingPage;
