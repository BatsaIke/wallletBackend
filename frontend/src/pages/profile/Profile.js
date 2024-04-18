import React, { useState } from "react";
import "./Profile.css"; // Import your CSS file for styling
// import { updateUserProfile } from "../../api/apiActions";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../api/apiActions";

const Profile = ({ user, loading }) => {
  const dispatch = useDispatch();
  const [isEditable, setIsEditable] = useState(false);
  const [editedData, setEditedData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const {
    _id, 
    name,
    email,
    phone,
    avatar,
    balance: { tokenValue = 0, } = {},
  } = user || {};

  const handleEditClick = async () => {
    if (isEditable) {
      // Dispatch the action to update user profile
      await dispatch(updateUserProfile(_id, editedData)); // Pass the user ID
    }
    setIsEditable(!isEditable);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="profile-container">
      <div className="info-container">
        {loading ? (
          <p> Profile Loading...</p>
        ) : (
          <>
            <div className="avatar-container">
              <img src={avatar} alt="Avatar" className="avatar" />
            </div>
            <h2>Your Details</h2>
            {isEditable ? (
              <>
                <input
                  type="text"
                  placeholder="Edit Name"
                  className="input-field"
                  name="name"
                  value={editedData.name}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  placeholder="Edit Email"
                  className="input-field"
                  name="email"
                  value={editedData.email}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  placeholder="Edit Phone"
                  className="input-field"
                  name="phone"
                  value={editedData.phone}
                  onChange={handleInputChange}
                />
              </>
            ) : (
              <>
                <h2>{name}</h2>
                <p>Email: {email}</p>
                <p className="phone-number">Phone: {phone}</p>
                <div className="balance-container">
                  <p>Token Balance: {tokenValue}.000Tks</p>
                </div>
              </>
            )}
            <button onClick={handleEditClick} className="button">
              {isEditable ? "Save Changes" : "Edit Profile"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
