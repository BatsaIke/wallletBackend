
// LeftSideBar.js
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import "./LeftSideBar.css";
import { set_Alert } from "../../api/alertAction";
import { useDispatch } from "react-redux";
import { logout, resetAuthState } from "../../redux/authSlice";

const LeftSideBar = ({ onSelectComponent, userName,userID, onHideSidebar }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetAuthState())
    navigate('/login');
    dispatch(set_Alert('Logout successful', '', 2000));
  };

  const handleButtonClick = (component) => {
    onSelectComponent(component);
    onHideSidebar();  // Hide the sidebar when a button is clicked
  };
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 767);
    };

    // Set initial screen size
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const resetHandler = () => {
    navigate("/reset");
  };

  return (
    <>
      <div className="sidebar">
        {isSmallScreen? <section style={{fontSize:"1.3rem"}}>USER ID: {userID}</section>:
        <div className="sidebar-logo">Wallet App</div>}
        <div className="sidebar-item">
          {isSmallScreen ? (
            <button  onClick={() => handleButtonClick("WalletPage")} className="button">{userName}'s wallet</button>
          ) : (
            <button
              className="button"
              onClick={() => handleButtonClick("WalletPage")}
            >
              My Wallet
            </button>
          )}
        </div>
        {/* Call handleButtonClick with the selected component name */}
        <div className="sidebar-item">
          <button
            className="button"
            onClick={() => handleButtonClick("Transactions")}
          >
            Transactions
          </button>
        </div>
        <div className="sidebar-item">
          <button
            className="button"
            onClick={() => handleButtonClick("Profile")}
          >
            Profile
          </button>
        </div>
        <div className="sidebar-item">
          <button className="button" onClick={resetHandler}>
            Reset Password
          </button>
        </div>
        <div className="sidebar-item">
        {isSmallScreen ? (
        <button onClick={handleLogout} className="button">
          Logout
        </button>
        ) : ""
        }
        </div>
      </div>
    </>
  );
};

export default LeftSideBar;
