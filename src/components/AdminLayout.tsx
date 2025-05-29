import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Navigation } from './Navigation';
import { LogOut, Menu, X, User, Settings, ChevronDown, BookOpen } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

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
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);
  const title = pageTitles[location.pathname] || (location.pathname.split('/').pop()?.replace(/^[a-z]/, c => c.toUpperCase()) || 'Dashboard');

  // Handle click outside to close profile dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close profile dropdown when route changes
  useEffect(() => {
    setProfileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className="lg:hidden">
        {/* Sidebar */}
        <div 
          className={`fixed inset-y-0 left-0 flex flex-col w-72 bg-gradient-to-b from-white to-gray-50 transform transition-transform duration-300 ease-in-out z-50 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center justify-between px-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">BookWorm</h1>
              </div>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-8 flex-1 px-4">
              <Navigation onNavigate={() => setSidebarOpen(false)} />
            </div>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <button 
              onClick={handleLogout}
              className="flex items-center text-red-600 hover:text-red-700 transition-colors duration-200"
            >
              <LogOut className="h-5 w-5 mr-2" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:pt-5 lg:pb-4 lg:bg-gradient-to-b lg:from-white lg:to-gray-50">
        <div className="flex items-center flex-shrink-0 px-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">BookWorm</h1>
          </div>
        </div>
        <div className="mt-8 flex-1 flex flex-col overflow-y-auto">
          <div className="px-4">
            <Navigation />
          </div>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <button 
            onClick={handleLogout}
            className="flex items-center text-red-600 hover:text-red-700 transition-colors duration-200"
          >
            <LogOut className="h-5 w-5 mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow-sm">
          <button
            type="button"
            className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex flex-1 justify-between px-4">
            <div className="flex flex-1">
              <h1 className="text-2xl font-semibold text-gray-900 flex items-center">{title}</h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative" ref={profileRef}>
                <button
                  type="button"
                  className="flex items-center max-w-xs bg-white hover:bg-gray-50 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center shadow-sm">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-3 mr-2 hidden md:block">
                    <p className="text-sm font-medium text-gray-900">Admin</p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown */}
                {profileOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-lg py-1 bg-white focus:outline-none animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">Admin</p>
                      <p className="text-xs text-gray-500 truncate">admin@bookworm.com</p>
                    </div>
                    <a
                      href="/admin/profile"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center transition-colors duration-200"
                    >
                      <User className="h-4 w-4 mr-2 text-gray-500" />
                      Your Profile
                    </a>
                    <a
                      href="/admin/settings"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center transition-colors duration-200"
                    >
                      <Settings className="h-4 w-4 mr-2 text-gray-500" />
                      Settings
                    </a>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center transition-colors duration-200"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
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