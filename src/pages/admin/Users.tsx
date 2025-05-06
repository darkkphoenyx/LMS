import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, X, UserIcon, Calendar, Shield, CheckCircle2, XCircle } from 'lucide-react';
import { db, type User } from '../../lib/db';

// Add avatar URLs for dummy users
const userAvatars: { [key: string]: string } = {
  // Female users
  'Alice Johnson': 'https://i.pravatar.cc/150?img=32',
  'Carol Lee': 'https://i.pravatar.cc/150?img=33',
  'Eva Brown': 'https://i.pravatar.cc/150?img=34',
  'Grace Hall': 'https://i.pravatar.cc/150?img=35',
  'Ivy King': 'https://i.pravatar.cc/150?img=36',
  'Karen Black': 'https://i.pravatar.cc/150?img=37',
  'Mona Clark': 'https://i.pravatar.cc/150?img=38',
  'Nina Scott': 'https://i.pravatar.cc/150?img=39',
  'Paula Evans': 'https://i.pravatar.cc/150?img=40',
  'Rita Perez': 'https://i.pravatar.cc/150?img=41',
  'Tina Morris': 'https://i.pravatar.cc/150?img=42',

  // Male users
  'Bob Smith': 'https://i.pravatar.cc/150?img=1',
  'David Kim': 'https://i.pravatar.cc/150?img=2',
  'Frank Green': 'https://i.pravatar.cc/150?img=3',
  'Henry Young': 'https://i.pravatar.cc/150?img=4',
  'Jack White': 'https://i.pravatar.cc/150?img=5',
  'Leo Adams': 'https://i.pravatar.cc/150?img=6',
  'Oscar Turner': 'https://i.pravatar.cc/150?img=7',
  'Quinn Baker': 'https://i.pravatar.cc/150?img=8',
  'Sam Reed': 'https://i.pravatar.cc/150?img=9',
};

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

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (user: Omit<User, 'id' | 'joinDate'>) => void;
}

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

  const handleAddUser = async (userData: Omit<User, 'id' | 'joinDate'>) => {
    try {
      const newUser: User = {
        ...userData,
        id: crypto.randomUUID(),
        joinDate: Date.now()
      };
      await db.users.add(newUser);
      await loadUsers();
      setIsAddModalOpen(false);
      setAddError('');
    } catch (error) {
      setAddError('Failed to add user. Please try again.');
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your library users and their permissions</p>
        </div>
        <button
          className="flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add User
        </button>
      </div>

      {/* Filter and Sort Controls */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          {/* Search */}
          <div className="w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or email..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          {/* Role Filter */}
          <div className="w-full">
            <select
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
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
            <select
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value as any)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          {/* Sorting Controls */}
          <div className="w-full flex gap-2">
            <select
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              value={sortField}
              onChange={e => setSortField(e.target.value as any)}
            >
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="role">Role</option>
              <option value="status">Status</option>
              <option value="joinDate">Join Date</option>
            </select>
            <select
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              value={sortDirection}
              onChange={e => setSortDirection(e.target.value as any)}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100"
          >
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={userAvatars[user.name] || `https://i.pravatar.cc/150?u=${user.id}`}
                    alt={user.name}
                    className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-sm"
                  />
                  <span className={`absolute -bottom-1 -right-1 p-1 rounded-full border-2 border-white ${
                    user.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {user.status === 'active' ? (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    ) : (
                      <XCircle className="w-4 h-4 text-white" />
                    )}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Shield className="w-4 h-4 mr-2 text-gray-400" />
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                    user.role === 'teacher' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => openEditModal(user)}
                  className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  title="Edit user"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => openDeleteModal(user.id)}
                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200"
                  title="Delete user"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add User Modal */}
      {isAddModalOpen && (
        <AddUserModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddUser={handleAddUser}
        />
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && editForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-xl">
                  <UserIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Edit User</h2>
                  <p className="text-sm text-gray-500">Update user account information</p>
                </div>
              </div>
              <button 
                onClick={() => setIsEditModalOpen(false)} 
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditUser} className="space-y-6">
              {/* Profile Section */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Profile Information</h3>
                <div className="grid grid-cols-12 gap-6">
                  {/* Avatar Upload */}
                  <div className="col-span-4">
                    <div className="aspect-square bg-white rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-3 hover:border-blue-500 transition-all duration-200 cursor-pointer relative group">
                      {editForm.imageUrl ? (
                        <>
                          <img
                            src={editForm.imageUrl}
                            alt="User avatar preview"
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => setEditForm({ ...editForm, imageUrl: '' })}
                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <UserIcon className="w-10 h-10 text-gray-300 mb-2" />
                          <span className="text-sm text-gray-500 text-center">Click to upload photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setEditForm({ ...editForm, imageUrl: reader.result as string });
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </>
                      )}
                    </div>
                  </div>

                  {/* Basic Info */}
                  <div className="col-span-8 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter user's full name"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        value={editForm.name}
                        onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="Enter user's email address"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        value={editForm.email}
                        onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Settings */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Account Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Role</label>
                    <select
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      value={editForm.role}
                      onChange={e => setEditForm({ ...editForm, role: e.target.value as User['role'] })}
                    >
                      <option value="admin">Administrator</option>
                      <option value="teacher">Teacher</option>
                      <option value="student">Student</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                    <select
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      value={editForm.status}
                      onChange={e => setEditForm({ ...editForm, status: e.target.value as User['status'] })}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              {editError && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {editError}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-5 w-full max-w-sm border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-red-50 rounded-lg">
                <Trash2 className="w-4 h-4 text-red-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Delete User</h2>
            </div>
            <p className="mb-6 text-sm text-gray-600">Are you sure you want to delete this user? This action cannot be undone.</p>
            <div className="flex justify-end space-x-2">
              <button
                className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                onClick={() => { setDeleteModalOpen(false); setDeleteUserId(null); }}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all duration-200"
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

function AddUserModal({ isOpen, onClose, onAddUser }: AddUserModalProps) {
  const [formData, setFormData] = useState<Omit<User, 'id' | 'joinDate'>>({
    name: '',
    email: '',
    role: 'student',
    status: 'active',
    imageUrl: ''
  });
  const [previewImage, setPreviewImage] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setFormData({ ...formData, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddUser(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-xl">
              <UserIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Add New User</h2>
              <p className="text-sm text-gray-500">Create a new user account in the system</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Section */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Profile Information</h3>
            <div className="grid grid-cols-12 gap-6">
              {/* Avatar Upload */}
              <div className="col-span-4">
                <div className="aspect-square bg-white rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-3 hover:border-blue-500 transition-all duration-200 cursor-pointer relative group">
                  {previewImage ? (
                    <>
                      <img
                        src={previewImage}
                        alt="User avatar preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewImage('');
                          setFormData({ ...formData, imageUrl: '' });
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <UserIcon className="w-10 h-10 text-gray-300 mb-2" />
                      <span className="text-sm text-gray-500 text-center">Click to upload photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </>
                  )}
                </div>
              </div>

              {/* Basic Info */}
              <div className="col-span-8 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter user's full name"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter user's email address"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Account Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Role</label>
                <select
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={formData.role}
                  onChange={e => setFormData({ ...formData, role: e.target.value as User['role'] })}
                >
                  <option value="admin">Administrator</option>
                  <option value="teacher">Teacher</option>
                  <option value="student">Student</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                <select
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value as User['status'] })}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 