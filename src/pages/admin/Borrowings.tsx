import { useState, useEffect } from 'react';
import { Plus, Search, CheckCircle2, AlertCircle, Clock, Edit, Trash2, X } from 'lucide-react';
import { db, type Borrowing, type Book, type User } from '../../lib/db';

// Add Borrowing Modal Component
interface AddBorrowingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBorrowing: (borrowing: Omit<Borrowing, 'id'>) => void;
  books: Book[];
  users: User[];
}

function AddBorrowingModal({ isOpen, onClose, onAddBorrowing, books, users }: AddBorrowingModalProps) {
  const [formData, setFormData] = useState<Omit<Borrowing, 'id'>>({
    bookId: '',
    userId: '',
    borrowDate: Date.now(),
    dueDate: Date.now() + 14 * 24 * 60 * 60 * 1000, // 14 days from now
    status: 'active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddBorrowing(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl pointer-events-auto border border-gray-200 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Borrowing</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Book</label>
              <select
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.bookId}
                onChange={(e) => setFormData({ ...formData, bookId: e.target.value })}
              >
                <option value="">Select a book</option>
                {books.map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.title}
                  </option>
                ))}
              </select>
            </div>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Borrow Date</label>
              <input
                type="date"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={new Date(formData.borrowDate).toISOString().split('T')[0]}
                onChange={(e) => setFormData({ ...formData, borrowDate: new Date(e.target.value).getTime() })}
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
              Add Borrowing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Edit Borrowing Modal Component
interface EditBorrowingModalProps {
  isOpen: boolean;
  onClose: () => void;
  borrowing: Borrowing | null;
  onEditBorrowing: (borrowing: Borrowing) => void;
  books: Book[];
  users: User[];
}

function EditBorrowingModal({ isOpen, onClose, borrowing, onEditBorrowing, books, users }: EditBorrowingModalProps) {
  const [formData, setFormData] = useState<Borrowing | null>(borrowing);

  useEffect(() => {
    setFormData(borrowing);
  }, [borrowing]);

  if (!isOpen || !formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEditBorrowing(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl pointer-events-auto border border-gray-200 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Borrowing</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Book</label>
              <select
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.bookId}
                onChange={(e) => setFormData({ ...formData, bookId: e.target.value })}
              >
                {books.map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.title}
                  </option>
                ))}
              </select>
            </div>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Borrow Date</label>
              <input
                type="date"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={new Date(formData.borrowDate).toISOString().split('T')[0]}
                onChange={(e) => setFormData({ ...formData, borrowDate: new Date(e.target.value).getTime() })}
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
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Borrowing['status'] })}
              >
                <option value="active">Active</option>
                <option value="overdue">Overdue</option>
                <option value="returned">Returned</option>
              </select>
            </div>
            {formData.status === 'returned' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.returnDate ? new Date(formData.returnDate).toISOString().split('T')[0] : ''}
                  onChange={(e) => setFormData({ ...formData, returnDate: new Date(e.target.value).getTime() })}
                />
              </div>
            )}
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

// Delete Borrowing Modal Component
interface DeleteBorrowingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  borrowing: Borrowing | null;
  getBookTitle: (bookId: string) => string;
  getUserName: (userId: string) => string;
}

