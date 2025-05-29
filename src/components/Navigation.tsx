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
  Bookmark, 
  Search,
  User
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
  },
  {
    name: 'Profile',
    href: '/admin/profile',
    icon: User,
    description: 'View and edit your profile'
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
              group flex items-center px-3 py-2 text-sm font-medium rounded-md
              ${isActive
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }
            `}
          >
            <item.icon
              className={`
                mr-3 flex-shrink-0 h-6 w-6
                ${isActive ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-500'}
              `}
              aria-hidden="true"
            />
            <div>
              <span className="block">{item.name}</span>
              <span className="block text-xs text-gray-500">{item.description}</span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
} 