import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CiMenuBurger } from "react-icons/ci";
import { setLoggedOutAction } from '../../api/apiActions';
import '../../App.css';
import { useNavigate } from 'react-router';
import { set_Alert } from '../../api/alertAction';
import { BuyTokenModal } from '../../utils/buyTokenModal';
import Modal from '../UI/Modal';
import { closeModal, openModal } from '../../redux/modalSlice';

const Header = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal);
  const user = useSelector((state) => state.user);

  const {
    name,
    avatar,
    balance: { totalBalance = 0, actualBalance = 0 } = {},
  } = user?.user || {};

  const walletBalance = totalBalance || '0.0';
  const modalBody = BuyTokenModal();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(setLoggedOutAction());
    navigate('/login');
    dispatch(set_Alert('Logout successful', '', 2000));
  };

  const openModalHandler = () => {
    dispatch(
      openModal({
        title: 'Buy Token',
        body: {
          inputSelecHoder: 'Select Payment Method',
          inputPlaceholder: 'Enter amount',
          buttonText: 'Buy Now',
        },
      })
    );
  };

  return (
    <header className="header">
      
      <div className="menuIcon">
        {/* Pass the onToggleSidebar function to the onClick event */}
        <button className="buton" onClick={onToggleSidebar}>
         <CiMenuBurger size={35}/>
        </button>
      </div>
      <div className="logo">
        <img src="logo.svg" alt="Logo" />
      </div>
      <div>
        <button className="token-button" onClick={openModalHandler}>
          Buy Token
        </button>
        {isModalOpen.isOpen && (
          <Modal
            title={isModalOpen.title}
            body={modalBody}
            onClose={() => dispatch(closeModal())}
          />
        )}
      </div>
      <div className="user-info">
        <div className="balance">
          <span className="wallet-icon">&#128176;</span>
          <span className="wallet-balance-header">₵{walletBalance}</span>
        </div>
        <div className="user-details">
          <span className="username">{name}</span>
          <img
            className="user-picture"
            src={avatar || 'user.jpg'}
            alt="User"
          />
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </header>
  );
};


export default Header;
