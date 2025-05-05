
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, User } from 'lucide-react';
import { useAppSelector } from '../../hooks/redux';

const Header: React.FC = () => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  // Get the page title based on the current path
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === '/') return 'Dashboard';
    if (path === '/inventory') return 'Inventory Management';
    if (path === '/billing') return 'Billing & Sales';
    if (path === '/reports') return 'Reports & Analytics';
    if (path === '/settings') return 'Settings';
    
    return 'MediPOS';
  };

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-800">{getPageTitle()}</h1>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100 relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center">
          <div className="mr-3 text-right">
            <p className="text-sm font-medium">{user?.username}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
