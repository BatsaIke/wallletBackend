
import { useNavigate } from "react-router";

const LeftSideBar = ({ onSelectComponent }) => {
  const navigate = useNavigate();


  const resetHandler = () => {
    navigate("/reset");
  };
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-logo">Wallet App</div>
        <div className="sidebar-item">
          <button
            className="button"
            onClick={() => onSelectComponent("WalletPage")}
          >
            My Wallet
          </button>
        </div>
        {/* Call onSelectComponent with the selected component name */}
        <div className="sidebar-item">
          <button
            className="button"
            onClick={() => onSelectComponent("Transactions")}
          >
            Transactions
          </button>
        </div>
        <div className="sidebar-item">
          <button
            className="button"
            onClick={() => onSelectComponent("Profile")}
          >
            Profile
          </button>
        </div>
        <div className="sidebar-item">
          <button className="button" onClick={resetHandler}>
            Reset Password
          </button>
        </div>
      </div>
    </>
  );
};

export default LeftSideBar;
