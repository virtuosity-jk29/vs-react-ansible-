import React from 'react';
import { Bell, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200">
      <div className="h-full px-6 flex items-center justify-end space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Bell className="h-5 w-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <User className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </header>
  );
};

export default Header;