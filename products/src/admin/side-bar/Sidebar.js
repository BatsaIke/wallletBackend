// Sidebar/Sidebar.js
import React from 'react';
import styles from './Sidebar.module.css';
import UserProfile from './user-profile/Userprofile';
import MenuList from './user-profile/menu-list/Menulist';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <UserProfile  />
      <MenuList />
    </div>
  );
}

export default Sidebar;
