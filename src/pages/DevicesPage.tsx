import React from 'react';
import DevicesTable from '../components/DevicesTable';
import { mockDevices } from '../data/mockData';

const DevicesPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Network Devices</h1>
      <DevicesTable devices={mockDevices} />
    </div>
  );
};

export default DevicesPage;