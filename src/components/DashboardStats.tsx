import React from 'react';
import { Device } from '../types/device';
import { Server, Shield, ShieldAlert, Network } from 'lucide-react';

interface DashboardStatsProps {
  devices: Device[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ devices }) => {
  const getBrandCounts = () => {
    return devices.reduce((acc, device) => {
      acc[device.brand] = (acc[device.brand] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  };

  const totalDevices = devices.length;
  const compliantDevices = devices.filter(d => d.status === 'compliant').length;
  const nonCompliantDevices = devices.filter(d => d.status === 'non-compliant').length;
  const brandCounts = getBrandCounts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Devices</p>
            <h3 className="text-2xl font-bold text-gray-800">{totalDevices}</h3>
          </div>
          <Server className="h-8 w-8 text-blue-500" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Compliant</p>
            <h3 className="text-2xl font-bold text-green-600">{compliantDevices}</h3>
          </div>
          <Shield className="h-8 w-8 text-green-500" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Non-Compliant</p>
            <h3 className="text-2xl font-bold text-red-600">{nonCompliantDevices}</h3>
          </div>
          <ShieldAlert className="h-8 w-8 text-red-500" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500 text-sm">Brands Distribution</p>
            <Network className="h-6 w-6 text-purple-500" />
          </div>
          <div className="space-y-1">
            {Object.entries(brandCounts).map(([brand, count]) => (
              <div key={brand} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{brand}</span>
                <span className="text-sm font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;