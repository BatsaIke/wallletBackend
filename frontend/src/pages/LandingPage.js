import React, { useEffect, useState } from "react";

import LeftSideBar from "../components/left-sidebare/LeftSideBar";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../redux/modalSlice";
import TransactionHistory from "./transactions/Transactions.js";
import ResetPassword from "./resetPassword/RestPassword.js";
import Profile from "./profile/Profile.js";
import ResetPasswordComponent from "./resetPassword/ResetPasswordComponent.js";
import WalletPage from "./walletPage.js/WalletPage.js";
import { verifyPayment } from "../api/apiActions.js";
import Spinner from "../components/UI/Spinner.js";
import Header from "../components/header/Header.js";
// ... (import statements)

const LandingPage = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const { user, loading } = useSelector((state) => state.auth);
  const username = user?.name;
  const userID =user?.tokenDigit
  

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  useEffect(() => {
    const openModalHandler = () => {
      dispatch(
        openModal({
          title: "Buy Token",
          body: {
            inputPlaceholder: "Enter amount",
            buttonText: "Buy Now",
          },
        })
      );
    };
  
    openModalHandler();
    verifyPayment();
    // Empty dependency array means this effect runs only once after the initial render
  }, [dispatch]); // Don't forget to include dispatch here if it's used within the effect
  

  // Local state to track the selected component
  const [selectedComponent, setSelectedComponent] = useState("WalletPage");

  return (
    <>
      <Header onToggleSidebar={toggleSidebar} />
      <div className={`container ${sidebarVisible ? "active" : ""}`}>
        <div className="sidebar">
          {/* Pass a callback to set the selected component */}
          <LeftSideBar
            onSelectComponent={setSelectedComponent}
            onHideSidebar={toggleSidebar}
            userName={username}
            userID={userID}
          />
        </div>
        <div className="main-content">
          {/* Check if user exists and is not empty before rendering components */}
          {user ? (
            <>
              {selectedComponent === "Transactions" && (
                <TransactionHistory
                  user={user}
                  loading={loading}
                  toggleSidebar={toggleSidebar}
                />
              )}
              {selectedComponent === "Profile" && (
                <Profile user={user} loading={loading} />
              )}
              {selectedComponent === "ResetPassword" && <ResetPassword />}
              {selectedComponent === "/reset-password/:id" && (
                <ResetPasswordComponent />
              )}
              {selectedComponent === "WalletPage" && (
                <WalletPage user={user} loading={loading} />
              )}
            </>
          ) : (
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Spinner />
              loading...
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LandingPage;
