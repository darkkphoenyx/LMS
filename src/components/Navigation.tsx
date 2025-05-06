import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Book, 
  Users, 
  Calendar, 
  DollarSign, 
  BarChart2, 
  Settings, 
  Bell, 
  Bookmark
} from 'lucide-react';

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
    description: 'Overview of library statistics and recent activity'
  },
  {
    name: 'Books',
    href: '/admin/books',
    icon: Book,
    description: 'Manage book inventory and categories'
  },
  {
    name: 'Users',
    href: '/admin/users',
    icon: Users,
    description: 'Manage user accounts and permissions'
  },
  {
    name: 'Borrowings',
    href: '/admin/borrowings',
    icon: Calendar,
    description: 'Track book loans and returns'
  },
  {
    name: 'Fines',
    href: '/admin/fines',
    icon: DollarSign,
    description: 'Manage overdue fines and payments'
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    description: 'Configure system settings and rules'
  },
  {
    name: 'Notifications',
    href: '/admin/notifications',
    icon: Bell,
    description: 'View and manage system notifications'
  },
  {
    name: 'Reservations',
    href: '/admin/reservations',
    icon: Bookmark,
    description: 'Manage book reservations and waitlists'
  }
];

interface NavigationProps {
  onNavigate?: () => void;
}

export function Navigation({ onNavigate }: NavigationProps) {
  const location = useLocation();

  const handleClick = () => {
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <nav className="space-y-1">
      {navigation.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={item.name}
            to={item.href}
            onClick={handleClick}
            className={`
              group flex items-center px-4 py-3 text-sm font-medium rounded-lg
              transition-all duration-200 ease-in-out
              ${isActive
                ? 'bg-blue-50 text-blue-700 shadow-sm'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }
            `}
          >
            <div className={`
              p-2 rounded-lg mr-3
              transition-colors duration-200
              ${isActive 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-700'
              }
            `}>
              <item.icon
                className="h-5 w-5"
                aria-hidden="true"
              />
            </div>
            <div className="flex-1">
              <span className="block font-medium">{item.name}</span>
              <span className="block text-xs text-gray-500 mt-0.5">{item.description}</span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
} 