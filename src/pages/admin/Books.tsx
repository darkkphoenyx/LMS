import { useState, useEffect } from 'react';
import { 
  Book as BookIcon, 
  Search, 
  Plus, 
  Edit, 
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  X,
  Grid,
  List,
  Image as ImageIcon
} from 'lucide-react';
import { db, type Book } from '../../lib/db';
import { books as initialBooks } from '../../const/books';

const BOOK_CATEGORIES = [
  'Fiction',
  'Science Fiction',
  'Fantasy',
  'Romance',
  'Mystery',
  'Non-Fiction',
  'Biography',
  'Classic',
  'Historical Fiction',
  'Psychological Thriller'
] as const;

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBook: (book: Omit<Book, 'id'>) => void;
}

function AddBookModal({ isOpen, onClose, onAddBook }: AddBookModalProps) {
  const [formData, setFormData] = useState<Omit<Book, 'id'>>({
    title: '',
    author: '',
    isbn: '',
    category: 'fiction',
    status: 'available',
    location: '',
    publishedYear: new Date().getFullYear(),
    publisher: '',
    language: 'English',
    pages: 0,
    description: '',
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
    onAddBook(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-5 w-full max-w-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-50 rounded-lg">
              <BookIcon className="w-4 h-4 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Add New Book</h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-12 gap-4">
            {/* Book Cover Section */}
            <div className="col-span-3">
              <div className="aspect-[2/3] bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-2 hover:border-blue-500 transition-all duration-200 cursor-pointer relative group">
                {previewImage ? (
                  <>
                    <img
                      src={previewImage}
                      alt="Book cover preview"
                      className="w-full h-full object-contain rounded"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewImage('');
                        setFormData({ ...formData, imageUrl: '' });
                      }}
                      className="absolute top-1.5 right-1.5 p-1 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-8 h-8 text-gray-300 mb-1" />
                    <span className="text-xs text-gray-500 text-center">Click to upload cover</span>
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

            {/* Book Details Section */}
            <div className="col-span-9">
              <div className="grid grid-cols-3 gap-3">
            <div>
                  <label htmlFor="title" className="block text-xs font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                    id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-sm rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
              />
            </div>
            <div>
                  <label htmlFor="author" className="block text-xs font-medium text-gray-700 mb-1">Author</label>
              <input
                type="text"
                    id="author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-sm rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
              />
            </div>
            <div>
                  <label htmlFor="isbn" className="block text-xs font-medium text-gray-700 mb-1">ISBN</label>
              <input
                type="text"
                    id="isbn"
                value={formData.isbn}
                onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-sm rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
              />
            </div>
            <div>
                  <label htmlFor="category" className="block text-xs font-medium text-gray-700 mb-1">Category</label>
              <select
                    id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-sm rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  >
                    <option value="">Select Category</option>
                    {BOOK_CATEGORIES.map((category) => (
                      <option key={category} value={category.toLowerCase()}>
                        {category}
                      </option>
                    ))}
              </select>
            </div>
            <div>
                  <label htmlFor="status" className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Book['status'] })}
                    className="w-full px-2.5 py-1.5 text-sm rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  >
                    <option value="available">Available</option>
                    <option value="borrowed">Borrowed</option>
                    <option value="reserved">Reserved</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="location" className="block text-xs font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                    id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-sm rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
              />
            </div>
            <div>
                  <label htmlFor="publisher" className="block text-xs font-medium text-gray-700 mb-1">Publisher</label>
              <input
                type="text"
                    id="publisher"
                value={formData.publisher}
                onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-sm rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
              />
            </div>
            <div>
                  <label htmlFor="publishedYear" className="block text-xs font-medium text-gray-700 mb-1">Published Year</label>
              <input
                type="number"
                    id="publishedYear"
                value={formData.publishedYear}
                onChange={(e) => setFormData({ ...formData, publishedYear: parseInt(e.target.value) })}
                    className="w-full px-2.5 py-1.5 text-sm rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
              />
            </div>
            <div>
                  <label htmlFor="language" className="block text-xs font-medium text-gray-700 mb-1">Language</label>
              <input
                    type="text"
                    id="language"
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-sm rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                required
                  />
                </div>
                <div>
                  <label htmlFor="pages" className="block text-xs font-medium text-gray-700 mb-1">Pages</label>
                  <input
                    type="number"
                    id="pages"
                value={formData.pages}
                onChange={(e) => setFormData({ ...formData, pages: parseInt(e.target.value) })}
                    className="w-full px-2.5 py-1.5 text-sm rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
              />
            </div>
          </div>

              <div className="mt-3">
                <label htmlFor="description" className="block text-xs font-medium text-gray-700 mb-1">Description</label>
            <textarea
                  id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  className="w-full px-2.5 py-1.5 text-sm rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                  required
            />
          </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// EditBookModal
interface EditBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
  onEditBook: (book: Book) => void;
}

