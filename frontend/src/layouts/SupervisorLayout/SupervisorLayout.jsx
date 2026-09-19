import React from 'react';
import { Outlet } from 'react-router-dom';
import SupervisorHeader from './SupervisorHeader';
import SupervisorSidebar from './SupervisorSidebar';
import './supervisorLayout.css';

export const SupervisorLayout = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>
      <SupervisorSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <SupervisorHeader />
        <main style={{ padding: '24px', flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SupervisorLayout;

