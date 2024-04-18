import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CiMenuBurger } from "react-icons/ci";
import '../../App.css';
import { useNavigate } from 'react-router';
import { set_Alert } from '../../api/alertAction';
import { BuyTokenModal } from '../../utils/buyTokenModal';
import Modal from '../UI/Modal';
import { closeModal, openModal } from '../../redux/modalSlice';
import { logout, resetAuthState } from '../../redux/authSlice';

const Header = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal);
  const user = useSelector((state) => state.auth);

  const {
    name,
    avatar,
  tokenDigit,
    balance: { tokenValue = 0} = {},
  } = user?.user || {};

  const walletBalance = tokenValue  || '0.0';
  const modalBody = BuyTokenModal();

  // useEffect(() => {
  //   // The effect will run after the component renders
  //   if (!user.isAuthenticated) {
  //     // Logout is completed, navigate to '/login'
  //     navigate('/login');
  //     dispatch(set_Alert('Logout successful', '', 2000));
  //     dispatch(resetAuthState());
      
  //   }
  // }, [user.isAuthenticated, dispatch, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetAuthState())
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
      <div>
        <section>USER ID: {tokenDigit}</section>
      </div>
      <div className="user-info">
        <div className="balance">
          <span className="wallet-icon">&#128176;</span>
          <span className="wallet-balance-header">{walletBalance}.000Tks</span>
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
