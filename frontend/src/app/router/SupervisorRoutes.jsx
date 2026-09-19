import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import SupervisorLayout from '../../layouts/SupervisorLayout/SupervisorLayout';
import SupervisorDashboard from '../../pages/supervisor/Dashboard/Dashboard';

export const SupervisorRoutes = (
  <Route path="supervisor" element={<SupervisorLayout />}>
    <Route index element={<SupervisorDashboard />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Route>
);

export default SupervisorRoutes;

