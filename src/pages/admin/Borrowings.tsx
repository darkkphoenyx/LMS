import { useState, useEffect } from 'react';
import { Plus, Search, CheckCircle2, AlertCircle, Clock, Edit, Trash2, X, BookOpen } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-xl">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Add New Borrowing</h2>
              <p className="text-sm text-gray-500">Create a new book borrowing record</p>
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
          {/* Book and User Selection */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Borrowing Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Book</label>
                <select
                  required
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
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
            </div>
          </div>

          {/* Dates Section */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Borrowing Period</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Borrow Date</label>
                <input
                  type="date"
                  required
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={new Date(formData.borrowDate).toISOString().split('T')[0]}
                  onChange={(e) => setFormData({ ...formData, borrowDate: new Date(e.target.value).getTime() })}
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
              Create Borrowing
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

  const getBookCoverUrl = (bookId: string) => {
    const book = books.find(b => b.id === bookId);
    if (!book) return 'https://via.placeholder.com/150x200?text=No+Cover';
    
    // Map of book titles to their image URLs
    const bookCoverUrls: { [key: string]: string } = {
      'The Alchemist': 'https://img.perlego.com/book-covers/598007/9780062416216_300_450.webp',
      'Harry Potter Series (1-7 Bundle)': 'https://www.curiosasociety.com/cdn/shop/products/HPBoxSet_Soft_Front.jpg?v=1571439832',
      'The Art of War': 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1630683326i/10534.jpg',
      '1984': 'https://archive.org/services/img/george-orwell-1984_202309/full/pct:200/0/default.jpg',
      'To Kill a Mockingbird': 'https://grey.com.np/cdn/shop/products/book-cover-To-Kill-a-Mockingbird-many-1961.webp?v=1669894816',
      'The Great Gatsby': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg/960px-The_Great_Gatsby_Cover_1925_Retouched.jpg',
      'Think and Grow Rich': 'https://media.thuprai.com/__sized__/front_covers/think-and-grow-rich-f.jpg-thumbnail-280x405-70.jpg',
      'Sapiens: A Brief History of Humankind': 'https://media.thuprai.com/products/Sapiens__A_Brief_History_of_Humankind.jpg',
      'The Subtle Art of Not Giving a F*ck': 'https://booksmandala.com/_next/image?url=https%3A%2F%2Fbooks.bizmandala.com%2Fmedia%2Fbooks%2F9780062641540%2F9780062641540-9434.webp&w=3840&q=75',
      'The Hobbit': 'https://img1.od-cdn.com/ImageType-400/0293-1/%7BC9B54C84-0369-49C5-A0B3-98E3353A2129%7DIMG400.JPG',
    };

    return bookCoverUrls[book.title] || `https://picsum.photos/seed/${book.id}/150/200`;
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Borrowings</h1>
          <p className="mt-1 text-sm text-gray-500">Manage book borrowings and returns</p>
        </div>
        <button 
          className="flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="w-5 h-5 mr-2" />
          New Borrowing
        </button>
      </div>

      {/* Filter/Search Section */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by book or user..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-end">
            <nav className="flex space-x-4 border-b border-gray-200">
              {[
                { id: 'active', label: 'Active', count: borrowings.filter(r => r.status === 'active').length },
                { id: 'overdue', label: 'Overdue', count: borrowings.filter(r => r.status === 'overdue').length },
                { id: 'returned', label: 'Returned', count: borrowings.filter(r => r.status === 'returned').length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'active' | 'overdue' | 'returned')}
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
      </div>

      {/* Records Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRecords.map((record) => (
          <div
            key={record.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100"
          >
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <img
                    src={getBookCoverUrl(record.bookId)}
                    alt={getBookTitle(record.bookId)}
                    className="w-20 h-28 object-cover rounded-lg shadow-sm"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/150x200?text=No+Cover';
                    }}
                  />
                  <span className={`absolute -bottom-1 -right-1 p-1 rounded-full border-2 border-white ${
                    record.status === 'active' ? 'bg-green-500' :
                    record.status === 'overdue' ? 'bg-red-500' :
                    'bg-gray-500'
                  }`}>
                    {record.status === 'active' ? (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    ) : record.status === 'overdue' ? (
                      <AlertCircle className="w-4 h-4 text-white" />
                    ) : (
                      <Clock className="w-4 h-4 text-white" />
                    )}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {getBookTitle(record.bookId)}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">
                    {getUserName(record.userId)}
                  </p>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      <span>Borrowed: {new Date(record.borrowDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      <span>Due: {new Date(record.dueDate).toLocaleDateString()}</span>
                    </div>
                    {record.status === 'returned' && record.returnDate && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2 text-gray-400" />
                        <span>Returned: {new Date(record.returnDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => openEditModal(record)}
                  className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  title="Edit borrowing"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => openDeleteModal(record)}
                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200"
                  title="Delete borrowing"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
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