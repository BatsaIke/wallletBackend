
// LeftSideBar.js
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import "./LeftSideBar.css";
import { set_Alert } from "../../api/alertAction";
import { setLoggedOutAction } from "../../api/apiActions";
import { useDispatch } from "react-redux";

const LeftSideBar = ({ onSelectComponent, userName,onHideSidebar }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(setLoggedOutAction());
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
        <div className="sidebar-logo">Wallet App</div>
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
