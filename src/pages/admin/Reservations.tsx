import { useState, useEffect } from 'react';
import { Book, User, Calendar, Clock, CheckCircle2, XCircle, AlertCircle, Search, Filter, Plus, X, Edit, Trash2 } from 'lucide-react';
import { db, type Reservation, type Book as BookType, type User as UserType } from '../../lib/db';

// Helper Components
const ReservationIcon = ({ status }: { status: Reservation['status'] }) => {
  const colors = {
    active: 'bg-green-100 text-green-600',
    pending: 'bg-yellow-100 text-yellow-600',
    completed: 'bg-blue-100 text-blue-600',
    cancelled: 'bg-red-100 text-red-600'
  };

  return (
    <div className={`flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full ${colors[status]}`}>
      {status === 'active' ? <CheckCircle2 className="w-5 h-5" /> :
       status === 'pending' ? <Clock className="w-5 h-5" /> :
       status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> :
       <XCircle className="w-5 h-5" />}
    </div>
  );
};

const StatusBadge = ({ status }: { status: Reservation['status'] }) => {
  const colors = {
    active: 'bg-green-100 text-green-800 border border-green-200',
    pending: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    completed: 'bg-blue-100 text-blue-800 border border-blue-200',
    cancelled: 'bg-red-100 text-red-800 border border-red-200'
  };

  return (
    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${colors[status]}`}>
      {status}
    </span>
  );
};

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

// Add Reservation Modal Component
interface AddReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddReservation: (reservation: Omit<Reservation, 'id'>) => void;
  books: BookType[];
  users: UserType[];
}

function AddReservationModal({ isOpen, onClose, onAddReservation, books, users }: AddReservationModalProps) {
  const [formData, setFormData] = useState<Omit<Reservation, 'id'>>({
    bookId: '',
    userId: '',
    reservationDate: new Date().toISOString(),
    status: 'pending',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddReservation(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 w-full max-w-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-50 rounded-lg">
              <Book className="w-4 h-4 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Add New Reservation</h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Book</label>
              <select
                required
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200"
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
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200"
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Reservation Date</label>
              <input
                type="date"
                required
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200"
                value={new Date(formData.reservationDate).toISOString().split('T')[0]}
                onChange={(e) => setFormData({ ...formData, reservationDate: new Date(e.target.value).toISOString() })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                required
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Reservation['status'] })}
              >
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200 resize-none"
                rows={3}
                placeholder="Add any additional notes about this reservation..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>

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
              Create Reservation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Delete Reservation Modal Component
interface DeleteReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  reservation: Reservation | null;
  getBookTitle: (bookId: string) => string;
  getUserName: (userId: string) => string;
}

function DeleteReservationModal({ isOpen, onClose, onDelete, reservation, getBookTitle, getUserName }: DeleteReservationModalProps) {
  if (!isOpen || !reservation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="bg-white rounded-lg p-6 w-full max-w-md pointer-events-auto border border-gray-200 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Delete Reservation</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <p className="mb-4 text-gray-600">
          Are you sure you want to delete the reservation for "{getBookTitle(reservation.bookId)}" by "{getUserName(reservation.userId)}"?
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

const Reservations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'active' | 'completed' | 'cancelled'>('all');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [books, setBooks] = useState<BookType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  
  // Add sorting state
  const [sortField, setSortField] = useState<'book' | 'user' | 'status' | 'date'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    seedReservations();
    loadAll();
  }, []);

  const seedReservations = async () => {
    const count = await db.reservations.count();
    const allBooks = await db.books.toArray();
    const allUsers = await db.users.toArray();
    if (count === 0 && allBooks.length > 0 && allUsers.length > 0) {
      const reservationsSeed: Omit<Reservation, 'id'>[] = Array.from({ length: 20 }).map((_, i) => {
        const book = allBooks[i % allBooks.length];
        const user = allUsers[i % allUsers.length];
        const now = new Date();
        const reservationDate = new Date(now.getTime() - i * 86400000); // i days ago
        const pickupDate = i % 3 === 0 ? new Date(reservationDate.getTime() + 2 * 86400000).toISOString() : undefined;
        const expiryDate = i % 4 === 0 ? new Date(reservationDate.getTime() + 7 * 86400000).toISOString() : undefined;
        
        let status: Reservation['status'] = 'pending';
        if (i % 4 === 0) status = 'completed';
        else if (i % 5 === 0) status = 'cancelled';
        else if (i % 3 === 0) status = 'active';

        return {
          bookId: book.id,
          userId: user.id,
          status,
          reservationDate: reservationDate.toISOString(),
          pickupDate,
          expiryDate,
          notes: i % 3 === 0 ? `Reservation for ${book.title} by ${user.name}` : undefined
        };
      });
      await db.reservations.bulkAdd(reservationsSeed.map((r, i) => ({ ...r, id: (i + 1).toString() })));
    }
  };

  const loadAll = async () => {
    setBooks(await db.books.toArray());
    setUsers(await db.users.toArray());
    setReservations(await db.reservations.toArray());
  };

  const getBookTitle = (bookId: string) => {
    return books.find(book => book.id === bookId)?.title || 'Unknown Book';
  };

  const getUserName = (userId: string) => {
    return users.find(user => user.id === userId)?.name || 'Unknown User';
  };

  const handleAddReservation = async (data: Omit<Reservation, 'id'>) => {
    const now = Date.now();
    const reservation: Reservation = { ...data, id: now.toString() };
    await db.reservations.add(reservation);
    await db.activities.add({
      id: now.toString(),
      type: 'reservation',
      user: getUserName(reservation.userId),
      book: getBookTitle(reservation.bookId),
      time: new Date(now).toLocaleString(),
      status: 'completed',
      timestamp: now
    });
    await loadAll();
  };

  const handleDeleteReservation = async () => {
    if (!selectedReservation) return;
    await db.reservations.delete(selectedReservation.id);
    const now = Date.now();
    await db.activities.add({
      id: now.toString(),
      type: 'delete',
      user: getUserName(selectedReservation.userId),
      book: getBookTitle(selectedReservation.bookId),
      time: new Date(now).toLocaleString(),
      status: 'completed',
      timestamp: now
    });
    await loadAll();
    setIsDeleteModalOpen(false);
    setSelectedReservation(null);
  };

  const openDeleteModal = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsDeleteModalOpen(true);
  };

  const filteredReservations = reservations
    .filter(reservation => {
      const matchesSearch = getBookTitle(reservation.bookId).toLowerCase().includes(searchTerm.toLowerCase()) ||
                           getUserName(reservation.userId).toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || reservation.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortField) {
        case 'book':
          aValue = getBookTitle(a.bookId).toLowerCase();
          bValue = getBookTitle(b.bookId).toLowerCase();
          break;
        case 'user':
          aValue = getUserName(a.userId).toLowerCase();
          bValue = getUserName(b.userId).toLowerCase();
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'date':
        default:
          aValue = new Date(a.reservationDate).getTime();
          bValue = new Date(b.reservationDate).getTime();
          break;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reservations</h1>
          <p className="mt-1 text-sm text-gray-500">Manage and track book reservations</p>
        </div>
        <button 
          className="flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="w-5 h-5 mr-2" />
          New Reservation
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Reservations</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{reservations.length}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl">
              <Book className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {reservations.filter(r => r.status === 'active').length}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">
                {reservations.filter(r => r.status === 'pending').length}
              </p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-xl">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {reservations.filter(r => r.status === 'completed').length}
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div className="w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by book or user..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="md:col-span-3">
            <div className="flex items-center space-x-4">
              <select
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <div className="flex items-center space-x-2">
                <select
                  className="px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200"
                  value={sortField}
                  onChange={(e) => setSortField(e.target.value as any)}
                >
                  <option value="date">Date</option>
                  <option value="book">Book</option>
                  <option value="user">User</option>
                  <option value="status">Status</option>
                </select>
                <select
                  className="px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200"
                  value={sortDirection}
                  onChange={(e) => setSortDirection(e.target.value as any)}
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reservations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredReservations.map((reservation) => (
          <div
            key={reservation.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100"
          >
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <ReservationIcon status={reservation.status} />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {getBookTitle(reservation.bookId)}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">
                    {getUserName(reservation.userId)}
                  </p>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <span>Reserved: {new Date(reservation.reservationDate).toLocaleDateString()}</span>
                    </div>
                    {reservation.pickupDate && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2 text-gray-400" />
                        <span>Pickup: {new Date(reservation.pickupDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    {reservation.expiryDate && (
                      <div className="flex items-center text-sm text-gray-600">
                        <AlertCircle className="w-4 h-4 mr-2 text-gray-400" />
                        <span>Expires: {new Date(reservation.expiryDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <StatusBadge status={reservation.status} />
                <div className="flex space-x-2">
                  <button
                    onClick={() => openDeleteModal(reservation)}
                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200"
                    title="Delete reservation"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredReservations.length === 0 && (
          <div className="col-span-full">
            <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
              <div className="flex flex-col items-center">
                <Book className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No Reservations Found</h3>
                <p className="text-sm text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddReservationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddReservation={handleAddReservation}
        books={books}
        users={users}
      />

      <DeleteReservationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteReservation}
        reservation={selectedReservation}
        getBookTitle={getBookTitle}
        getUserName={getUserName}
      />
    </div>
  );
};

export default Reservations; 