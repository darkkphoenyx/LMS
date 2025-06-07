import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserAvatarProps {
  name: string;
  email: string;
  onSignOut: () => void;
  isMobile?: boolean;
}

export default function UserAvatar({ name, email, onSignOut, isMobile = false }: UserAvatarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    setIsOpen(false);
    onSignOut(); // Notify parent component
    navigate('/');
  };

  return (
    <div className={`relative ${isMobile ? 'inline-flex justify-center' : ''}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors cursor-pointer ${
          isMobile ? 'mx-auto' : ''
        }`}
      >
        {getInitials(name)}
      </button>

      {isOpen && (
        <div className={`${
          isMobile 
            ? 'absolute left-1/2 -translate-x-1/2 w-48 mt-2' 
            : 'absolute right-0 mt-2 w-48'
        } bg-white rounded-lg shadow-lg py-1 z-50`}>
          <div className="px-4 py-2 border-b">
            <p className="text-sm font-medium text-gray-900">{name}</p>
            <p className="text-xs text-gray-500 truncate">{email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
} 