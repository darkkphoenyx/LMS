import { useState, useEffect } from 'react';
import { Search, DollarSign, AlertCircle, CheckCircle2, Plus, Edit, Trash2, X, ChevronRight } from 'lucide-react';
import { db, type Fine, type User, type Borrowing } from '../../lib/db';

// Add Fine Modal Component
interface AddFineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFine: (fine: Omit<Fine, 'id'>) => void;
  users: User[];
  borrowings: Borrowing[];
}

function AddFineModal({ isOpen, onClose, onAddFine, users, borrowings }: AddFineModalProps) {
  const [formData, setFormData] = useState<Omit<Fine, 'id'>>({
    userId: '',
    borrowingId: '',
    amount: 0,
    reason: '',
    status: 'unpaid',
    dueDate: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days from now
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddFine(formData);
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
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Add New Fine</h2>
              <p className="text-sm text-gray-500">Create a new fine record for overdue or damaged books</p>
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
          {/* User and Borrowing Selection */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Fine Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">User</label>
                <select
                  required
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={formData.userId}
                  onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                >
                  <option value="">Select a user</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Borrowing Record</label>
                <select
                  required
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={formData.borrowingId}
                  onChange={(e) => setFormData({ ...formData, borrowingId: e.target.value })}
                >
                  <option value="">Select a borrowing record</option>
                  {borrowings.map((borrowing) => (
                    <option key={borrowing.id} value={borrowing.id}>
                      {borrowing.bookId} - {new Date(borrowing.borrowDate).toLocaleDateString()}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Fine Information */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Fine Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Amount ($)</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Due Date</label>
                <input
                  type="date"
                  required
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={new Date(formData.dueDate).toISOString().split('T')[0]}
                  onChange={(e) => setFormData({ ...formData, dueDate: new Date(e.target.value).getTime() })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Reason</label>
                <textarea
                  required
                  rows={3}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  placeholder="Enter the reason for the fine..."
                />
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
              Create Fine
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Edit Fine Modal Component
interface EditFineModalProps {
  isOpen: boolean;
  onClose: () => void;
  fine: Fine | null;
  onEditFine: (fine: Fine) => void;
  users: User[];
  borrowings: Borrowing[];
}

function EditFineModal({ isOpen, onClose, fine, onEditFine, users, borrowings }: EditFineModalProps) {
  const [formData, setFormData] = useState<Fine | null>(fine);

  useEffect(() => {
    setFormData(fine);
  }, [fine]);

  if (!isOpen || !formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEditFine(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl pointer-events-auto border border-gray-200 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Fine</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">User</label>
              <select
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.userId}
                onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Borrowing</label>
              <select
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.borrowingId}
                onChange={(e) => setFormData({ ...formData, borrowingId: e.target.value })}
              >
                {borrowings.map((borrowing) => (
                  <option key={borrowing.id} value={borrowing.id}>
                    Borrowing #{borrowing.id}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                type="date"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={new Date(formData.dueDate).toISOString().split('T')[0]}
                onChange={(e) => setFormData({ ...formData, dueDate: new Date(e.target.value).getTime() })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Fine['status'] })}
              >
                <option value="unpaid">Unpaid</option>
                <option value="paid">Paid</option>
              </select>
            </div>
            {formData.status === 'paid' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Paid Date</label>
                <input
                  type="date"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.paidDate ? new Date(formData.paidDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                  onChange={(e) => setFormData({ ...formData, paidDate: new Date(e.target.value).getTime() })}
                />
              </div>
            )}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
              <textarea
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Delete Fine Modal Component
interface DeleteFineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  fine: Fine | null;
  getUserName: (userId: string) => string;
}

function DeleteFineModal({ isOpen, onClose, onDelete, fine, getUserName }: DeleteFineModalProps) {
  if (!isOpen || !fine) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="bg-white rounded-lg p-6 w-full max-w-md pointer-events-auto border border-gray-200 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Delete Fine</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <p className="mb-4 text-gray-600">
          Are you sure you want to delete the fine for {getUserName(fine.userId)}?
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

export function Fines() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'unpaid' | 'paid'>('unpaid');
  const [fines, setFines] = useState<Fine[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [borrowings, setBorrowings] = useState<Borrowing[]>([]);
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedFine, setSelectedFine] = useState<Fine | null>(null);

  useEffect(() => {
    seedFines();
    loadAll();
  }, []);

  const seedFines = async () => {
    const count = await db.fines.count();
    const allBorrowings = await db.borrowings.toArray();
    const allUsers = await db.users.toArray();
    if (count === 0 && allBorrowings.length > 0 && allUsers.length > 0) {
      const finesSeed: Omit<Fine, 'id'>[] = Array.from({ length: 20 }).map((_, i) => {
        const borrowing = allBorrowings[i % allBorrowings.length];
        const user = allUsers[i % allUsers.length];
        const now = Date.now() - i * 86400000;
        const due = now + 7 * 86400000;
        let status: Fine['status'] = 'unpaid';
        let paidDate: number | undefined = undefined;
        if (i % 3 === 0) { status = 'paid'; paidDate = due - 2 * 86400000; }
        return {
          borrowingId: borrowing.id,
          userId: user.id,
          amount: Math.floor(Math.random() * 50) + 5,
          dueDate: due,
          paidDate,
          status,
          reason: `Late return of book #${borrowing.id}`
        };
      });
      await db.fines.bulkAdd(finesSeed.map((f, i) => ({ ...f, id: (i + 1).toString() })));
    }
  };

  const loadAll = async () => {
    setUsers(await db.users.toArray());
    setBorrowings(await db.borrowings.toArray());
    setFines(await db.fines.toArray());
  };

  const getUserName = (userId: string) => {
    return users.find(user => user.id === userId)?.name || 'Unknown User';
  };

  const handleAddFine = async (data: Omit<Fine, 'id'>) => {
    const now = Date.now();
    const fine: Fine = { ...data, id: now.toString() };
    await db.fines.add(fine);
    await db.activities.add({
      id: now.toString(),
      type: 'fine',
      user: getUserName(fine.userId),
      book: 'Fine Added',
      time: new Date(now).toLocaleString(),
      status: 'completed',
      timestamp: now
    });
    await loadAll();
  };

  const handleEditFine = async (updated: Fine) => {
    await db.fines.put(updated);
    const now = Date.now();
    await db.activities.add({
      id: now.toString(),
      type: 'edit',
      user: getUserName(updated.userId),
      book: 'Fine Updated',
      time: new Date(now).toLocaleString(),
      status: 'completed',
      timestamp: now
    });
    await loadAll();
  };

  const handleDeleteFine = async () => {
    if (!selectedFine) return;
    await db.fines.delete(selectedFine.id);
    const now = Date.now();
    await db.activities.add({
      id: now.toString(),
      type: 'delete',
      user: getUserName(selectedFine.userId),
      book: 'Fine Deleted',
      time: new Date(now).toLocaleString(),
      status: 'completed',
      timestamp: now
    });
    await loadAll();
    setIsDeleteModalOpen(false);
    setSelectedFine(null);
  };

  const openEditModal = (fine: Fine) => {
    setSelectedFine(fine);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (fine: Fine) => {
    setSelectedFine(fine);
    setIsDeleteModalOpen(true);
  };

  const filteredFines = fines
    .filter(fine => fine.status === activeTab)
    .filter(fine => {
      const userName = getUserName(fine.userId).toLowerCase();
      return userName.includes(searchTerm.toLowerCase());
    });

  const totalUnpaid = fines
    .filter(fine => fine.status === 'unpaid')
    .reduce((sum, fine) => sum + fine.amount, 0);

  const totalPaid = fines
    .filter(fine => fine.status === 'paid')
    .reduce((sum, fine) => sum + fine.amount, 0);

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fines Management</h1>
          <p className="mt-1 text-sm text-gray-500">Manage and track library fines</p>
        </div>
        <button 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="w-5 h-5 mr-2" />
          New Fine
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Unpaid</p>
              <p className="text-2xl font-bold text-red-600 mt-1">${totalUnpaid.toFixed(2)}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Paid</p>
              <p className="text-2xl font-bold text-green-600 mt-1">${totalPaid.toFixed(2)}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Unpaid Fines</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{fines.filter(f => f.status === 'unpaid').length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Paid Fines</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{fines.filter(f => f.status === 'paid').length}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Tabs */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1 max-w-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by user name..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center">
            <nav className="flex space-x-4 p-1 bg-gray-100 rounded-lg">
              {[
                { id: 'unpaid', label: 'Unpaid', count: fines.filter(f => f.status === 'unpaid').length },
                { id: 'paid', label: 'Paid', count: fines.filter(f => f.status === 'paid').length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'unpaid' | 'paid')}
                  className={`${
                    activeTab === tab.id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  } px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center`}
                >
                  {tab.label}
                  <span className="ml-2 bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 text-xs">
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Fines Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFines.map((fine) => (
                <tr key={fine.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {getUserName(fine.userId).charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {getUserName(fine.userId)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Borrow ID: {fine.borrowingId}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${fine.amount.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(fine.dueDate).toLocaleDateString()}
                    </div>
                    {fine.paidDate && (
                      <div className="text-xs text-gray-500">
                        Paid: {new Date(fine.paidDate).toLocaleDateString()}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      fine.status === 'unpaid' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {fine.status === 'unpaid' ? (
                        <AlertCircle className="w-4 h-4 mr-1 inline" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 mr-1 inline" />
                      )}
                      {fine.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3">
                      <button 
                        onClick={() => openEditModal(fine)}
                        className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => openDeleteModal(fine)}
                        className="text-red-600 hover:text-red-900 transition-colors duration-200"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <AddFineModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddFine={handleAddFine}
        users={users}
        borrowings={borrowings}
      />

      <EditFineModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        fine={selectedFine}
        onEditFine={handleEditFine}
        users={users}
        borrowings={borrowings}
      />

      <DeleteFineModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteFine}
        fine={selectedFine}
        getUserName={getUserName}
      />
    </div>
  );
} 