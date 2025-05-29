import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AdminLayout } from '../components/AdminLayout';
import { Dashboard } from '../pages/admin/Dashboard';
import { Books } from '../pages/admin/Books';
import { Users } from '../pages/admin/Users';
import { Borrowings } from '../pages/admin/Borrowings';
import { Fines } from '../pages/admin/Fines';
import { Reports } from '../pages/admin/Reports';
import { Settings } from '../pages/admin/Settings';
import Notifications from '../pages/admin/Notifications';
import Reservations from '../pages/admin/Reservations';
import { SearchPage } from '../pages/admin/Search';
import { Profile } from '../pages/admin/Profile';
import { Login } from '../pages/Login';

// Authentication check function
const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'admin/dashboard',
        element: <Dashboard />
      },
      {
        path: 'admin/books',
        element: <Books />
      },
      {
        path: 'admin/users',
        element: <Users />
      },
      {
        path: 'admin/borrowings',
        element: <Borrowings />
      },
      {
        path: 'admin/fines',
        element: <Fines />
      },
      {
        path: 'admin/reports',
        element: <Reports />
      },
      {
        path: 'admin/settings',
        element: <Settings />
      },
      {
        path: 'admin/notifications',
        element: <Notifications />
      },
      {
        path: 'admin/reservations',
        element: <Reservations />
      },
      {
        path: 'admin/search',
        element: <SearchPage />
      },
      {
        path: 'admin/profile',
        element: <Profile />
      },
      {
        path: '*',
        element: <Navigate to="/admin/dashboard" replace />
      }
    ]
  }
]); 