import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faSearch,
  faUser,
  faSignOutAlt,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import HeaderMenu from "../header menu/HeaderMenu";
import styles from "./Header.module.css";
import logo from "../../../images/highs.png";
import { logout } from "../../../redux/slices/authSlice";

const Header = () => {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const [searchTerm, setSearchTerm] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const tokenValue = useSelector(
    (state) => state.auth.user?.data?.balance?.tokenValue
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isMobile = window.innerWidth <= 768;

  const handleNavigateToCart = () => {
    navigate("/cart");
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // dispatch(setSearchTerm(event.target.value));
  };

  return (
    <>
      <header className={styles.header}>
        <NavLink to="/" className={styles.logo}>
          <img src={logo} alt="logo" className={styles.logoImage} />
        </NavLink>
        <div className={styles.searchBar}>
          {isMobile ? (
            <FontAwesomeIcon icon={faSearch} />
          ) : (
            <input type="text" placeholder="Search..." value={searchTerm}
            onChange={handleSearchChange} />
          )}
        </div>
        <div className={styles.cart} onClick={handleNavigateToCart}>
          <FontAwesomeIcon icon={faShoppingCart} />
          {!isMobile && "My Cart"}
          {cartQuantity > 0 && (
            <span className={styles.cartQuantity}>{cartQuantity}</span>
          )}
        </div>
        <div className={styles.account}>
          {isAuthenticated ? (
            // Display token value in place of the user icon if authenticated
            <span>Balance: TKS {tokenValue}</span>
          ) : // Show user icon if not authenticated, or "My Account" text for non-mobile
          isMobile ? (
            <FontAwesomeIcon icon={faWallet} />
          ) : (
            <NavLink to="/login" className={styles.myAccount}>
              Login
            </NavLink>
          )}
        </div>

        <div className={styles.account}>
          {isAuthenticated ? (
            <button className={styles.logoutButton} onClick={handleLogout}>
              <FontAwesomeIcon
                icon={faSignOutAlt}
                className={styles.logoutIcon}
              />
              <span className={styles.logoutText}>Logout</span>
            </button>
          ) : isMobile ? (
            <FontAwesomeIcon icon={faUser} />
          ) : (
            ""
          )}
        </div>
      </header>
      <HeaderMenu />
    </>
  );
};

export default Header;
