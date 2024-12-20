import React from 'react';
import DashboardStats from '../components/DashboardStats';
import { mockDevices } from '../data/mockData';

const DashboardPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>
      <DashboardStats devices={mockDevices} />
    </div>
  );
};

export default DashboardPage;