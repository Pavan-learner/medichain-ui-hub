
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  BarChart2, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { logout } from '../../store/authSlice';

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  const navLinks = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Inventory', path: '/inventory', icon: Package },
    { name: 'Billing', path: '/billing', icon: ShoppingCart },
    { name: 'Reports', path: '/reports', icon: BarChart2 },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  // Check if certain links should be shown only to admins
  const shouldShowLink = (path: string) => {
    if (path === '/reports' || path === '/settings') {
      return user?.role === 'admin';
    }
    return true;
  };

  return (
    <div className="w-64 bg-white shadow-lg flex flex-col h-screen">
      <div className="p-4 border-b">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
            MS
          </div>
          <div className="ml-2">
            <h1 className="text-lg font-bold text-primary">MediPOS</h1>
            <p className="text-xs text-gray-500">{user?.role === 'admin' ? 'Administrator' : 'Employee'}</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 pt-5 pb-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navLinks.map((link) => shouldShowLink(link.path) && (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg transition-colors duration-150 
                  ${isActive 
                    ? 'bg-primary text-white' 
                    : 'hover:bg-gray-100 text-gray-700'}`
                }
              >
                <link.icon className="w-5 h-5 mr-3" />
                <span>{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-150"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