function EditBookModal({ isOpen, onClose, book, onEditBook }: EditBookModalProps) {
  const [formData, setFormData] = useState<Book | null>(book);

  useEffect(() => {
    setFormData(book);
  }, [book]);

  if (!isOpen || !formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
    onEditBook(formData);
    onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-5 w-full max-w-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-50 rounded-lg">
              <Edit className="w-4 h-4 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Edit Book</h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-12 gap-4">
            {/* Book Cover Section */}
            <div className="col-span-3">
              <div className="aspect-[2/3] bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-2 hover:border-blue-500 transition-all duration-200 cursor-pointer relative group">
                {formData.imageUrl ? (
                  <>
                    <img
                      src={formData.imageUrl}
                      alt="Book cover preview"
                      className="w-full h-full object-contain rounded"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, imageUrl: '' })}
                      className="absolute top-1.5 right-1.5 p-1 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-8 h-8 text-gray-300 mb-1" />
                    <span className="text-xs text-gray-500 text-center">Click to upload cover</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData({ ...formData, imageUrl: reader.result as string });
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

            {/* Book Details Section */}
            <div className="col-span-9">
              <div className="grid grid-cols-3 gap-3">
            <div>
                  <label htmlFor="edit-title" className="block text-xs font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                    id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-sm rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
              />
            </div>
            <div>
                  <label htmlFor="edit-author" className="block text-xs font-medium text-gray-700 mb-1">Author</label>
              <input
                type="text"
                    id="edit-author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-sm rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
              />
            </div>
            <div>
                  <label htmlFor="edit-isbn" className="block text-xs font-medium text-gray-700 mb-1">ISBN</label>
              <input
                type="text"
                    id="edit-isbn"
                value={formData.isbn}
                onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-sm rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
              />
            </div>
            <div>
                  <label htmlFor="edit-category" className="block text-xs font-medium text-gray-700 mb-1">Category</label>
              <select
                    id="edit-category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-sm rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  >
                    <option value="">Select Category</option>
                    {BOOK_CATEGORIES.map((category) => (
                      <option key={category} value={category.toLowerCase()}>
                        {category}
                      </option>
                    ))}
              </select>
            </div>
            <div>
                  <label htmlFor="edit-status" className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                  <select
                    id="edit-status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Book['status'] })}
                    className="w-full px-2.5 py-1.5 text-sm rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  >
                    <option value="available">Available</option>
                    <option value="borrowed">Borrowed</option>
                    <option value="reserved">Reserved</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="edit-location" className="block text-xs font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                    id="edit-location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-sm rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
              />
            </div>
            <div>
                  <label htmlFor="edit-publisher" className="block text-xs font-medium text-gray-700 mb-1">Publisher</label>
              <input
                type="text"
                    id="edit-publisher"
                value={formData.publisher}
                onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-sm rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
              />
            </div>
            <div>
                  <label htmlFor="edit-publishedYear" className="block text-xs font-medium text-gray-700 mb-1">Published Year</label>
              <input
                type="number"
                    id="edit-publishedYear"
                value={formData.publishedYear}
                onChange={(e) => setFormData({ ...formData, publishedYear: parseInt(e.target.value) })}
                    className="w-full px-2.5 py-1.5 text-sm rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
              />
            </div>
            <div>
                  <label htmlFor="edit-language" className="block text-xs font-medium text-gray-700 mb-1">Language</label>
              <input
                    type="text"
                    id="edit-language"
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-sm rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                required
                  />
                </div>
                <div>
                  <label htmlFor="edit-pages" className="block text-xs font-medium text-gray-700 mb-1">Pages</label>
                  <input
                    type="number"
                    id="edit-pages"
                value={formData.pages}
                onChange={(e) => setFormData({ ...formData, pages: parseInt(e.target.value) })}
                    className="w-full px-2.5 py-1.5 text-sm rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
              />
            </div>
          </div>

              <div className="mt-3">
                <label htmlFor="edit-description" className="block text-xs font-medium text-gray-700 mb-1">Description</label>
            <textarea
                  id="edit-description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  className="w-full px-2.5 py-1.5 text-sm rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                  required
            />
          </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function Books() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<'title' | 'author' | 'category' | 'status' | 'publishedYear'>('title');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [editingBookId, setEditingBookId] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteBookId, setDeleteBookId] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    seedDatabase();
    loadBooks();
  }, []);

  const seedDatabase = async () => {
    try {
      const count = await db.books.count();
      if (count === 0) {
        // Add books with unique IDs and required fields
        const booksWithIds: Book[] = initialBooks.map((book: Omit<Book, 'id'>, index: number) => ({
          ...book,
          id: (index + 1).toString(),
        }));
        
        await db.books.bulkAdd(booksWithIds);
        
        // Add activities for each book
        const activities = booksWithIds.map(book => ({
          id: `activity-${book.id}`,
          type: 'add' as const,
          user: 'Admin',
          book: book.title,
          time: 'Initial seed',
          status: 'completed' as const
        }));
        
        await db.activities.bulkAdd(activities);
      }
    } catch (err) {
      console.error('Error seeding database:', err);
    }
  };

  const loadBooks = async () => {
    try {
      setIsLoading(true);
      const allBooks = await db.books.toArray();
      setBooks(allBooks);
      setError(null);
    } catch (err) {
      setError('Failed to load books. Please try again later.');
      console.error('Error loading books:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddBook = async (newBook: Omit<Book, 'id'>) => {
    try {
      const now = Date.now();
      const book: Book = {
        ...newBook,
        id: now.toString(),
      };
      await db.books.add(book);
      await db.activities.add({
        id: now.toString(),
        type: 'add',
        user: 'Admin',
        book: book.title,
        time: new Date(now).toLocaleString(),
        status: 'completed',
        timestamp: now
      });
      await loadBooks();
    } catch (err) {
      setError('Failed to add book. Please try again.');
      console.error('Error adding book:', err);
    }
  };

  const handleEditBook = (bookId: string) => {
    setEditingBookId(bookId);
    setEditModalOpen(true);
  };

  const handleEditBookSave = async (updatedBook: Book) => {
    try {
      await db.books.put(updatedBook);
      const now = Date.now();
      await db.activities.add({
        id: now.toString(),
        type: 'edit',
        user: 'Admin',
        book: updatedBook.title,
        time: new Date(now).toLocaleString(),
        status: 'completed',
        timestamp: now
      });
      await loadBooks();
    } catch (err) {
      setError('Failed to update book. Please try again.');
      console.error('Error updating book:', err);
    }
  };

  const openDeleteModal = (bookId: string) => {
    setDeleteBookId(bookId);
    setDeleteModalOpen(true);
  };

  const handleDeleteBook = async () => {
    if (!deleteBookId) return;
    try {
      const book = books.find(b => b.id === deleteBookId);
      await db.books.delete(deleteBookId);
      const now = Date.now();
      await db.activities.add({
        id: now.toString(),
        type: 'delete',
        user: 'Admin',
        book: book ? book.title : 'Unknown',
        time: new Date(now).toLocaleString(),
        status: 'completed',
        timestamp: now
      });
      await loadBooks();
      setDeleteModalOpen(false);
      setDeleteBookId(null);
    } catch (err) {
      setError('Failed to delete book. Please try again.');
      console.error('Error deleting book:', err);
    }
  };

  const categories = Array.from(new Set(books.map(book => book.category)));
  const statuses = ['all', 'available', 'borrowed', 'reserved', 'maintenance'];

  const filteredBooks = books.filter(book => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.includes(searchTerm);
    
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || book.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Sorting logic
  const sortedBooks = [...filteredBooks].sort((a, b) => {
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

  const getStatusIcon = (status: Book['status']) => {
    switch (status) {
      case 'available':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'borrowed':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'reserved':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'maintenance':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getBookCoverUrl = (book: Book) => {
    return book.imageUrl || 'https://via.placeholder.com/200x300?text=No+Cover';
  };

  const getStatusColor = (status: Book['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'borrowed':
        return 'bg-yellow-100 text-yellow-800';
      case 'reserved':
        return 'bg-blue-100 text-blue-800';
      case 'maintenance':
        return 'bg-red-100 text-red-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Books</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your library's book collection</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2.5 rounded-xl transition-all duration-200 ${
              viewMode === 'grid' 
                ? 'bg-blue-50 text-blue-600 shadow-sm' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            }`}
            title="Grid View"
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2.5 rounded-xl transition-all duration-200 ${
              viewMode === 'list' 
                ? 'bg-blue-50 text-blue-600 shadow-sm' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            }`}
            title="List View"
          >
            <List className="w-5 h-5" />
          </button>
        <button 
            className="flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Book
        </button>
        </div>
      </div>

      {/* Filter/Search Section */}
      <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Search */}
            <div className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by title, author, or ISBN..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            {/* Filters */}
          <div className="w-full flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <select
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <select
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  {statuses.filter(s => s !== 'all').map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Sorting Controls */}
          <div className="w-full flex flex-col sm:flex-row gap-3 md:justify-end">
              <div className="flex-1">
                <select
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  value={sortField}
                  onChange={e => setSortField(e.target.value as any)}
                >
                  <option value="title">Title</option>
                  <option value="author">Author</option>
                  <option value="category">Category</option>
                  <option value="status">Status</option>
                  <option value="publishedYear">Published Year</option>
                </select>
              </div>
              <div className="flex-1">
                <select
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
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

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {sortedBooks.map((book) => (
            <div
              key={book.id}
              className="group bg-white rounded-xl shadow-sm hover:shadow-md overflow-hidden transform transition-all duration-200 hover:scale-[1.02] border border-gray-100"
            >
              <div className="relative aspect-[2/3] bg-gray-50">
                <img
                  src={getBookCoverUrl(book)}
                  alt={book.title}
                  className="w-full h-full object-contain p-4"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/200x300?text=No+Cover';
                  }}
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(book.status)}`}>
                    {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">{book.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-1">{book.author}</p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">{book.category}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditBook(book.id)}
                      className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                      title="Edit book"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openDeleteModal(book.id)}
                      className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200"
                      title="Delete book"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedBooks.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-12 w-8 flex-shrink-0">
                          <img
                            src={getBookCoverUrl(book)}
                            alt={book.title}
                            className="h-full w-full object-contain rounded"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://via.placeholder.com/80x120?text=No+Cover';
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200">{book.title}</div>
                          <div className="text-sm text-gray-500">{book.isbn}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{book.author}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-50 text-blue-700">
                        {book.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(book.status)}
                        <span className="ml-2 text-sm text-gray-900">
                          {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
                        </span>
                      </div>
                      {book.dueDate && (
                        <div className="text-xs text-gray-500">Due: {book.dueDate}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {book.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        className="text-blue-600 hover:text-blue-900 mr-3 transition-colors duration-200 hover:bg-blue-50 p-1.5 rounded-lg" 
                        onClick={() => handleEditBook(book.id)}
                        title="Edit book"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900 transition-colors duration-200 hover:bg-red-50 p-1.5 rounded-lg"
                        onClick={() => openDeleteModal(book.id)}
                        title="Delete book"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modals */}
      <AddBookModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddBook={handleAddBook}
      />

      <EditBookModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        book={books.find(b => b.id === editingBookId) || null}
        onEditBook={handleEditBookSave}
      />

      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Delete Book</h2>
            <p className="mb-6 text-gray-700">Are you sure you want to delete this book? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                onClick={() => { setDeleteModalOpen(false); setDeleteBookId(null); }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
                onClick={handleDeleteBook}
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