import React, { useState } from 'react';
import { Device } from '../types/device';
import { Search, Filter, Download, CheckSquare, Square, FileDown } from 'lucide-react';
import { downloadDeviceConfig, downloadSelectedConfigs } from '../utils/downloadUtils';
import { generateDeviceConfigPDF } from '../utils/pdfUtils';

interface DevicesTableProps {
  devices: Device[];
}

const DevicesTable: React.FC<DevicesTableProps> = ({ devices }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDevices, setSelectedDevices] = useState<Set<string>>(new Set());

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.hostname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.ipAddress.includes(searchTerm);
    const matchesBrand = brandFilter === 'all' || device.brand === brandFilter;
    const matchesStatus = statusFilter === 'all' || device.status === statusFilter;
    
    return matchesSearch && matchesBrand && matchesStatus;
  });

  const uniqueBrands = Array.from(new Set(devices.map(d => d.brand)));

  const handleSelectAll = () => {
    if (selectedDevices.size === filteredDevices.length) {
      setSelectedDevices(new Set());
    } else {
      setSelectedDevices(new Set(filteredDevices.map(d => d.id)));
    }
  };

  const handleSelectDevice = (deviceId: string) => {
    const newSelected = new Set(selectedDevices);
    if (newSelected.has(deviceId)) {
      newSelected.delete(deviceId);
    } else {
      newSelected.add(deviceId);
    }
    setSelectedDevices(newSelected);
  };

  const handleDownloadSelected = async () => {
    const selectedDevicesList = filteredDevices.filter(d => selectedDevices.has(d.id));
    await downloadSelectedConfigs(selectedDevicesList);
  };

  const handleDownloadPDF = () => {
    const selectedDevicesList = filteredDevices.filter(d => selectedDevices.has(d.id));
    generateDeviceConfigPDF(selectedDevicesList);
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative">
            <input
              type="text"
              placeholder="Search devices..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          <div className="flex gap-4">
            <select
              className="border rounded-lg px-4 py-2"
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
            >
              <option value="all">All Brands</option>
              {uniqueBrands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>

            <select
              className="border rounded-lg px-4 py-2"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="compliant">Compliant</option>
              <option value="non-compliant">Non-Compliant</option>
            </select>

            {selectedDevices.size > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={handleDownloadSelected}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Download className="h-4 w-4" />
                  Download Config
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <FileDown className="h-4 w-4" />
                  Download PDF
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={handleSelectAll}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {selectedDevices.size === filteredDevices.length ? (
                    <CheckSquare className="h-5 w-5" />
                  ) : (
                    <Square className="h-5 w-5" />
                  )}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hostname</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Scan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDevices.map((device) => (
              <tr key={device.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleSelectDevice(device.id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {selectedDevices.has(device.id) ? (
                      <CheckSquare className="h-5 w-5" />
                    ) : (
                      <Square className="h-5 w-5" />
                    )}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{device.hostname}</td>
                <td className="px-6 py-4 whitespace-nowrap">{device.brand}</td>
                <td className="px-6 py-4 whitespace-nowrap">{device.model}</td>
                <td className="px-6 py-4 whitespace-nowrap">{device.ipAddress}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    device.status === 'compliant' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {device.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{device.lastScan}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => downloadDeviceConfig(device)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Download Configuration"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DevicesTable;