import { Outlet, useLocation } from 'react-router-dom';
import { Navigation } from './Navigation';
import { LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const pageTitles: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/books': 'Books',
  '/admin/users': 'Users',
  '/admin/borrowings': 'Borrowings',
  '/admin/fines': 'Fines',
  '/admin/settings': 'Settings',
  '/admin/notifications': 'Notifications',
  '/admin/reservations': 'Reservations',
  '/admin/profile': 'Profile',
};

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const title = pageTitles[location.pathname] || (location.pathname.split('/').pop()?.replace(/^[a-z]/, c => c.toUpperCase()) || 'Dashboard');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar */}
      <div className="lg:hidden">
        {/* Sidebar */}
        <div 
          className={`fixed inset-y-0 left-0 flex flex-col w-64 bg-white transform transition-transform duration-200 ease-in-out z-50 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center justify-between px-4">
              <h1 className="text-xl font-bold text-gray-900">Library Management</h1>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-900"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-5 flex-1 px-3">
              <Navigation onNavigate={() => setSidebarOpen(false)} />
            </div>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <button className="flex items-center text-gray-600 hover:text-gray-900">
              <LogOut className="h-5 w-5 mr-2" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:pt-5 lg:pb-4 lg:bg-white">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-xl font-bold text-gray-900">Library Management</h1>
        </div>
        <div className="mt-5 flex-1 flex flex-col overflow-y-auto">
          <div className="px-3">
            <Navigation />
          </div>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <button className="flex items-center text-gray-600 hover:text-gray-900">
            <LogOut className="h-5 w-5 mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span className="sr-only">Toggle sidebar</span>
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <h2 className="text-lg font-medium text-gray-900 self-center">
                {title}
              </h2>
            </div>
          </div>
        </div>

        <main className="flex-1 pb-8">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 