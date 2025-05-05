import { createBrowserRouter } from 'react-router-dom';
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

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout />,
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
        element: <Dashboard />
      }
    ]
  }
]); 