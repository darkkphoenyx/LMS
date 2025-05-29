import { useState, useEffect } from 'react';
import { Bell, AlertCircle, Mail, CheckCircle2, XCircle, Filter, Search, X, Plus } from 'lucide-react';
import { db, type Notification } from '../../lib/db';

// Helper Components
const NotificationIcon = ({ type }: { type: Notification['type'] }) => {
  const colors = {
    system: 'bg-blue-100 text-blue-600',
    alert: 'bg-red-100 text-red-600',
    user: 'bg-green-100 text-green-600'
  };

  return (
    <div className={`flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full ${colors[type]}`}>
      {type === 'system' ? <Bell className="w-5 h-5" /> :
       type === 'alert' ? <AlertCircle className="w-5 h-5" /> :
       <Mail className="w-5 h-5" />}
    </div>
  );
};

const PriorityBadge = ({ priority }: { priority: Notification['priority'] }) => {
  const colors = {
    high: 'bg-red-100 text-red-800 border border-red-200',
    medium: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    low: 'bg-green-100 text-green-800 border border-green-200'
  };

  return (
    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${colors[priority]}`}>
      {priority}
    </span>
  );
};

const StatusIcon = ({ read }: { read: boolean }) => (
  <div className="group relative">
    {read ? (
      <CheckCircle2 className="w-5 h-5 text-green-600" />
    ) : (
      <XCircle className="w-5 h-5 text-red-600" />
    )}
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
      {read ? 'Read' : 'Unread'}
    </div>
  </div>
);

const ActionButton = ({ 
  icon: Icon, 
  label, 
  onClick, 
  color 
}: { 
  icon: any, 
  label: string, 
  onClick: () => void, 
  color: string 
}) => (
  <button
    onClick={onClick}
    className={`group relative p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 ${color}`}
  >
    <Icon className="w-5 h-5" />
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
      {label}
    </div>
  </button>
);

// Add Notification Modal Component
interface AddNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNotification: (notification: Omit<Notification, 'id'>) => void;
}

function AddNotificationModal({ isOpen, onClose, onAddNotification }: AddNotificationModalProps) {
  const [formData, setFormData] = useState<Omit<Notification, 'id'>>({
    type: 'system',
    title: '',
    message: '',
    timestamp: Date.now(),
    read: false,
    priority: 'medium'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddNotification(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl pointer-events-auto border border-gray-200 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Notification</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as Notification['type'] })}
              >
                <option value="system">System</option>
                <option value="alert">Alert</option>
                <option value="user">User</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as Notification['priority'] })}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Action Label (Optional)</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.action?.label || ''}
                onChange={(e) => {
                  const label = e.target.value;
                  const url = formData.action?.url || '';
                  setFormData({ 
                    ...formData, 
                    action: label && url ? { label, url } : undefined 
                  });
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Action URL (Optional)</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.action?.url || ''}
                onChange={(e) => {
                  const url = e.target.value;
                  const label = formData.action?.label || '';
                  setFormData({ 
                    ...formData, 
                    action: label && url ? { label, url } : undefined 
                  });
                }}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Add Notification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Delete Notification Modal Component
interface DeleteNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  notification: Notification | null;
}

function DeleteNotificationModal({ isOpen, onClose, onDelete, notification }: DeleteNotificationModalProps) {
  if (!isOpen || !notification) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="bg-white rounded-lg p-6 w-full max-w-md pointer-events-auto border border-gray-200 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Delete Notification</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <p className="mb-4 text-gray-600">
          Are you sure you want to delete the notification "{notification.title}"?
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// Filter Component
interface FilterSectionProps {
  filterType: string;
  filterPriority: string;
  filterRead: string;
  onTypeChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onReadChange: (value: string) => void;
}

const FilterSection = ({ 
  filterType, 
  filterPriority, 
  filterRead, 
  onTypeChange, 
  onPriorityChange, 
  onReadChange 
}: FilterSectionProps) => (
  <div className="flex items-center space-x-4">
    <div className="flex-1">
      <select
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={filterType}
        onChange={(e) => onTypeChange(e.target.value)}
      >
        <option value="all">All Types</option>
        <option value="system">System</option>
        <option value="alert">Alert</option>
        <option value="user">User</option>
      </select>
    </div>
    <div className="flex-1">
      <select
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={filterPriority}
        onChange={(e) => onPriorityChange(e.target.value)}
      >
        <option value="all">All Priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>
    <div className="flex-1">
      <select
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={filterRead}
        onChange={(e) => onReadChange(e.target.value)}
      >
        <option value="all">All Status</option>
        <option value="read">Read</option>
        <option value="unread">Unread</option>
      </select>
    </div>
  </div>
);

const Notifications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'system' | 'alert' | 'user'>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [filterRead, setFilterRead] = useState<'all' | 'read' | 'unread'>('all');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const count = await db.notifications.count();
      if (count === 0) {
        // Seed initial notifications if none exist
        const seedNotifications: Notification[] = [
          {
            id: '1',
            type: 'system',
            title: 'System Update Available',
            message: 'A new version of the library management system is available for installation.',
            timestamp: Date.now() - 3600000, // 1 hour ago
            read: false,
            priority: 'medium',
            action: {
              label: 'View Update',
              url: '/system/updates'
            }
          },
          {
            id: '2',
            type: 'alert',
            title: 'High CPU Usage',
            message: 'Server CPU usage has exceeded 90% for the last 15 minutes.',
            timestamp: Date.now() - 7200000, // 2 hours ago
            read: false,
            priority: 'high'
          },
          {
            id: '3',
            type: 'user',
            title: 'New User Registration',
            message: 'A new user has registered in the system.',
            timestamp: Date.now() - 86400000, // 1 day ago
            read: true,
            priority: 'low',
            action: {
              label: 'View User',
              url: '/users/123'
            }
          },
          {
            id: '4',
            type: 'system',
            title: 'Backup Completed',
            message: 'The daily system backup has been completed successfully.',
            timestamp: Date.now() - 172800000, // 2 days ago
            read: true,
            priority: 'low'
          }
        ];
        await db.notifications.bulkAdd(seedNotifications);
      }
      const allNotifications = await db.notifications.toArray();
      setNotifications(allNotifications);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const handleAddNotification = async (data: Omit<Notification, 'id'>) => {
    const now = Date.now();
    const notification: Notification = { ...data, id: now.toString() };
    await db.notifications.add(notification);
    await db.activities.add({
      id: now.toString(),
      type: 'add',
      user: 'System',
      book: 'Notification Added',
      time: new Date(now).toLocaleString(),
      status: 'completed',
      timestamp: now
    });
    await loadNotifications();
  };

  const markAsRead = async (id: string) => {
    try {
      await db.notifications.update(id, { read: true });
      setNotifications(notifications.map(n => 
        n.id === id ? { ...n, read: true } : n
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleDeleteNotification = async () => {
    if (!selectedNotification) return;
    await db.notifications.delete(selectedNotification.id);
    const now = Date.now();
    await db.activities.add({
      id: now.toString(),
      type: 'delete',
      user: 'System',
      book: 'Notification Deleted',
      time: new Date(now).toLocaleString(),
      status: 'completed',
      timestamp: now
    });
    await loadNotifications();
    setIsDeleteModalOpen(false);
    setSelectedNotification(null);
  };

  const openDeleteModal = (notification: Notification) => {
    setSelectedNotification(notification);
    setIsDeleteModalOpen(true);
  };

  const filteredNotifications = notifications
    .filter(notification => {
      const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           notification.message.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || notification.type === filterType;
      const matchesPriority = filterPriority === 'all' || notification.priority === filterPriority;
      const matchesRead = filterRead === 'all' || 
                         (filterRead === 'read' && notification.read) ||
                         (filterRead === 'unread' && !notification.read);
      
      return matchesSearch && matchesType && matchesPriority && matchesRead;
    })
    .sort((a, b) => b.timestamp - a.timestamp); // Sort by timestamp in descending order

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <div className="flex-1" />
        <button 
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ml-auto"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="w-5 h-5 mr-2" />
          New Notification
        </button>
      </div>

      {/* Search and Filter Row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex-1 max-w-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search notifications..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <FilterSection
            filterType={filterType}
            filterPriority={filterPriority}
            filterRead={filterRead}
            onTypeChange={(value) => setFilterType(value as any)}
            onPriorityChange={(value) => setFilterPriority(value as any)}
            onReadChange={(value) => setFilterRead(value as any)}
          />
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            {unreadCount} Unread
          </span>
        </div>
      </div>

      {/* Notifications Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notification
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredNotifications.map((notification) => (
                <tr 
                  key={notification.id} 
                  className={`hover:bg-gray-50 transition-colors duration-150 ${
                    notification.read ? 'bg-gray-50' : 'bg-white'
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-start">
                      <NotificationIcon type={notification.type} />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{notification.title}</div>
                        <div className="mt-1 text-sm text-gray-500 line-clamp-2">{notification.message}</div>
                        {notification.action && (
                          <div className="mt-2">
                            <a
                              href={notification.action.url}
                              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-900 group"
                            >
                              {notification.action.label}
                              <svg className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                              </svg>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <PriorityBadge priority={notification.priority} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(notification.timestamp).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(notification.timestamp).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusIcon read={notification.read} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      {!notification.read && (
                        <ActionButton
                          icon={CheckCircle2}
                          label="Mark as Read"
                          onClick={() => markAsRead(notification.id)}
                          color="text-green-600 hover:text-green-900"
                        />
                      )}
                      <ActionButton
                        icon={X}
                        label="Delete"
                        onClick={() => openDeleteModal(notification)}
                        color="text-red-600 hover:text-red-900"
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {filteredNotifications.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    No notifications found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <AddNotificationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddNotification={handleAddNotification}
      />

      <DeleteNotificationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteNotification}
        notification={selectedNotification}
      />
    </div>
  );
};

export default Notifications; 