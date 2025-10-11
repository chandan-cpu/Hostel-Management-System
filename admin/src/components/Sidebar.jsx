import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Bed, 
  Users, 
  Calendar, 
  DollarSign, 
  Wrench, 
  UserCheck, 
  Settings,
  X,
  Building
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Rooms', href: '/rooms', icon: Bed },
    { name: 'Students', href: '/students', icon: Users },
    { name: 'Bookings', href: '/bookings', icon: Calendar },
    { name: 'Finances', href: '/finances', icon: DollarSign },
    { name: 'Maintenance', href: '/maintenance', icon: Wrench },
    { name: 'Staff', href: '/staff', icon: UserCheck },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={onClose} />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="flex items-center space-x-2">
            <Building className="h-8 w-8 text-white" />
            <h1 className="text-xl font-bold text-white">
              Hostel Admin
            </h1>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md text-blue-100 hover:text-white hover:bg-blue-500/20"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="mt-6 px-3">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  group flex items-center px-3 py-3 text-sm font-medium rounded-lg mb-2 transition-all duration-200
                  ${isActive
                    ? 'bg-blue-100 text-blue-900 dark:bg-blue-900/50 dark:text-blue-100 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                  }
                `}
                onClick={onClose}
              >
                <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 group-hover:text-gray-500'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="absolute bottom-4 left-3 right-3">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">Hostel Management v1.0</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;