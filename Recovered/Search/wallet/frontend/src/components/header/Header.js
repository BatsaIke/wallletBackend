import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaWallet } from 'react-icons/fa';
import { setLoggedOutAction } from '../../api/apiActions'; // Import the logout action
import '../../App.css'; // Import your styling for the header
import { useNavigate } from 'react-router';
import { set_Alert } from '../../api/alertAction';

const Header = () => {
    const navigate = useNavigate()
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
const {
  _id,
  name,
  email,
  phone,
  avatar,
  date,
  payments,
  __v,
  balance: { totalBalance = 0, actualBalance = 0 } = {},
} = user?.user || {};


  const walletBalance = totalBalance || '0.0';

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    // Dispatch the setLoggedOut action
    dispatch(setLoggedOutAction());
    navigate('/login')
    dispatch(set_Alert("Logout successfull","",2000))

  };

  return (
    <header className="header">
      {/*  */}
      <div className="logo">
        <img src="logo.svg" alt="Logo" />
      </div>
      <div className="user-info">
        <div className="balance">
          <span className="wallet-icon">&#128176;</span>
        <span className="wallet-balance">${walletBalance}</span>
        </div>
        <div className="user-details">
          <span className="username">{name}</span>
          <img className="user-picture" src={avatar || "user.jpg"} alt="User" />
        </div>
        {/* Connect handleLogout to the onClick event of the logout button */}
        <button onClick={handleLogout} className="button">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
