import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, X } from 'lucide-react';
import { db, type User } from '../../lib/db';

const initialUsers: Omit<User, 'id'>[] = [
  { name: 'Alice Johnson', email: 'alice.johnson@example.com', role: 'admin', status: 'active', joinDate: Date.now() - 1000000000 },
  { name: 'Bob Smith', email: 'bob.smith@example.com', role: 'teacher', status: 'active', joinDate: Date.now() - 900000000 },
  { name: 'Carol Lee', email: 'carol.lee@example.com', role: 'student', status: 'inactive', joinDate: Date.now() - 800000000 },
  { name: 'David Kim', email: 'david.kim@example.com', role: 'teacher', status: 'active', joinDate: Date.now() - 700000000 },
  { name: 'Eva Brown', email: 'eva.brown@example.com', role: 'student', status: 'active', joinDate: Date.now() - 600000000 },
  { name: 'Frank Green', email: 'frank.green@example.com', role: 'admin', status: 'active', joinDate: Date.now() - 500000000 },
  { name: 'Grace Hall', email: 'grace.hall@example.com', role: 'teacher', status: 'inactive', joinDate: Date.now() - 400000000 },
  { name: 'Henry Young', email: 'henry.young@example.com', role: 'student', status: 'active', joinDate: Date.now() - 300000000 },
  { name: 'Ivy King', email: 'ivy.king@example.com', role: 'student', status: 'active', joinDate: Date.now() - 200000000 },
  { name: 'Jack White', email: 'jack.white@example.com', role: 'teacher', status: 'active', joinDate: Date.now() - 100000000 },
  { name: 'Karen Black', email: 'karen.black@example.com', role: 'admin', status: 'active', joinDate: Date.now() - 950000000 },
  { name: 'Leo Adams', email: 'leo.adams@example.com', role: 'student', status: 'inactive', joinDate: Date.now() - 850000000 },
  { name: 'Mona Clark', email: 'mona.clark@example.com', role: 'teacher', status: 'active', joinDate: Date.now() - 750000000 },
  { name: 'Nina Scott', email: 'nina.scott@example.com', role: 'student', status: 'active', joinDate: Date.now() - 650000000 },
  { name: 'Oscar Turner', email: 'oscar.turner@example.com', role: 'admin', status: 'active', joinDate: Date.now() - 550000000 },
  { name: 'Paula Evans', email: 'paula.evans@example.com', role: 'teacher', status: 'inactive', joinDate: Date.now() - 450000000 },
  { name: 'Quinn Baker', email: 'quinn.baker@example.com', role: 'student', status: 'active', joinDate: Date.now() - 350000000 },
  { name: 'Rita Perez', email: 'rita.perez@example.com', role: 'student', status: 'active', joinDate: Date.now() - 250000000 },
  { name: 'Sam Reed', email: 'sam.reed@example.com', role: 'teacher', status: 'active', joinDate: Date.now() - 150000000 },
  { name: 'Tina Morris', email: 'tina.morris@example.com', role: 'student', status: 'active', joinDate: Date.now() - 50000000 },
];

