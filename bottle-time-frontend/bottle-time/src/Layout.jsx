import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidepanel from './Sidepanel';
import './css/Layout.css';

function Layout() {
  return (
    <div className="app-container">
      <main className="main-content">
        <Outlet />
      </main>
      <Sidepanel />
    </div>
  );
}

export default Layout;