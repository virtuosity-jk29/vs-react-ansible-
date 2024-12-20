import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Server, Settings } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/devices', label: 'Devices', icon: Server },
  { path: '/settings', label: 'Settings', icon: Settings },
];

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <div className="h-full w-64 bg-white border-r border-gray-200">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <Server className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-semibold text-gray-800">NetAdmin</span>
        </div>
      </div>
      
      <nav className="mt-4">
        {navItems.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center space-x-3 px-6 py-3 text-sm font-medium ${
              location.pathname === path
                ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;