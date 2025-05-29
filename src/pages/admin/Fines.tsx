import { useState, useEffect } from 'react';
import { Search, DollarSign, AlertCircle, CheckCircle2, Plus, Edit, Trash2, X } from 'lucide-react';
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
    borrowingId: '',
    userId: '',
    amount: 0,
    dueDate: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days from now
    status: 'unpaid',
    reason: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddFine(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl pointer-events-auto border border-gray-200 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Fine</h2>
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
                <option value="">Select a user</option>
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
                <option value="">Select a borrowing</option>
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
              Add Fine
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
    <div className="space-y-6">
      {/* First Row: Totals on left, Add New Fine button on right */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm text-gray-500">Total Unpaid</div>
            <div className="text-xl font-semibold text-red-600">${totalUnpaid.toFixed(2)}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Total Paid</div>
            <div className="text-xl font-semibold text-green-600">${totalPaid.toFixed(2)}</div>
          </div>
        </div>
        <button 
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="w-5 h-5 mr-2" />
          New Fine
        </button>
      </div>

      {/* Second Row: Search on left, Unpaid/Paid tabs on right */}
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by user name..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center">
          <nav className="-mb-px flex space-x-8 border-b border-gray-200">
            {[
              { id: 'unpaid', label: 'Unpaid', count: fines.filter(f => f.status === 'unpaid').length },
              { id: 'paid', label: 'Paid', count: fines.filter(f => f.status === 'paid').length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'unpaid' | 'paid')}
                className={`${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
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

      {/* Fines Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredFines.map((fine) => (
              <tr key={fine.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {getUserName(fine.userId)}
                  </div>
                  <div className="text-xs text-gray-500">
                    Borrow ID: {fine.borrowingId}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    ${fine.amount.toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {new Date(fine.dueDate).toLocaleDateString()}
                  </div>
                  {fine.paidDate && (
                    <div className="text-xs text-gray-500">
                      Paid: {new Date(fine.paidDate).toLocaleDateString()}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    fine.status === 'unpaid' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {fine.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button 
                      onClick={() => openEditModal(fine)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => openDeleteModal(fine)}
                      className="text-red-600 hover:text-red-900"
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