export function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addForm, setAddForm] = useState<Omit<User, 'id' | 'joinDate'>>({
    name: '',
    email: '',
    role: 'student',
    status: 'active',
  });
  const [addError, setAddError] = useState<string | null>(null);

  // Edit modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState<User | null>(null);
  const [editError, setEditError] = useState<string | null>(null);

  // Delete modal state
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Filter and sort state
  const [selectedRole, setSelectedRole] = useState<'all' | 'admin' | 'teacher' | 'student'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [sortField, setSortField] = useState<'name' | 'email' | 'role' | 'status' | 'joinDate'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    seedUsers();
    loadUsers();
  }, []);

  const seedUsers = async () => {
    const count = await db.users.count();
    if (count === 0) {
      const usersWithIds = initialUsers.map((user, idx) => ({ ...user, id: (idx + 1).toString() }));
      await db.users.bulkAdd(usersWithIds);
    }
  };

  const loadUsers = async () => {
    const allUsers = await db.users.toArray();
    setUsers(allUsers);
  };

  // Filtering
  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Sorting
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError(null);
    if (!addForm.name.trim() || !addForm.email.trim()) {
      setAddError('Name and email are required.');
      return;
    }
    try {
      const newUser: User = {
        ...addForm,
        id: Date.now().toString(),
        joinDate: Date.now(),
      };
      await db.users.add(newUser);
      
      // Add notification for new user
      const now = Date.now();
      await db.notifications.add({
        id: now.toString(),
        type: 'user',
        title: 'New User Added',
        message: `A new ${newUser.role} "${newUser.name}" has been added to the system.`,
        timestamp: now,
        read: false,
        priority: 'medium',
        action: {
          label: 'View User',
          url: `/users/${newUser.id}`
        }
      });

      setIsAddModalOpen(false);
      setAddForm({ name: '', email: '', role: 'student', status: 'active' });
      await loadUsers();
    } catch (err) {
      setAddError('Failed to add user.');
      console.error('Error adding user:', err);
    }
  };

  const openEditModal = (user: User) => {
    setEditForm(user);
    setEditError(null);
    setIsEditModalOpen(true);
  };

  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm) return;
    setEditError(null);
    if (!editForm.name.trim() || !editForm.email.trim()) {
      setEditError('Name and email are required.');
      return;
    }
    try {
      await db.users.put(editForm);
      setIsEditModalOpen(false);
      setEditForm(null);
      await loadUsers();
    } catch (err) {
      setEditError('Failed to update user.');
      console.error('Error updating user:', err);
    }
  };

  const openDeleteModal = (userId: string) => {
    setDeleteUserId(userId);
    setDeleteModalOpen(true);
  };

  const handleDeleteUser = async () => {
    if (!deleteUserId) return;
    try {
      await db.users.delete(deleteUserId);
      setDeleteModalOpen(false);
      setDeleteUserId(null);
      await loadUsers();
    } catch (err) {
      // Optionally set error state
      setDeleteModalOpen(false);
      setDeleteUserId(null);
      console.error('Error deleting user:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-end items-center">
        <button
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add User
        </button>
      </div>

      {/* Filter and Sort Controls */}
      <div className="w-full mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          {/* Search */}
          <div className="w-full">
            <label className="block md:hidden text-xs font-semibold mb-1 text-gray-600">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or email..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          {/* Role Filter */}
          <div className="w-full">
            <label className="block md:hidden text-xs font-semibold mb-1 text-gray-600">Role</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedRole}
              onChange={e => setSelectedRole(e.target.value as any)}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </div>
          {/* Status Filter */}
          <div className="w-full">
            <label className="block md:hidden text-xs font-semibold mb-1 text-gray-600">Status</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value as any)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          {/* Sorting Controls */}
          <div className="w-full flex flex-col sm:flex-row gap-2 md:justify-end">
            <div className="flex-1">
              <label className="block md:hidden text-xs font-semibold mb-1 text-gray-600">Sort by</label>
              <select
                className="w-full px-2 py-1 border border-gray-300 rounded"
                value={sortField}
                onChange={e => setSortField(e.target.value as any)}
              >
                <option value="name">Name</option>
                <option value="email">Email</option>
                <option value="role">Role</option>
                <option value="status">Status</option>
                <option value="joinDate">Join Date</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block md:hidden text-xs font-semibold mb-1 text-gray-600">Direction</label>
              <select
                className="w-full px-2 py-1 border border-gray-300 rounded"
                value={sortDirection}
                onChange={e => setSortDirection(e.target.value as any)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Join Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                    user.role === 'teacher' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.joinDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    className="text-blue-600 hover:text-blue-900 mr-4"
                    onClick={() => openEditModal(user)}
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => openDeleteModal(user.id)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl pointer-events-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New User</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={addForm.name}
                  onChange={e => setAddForm({ ...addForm, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={addForm.email}
                  onChange={e => setAddForm({ ...addForm, email: e.target.value })}
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={addForm.role}
                    onChange={e => setAddForm({ ...addForm, role: e.target.value as User['role'] })}
                  >
                    <option value="admin">Admin</option>
                    <option value="teacher">Teacher</option>
                    <option value="student">Student</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={addForm.status}
                    onChange={e => setAddForm({ ...addForm, status: e.target.value as User['status'] })}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              {addError && <div className="text-red-600 text-sm">{addError}</div>}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && editForm && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl pointer-events-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit User</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleEditUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editForm.name}
                  onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editForm.email}
                  onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={editForm.role}
                    onChange={e => setEditForm({ ...editForm, role: e.target.value as User['role'] })}
                  >
                    <option value="admin">Admin</option>
                    <option value="teacher">Teacher</option>
                    <option value="student">Student</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={editForm.status}
                    onChange={e => setEditForm({ ...editForm, status: e.target.value as User['status'] })}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              {editError && <div className="text-red-600 text-sm">{editError}</div>}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete User Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-xs shadow-lg border border-gray-200 pointer-events-auto">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Delete User</h2>
            <p className="mb-6 text-gray-700">Are you sure you want to delete this user? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                onClick={() => { setDeleteModalOpen(false); setDeleteUserId(null); }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
                onClick={handleDeleteUser}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 