function DeleteBorrowingModal({ isOpen, onClose, onDelete, borrowing, getBookTitle, getUserName }: DeleteBorrowingModalProps) {
  if (!isOpen || !borrowing) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="bg-white rounded-lg p-6 w-full max-w-md pointer-events-auto border border-gray-200 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Delete Borrowing</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <p className="mb-4 text-gray-600">
          Are you sure you want to delete the borrowing of "{getBookTitle(borrowing.bookId)}" by "{getUserName(borrowing.userId)}"?
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

export function Borrowings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'active' | 'overdue' | 'returned'>('active');
  const [borrowings, setBorrowings] = useState<Borrowing[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBorrowing, setSelectedBorrowing] = useState<Borrowing | null>(null);

  useEffect(() => {
    seedBorrowings();
    loadAll();
  }, []);

  const seedBorrowings = async () => {
    const count = await db.borrowings.count();
    const allBooks = await db.books.toArray();
    const allUsers = await db.users.toArray();
    if (count === 0 && allBooks.length > 0 && allUsers.length > 0) {
      const borrowingsSeed: Omit<Borrowing, 'id'>[] = Array.from({ length: 20 }).map((_, i) => {
        const book = allBooks[i % allBooks.length];
        const user = allUsers[i % allUsers.length];
        const now = Date.now() - i * 86400000;
        const due = now + 14 * 86400000;
        let status: Borrowing['status'] = 'active';
        let returnDate: number | undefined = undefined;
        if (i % 3 === 0) { status = 'returned'; returnDate = due - 2 * 86400000; }
        else if (i % 5 === 0) { status = 'overdue'; }
        return {
          bookId: book.id,
          userId: user.id,
          borrowDate: now,
          dueDate: due,
          returnDate,
          status
        };
      });
      await db.borrowings.bulkAdd(borrowingsSeed.map((b, i) => ({ ...b, id: (i + 1).toString() })));
    }
  };

  const loadAll = async () => {
    setBooks(await db.books.toArray());
    setUsers(await db.users.toArray());
    setBorrowings(await db.borrowings.toArray());
  };

  const getBookTitle = (bookId: string) => {
    return books.find(book => book.id === bookId)?.title || 'Unknown Book';
  };

  const getUserName = (userId: string) => {
    return users.find(user => user.id === userId)?.name || 'Unknown User';
  };

  const handleAddBorrowing = async (data: Omit<Borrowing, 'id'>) => {
    const now = Date.now();
    const borrowing: Borrowing = { ...data, id: now.toString() };
    await db.borrowings.add(borrowing);
    await db.activities.add({
      id: now.toString(),
      type: 'borrow',
      user: getUserName(borrowing.userId),
      book: getBookTitle(borrowing.bookId),
      time: new Date(now).toLocaleString(),
      status: 'completed',
      timestamp: now
    });
    await loadAll();
  };

  const handleEditBorrowing = async (updated: Borrowing) => {
    await db.borrowings.put(updated);
    const now = Date.now();
    await db.activities.add({
      id: now.toString(),
      type: 'edit',
      user: getUserName(updated.userId),
      book: getBookTitle(updated.bookId),
      time: new Date(now).toLocaleString(),
      status: 'completed',
      timestamp: now
    });
    await loadAll();
  };

  const handleDeleteBorrowing = async () => {
    if (!selectedBorrowing) return;
    await db.borrowings.delete(selectedBorrowing.id);
    const now = Date.now();
    await db.activities.add({
      id: now.toString(),
      type: 'delete',
      user: getUserName(selectedBorrowing.userId),
      book: getBookTitle(selectedBorrowing.bookId),
      time: new Date(now).toLocaleString(),
      status: 'completed',
      timestamp: now
    });
    await loadAll();
    setIsDeleteModalOpen(false);
    setSelectedBorrowing(null);
  };

  const openEditModal = (borrowing: Borrowing) => {
    setSelectedBorrowing(borrowing);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (borrowing: Borrowing) => {
    setSelectedBorrowing(borrowing);
    setIsDeleteModalOpen(true);
  };

  const filteredRecords = borrowings
    .filter(record => record.status === activeTab)
    .filter(record => {
      const bookTitle = getBookTitle(record.bookId).toLowerCase();
      const userName = getUserName(record.userId).toLowerCase();
      return (
        bookTitle.includes(searchTerm.toLowerCase()) ||
        userName.includes(searchTerm.toLowerCase())
      );
    });

  return (
    <div className="space-y-6">
      {/* Header: New Borrowing button right */}
      <div className="flex items-center mb-2">
        <div className="flex-1" />
        <button 
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ml-auto"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="w-5 h-5 mr-2" />
          New Borrowing
        </button>
      </div>
      {/* Filter/Search Row: Search left, Tabs right */}
      <div className="flex items-center mb-2">
        <div className="flex-1 max-w-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by book or user..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center ml-auto">
          <nav className="-mb-px flex space-x-8 border-b border-gray-200">
            {[
              { id: 'active', label: 'Active', count: borrowings.filter(r => r.status === 'active').length },
              { id: 'overdue', label: 'Overdue', count: borrowings.filter(r => r.status === 'overdue').length },
              { id: 'returned', label: 'Returned', count: borrowings.filter(r => r.status === 'returned').length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'active' | 'overdue' | 'returned')}
                className={`$${
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

      {/* Records Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Book
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Borrow Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              {activeTab === 'returned' && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Return Date
                </th>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRecords.map((record) => (
              <tr key={record.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {getBookTitle(record.bookId)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {getUserName(record.userId)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {new Date(record.borrowDate).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {new Date(record.dueDate).toLocaleDateString()}
                  </div>
                </td>
                {activeTab === 'returned' && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {record.returnDate ? new Date(record.returnDate).toLocaleDateString() : '-'}
                    </div>
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    record.status === 'active' ? 'bg-green-100 text-green-800' :
                    record.status === 'overdue' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {record.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button 
                      onClick={() => openEditModal(record)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => openDeleteModal(record)}
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
      <AddBorrowingModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddBorrowing={handleAddBorrowing}
        books={books}
        users={users}
      />

      <EditBorrowingModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        borrowing={selectedBorrowing}
        onEditBorrowing={handleEditBorrowing}
        books={books}
        users={users}
      />

      <DeleteBorrowingModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteBorrowing}
        borrowing={selectedBorrowing}
        getBookTitle={getBookTitle}
        getUserName={getUserName}
      />
    </div>
  );
} 