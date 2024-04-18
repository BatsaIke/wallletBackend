import React from 'react';
import { Outlet } from 'react-router-dom'; // Outlet renders the child routes
import Sidebar from './side-bar/Sidebar';

const AdminLayout = () => {
  return (
    <div>
      <Sidebar/>
      <div className="admin-content">
        <Outlet /> {/* This will render the child routes */}
      </div>
    </div>
  );
}

export default AdminLayout;
