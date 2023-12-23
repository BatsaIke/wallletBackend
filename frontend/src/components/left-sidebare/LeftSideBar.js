// Import React and other necessary libraries

import Header from "../header/Header";
import Modal from "../UI/Modal";
import '../../App.css'
import { useState } from "react";
const LeftSideBar = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

    return (
        <>  
        
       
    
      
        {/* LeftSideBar */}
        <div className="sidebar">
          <div className="sidebar-logo">Wallet App</div>
          <div className="sidebar-item">Username</div>
          <div className="sidebar-item">History</div>
          <div className="sidebar-item">Profile</div>
          <div className="sidebar-item">Reset Password</div>
          <div className="sidebar-item">Reset Password</div>
          </div>
        
      
      </>
    );
  };
  
  export default LeftSideBar;
  