import { useState, useEffect } from 'react';
import { 
  Book as BookIcon, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  X
} from 'lucide-react';
import { db, type Book } from '../../lib/db';

// Initial book data
const initialBooks: Omit<Book, 'id'>[] = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '9780743273565',
    category: 'Fiction',
    status: 'available',
    location: 'Shelf A1',
    publishedYear: 1925,
    publisher: 'Scribner',
    language: 'English',
    pages: 180,
    description: 'A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.'
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '9780446310789',
    category: 'Fiction',
    status: 'borrowed',
    location: 'Shelf A2',
    publishedYear: 1960,
    publisher: 'Grand Central Publishing',
    language: 'English',
    pages: 281,
    description: 'The story of racial injustice and the loss of innocence in the American South.',
    lastBorrowed: '2024-03-15',
    dueDate: '2024-04-15'
  },
  {
    title: '1984',
    author: 'George Orwell',
    isbn: '9780451524935',
    category: 'Science Fiction',
    status: 'reserved',
    location: 'Shelf B1',
    publishedYear: 1949,
    publisher: 'Signet Classic',
    language: 'English',
    pages: 328,
    description: 'A dystopian social science fiction novel and cautionary tale.'
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    isbn: '9780141439518',
    category: 'Romance',
    status: 'available',
    location: 'Shelf B2',
    publishedYear: 1813,
    publisher: 'Penguin Classics',
    language: 'English',
    pages: 432,
    description: 'A romantic novel of manners.'
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    isbn: '9780316769488',
    category: 'Fiction',
    status: 'maintenance',
    location: 'Shelf C1',
    publishedYear: 1951,
    publisher: 'Little, Brown and Company',
    language: 'English',
    pages: 234,
    description: 'A story about teenage alienation and loss of innocence.'
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    isbn: '9780547928227',
    category: 'Fantasy',
    status: 'available',
    location: 'Shelf C2',
    publishedYear: 1937,
    publisher: 'Houghton Mifflin Harcourt',
    language: 'English',
    pages: 310,
    description: 'A fantasy novel about the quest of home-loving hobbit Bilbo Baggins.'
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    isbn: '9780060850524',
    category: 'Science Fiction',
    status: 'borrowed',
    location: 'Shelf D1',
    publishedYear: 1932,
    publisher: 'Harper Perennial',
    language: 'English',
    pages: 311,
    description: 'A dystopian novel set in a futuristic World State.',
    lastBorrowed: '2024-03-20',
    dueDate: '2024-04-20'
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    isbn: '9780618640157',
    category: 'Fantasy',
    status: 'available',
    location: 'Shelf D2',
    publishedYear: 1954,
    publisher: 'Houghton Mifflin',
    language: 'English',
    pages: 1178,
    description: 'An epic high-fantasy novel.'
  },
  {
    title: 'Crime and Punishment',
    author: 'Fyodor Dostoevsky',
    isbn: '9780143107637',
    category: 'Classic',
    status: 'reserved',
    location: 'Shelf E1',
    publishedYear: 1866,
    publisher: 'Penguin Classics',
    language: 'English',
    pages: 671,
    description: 'A psychological novel about a poor ex-student in St. Petersburg.'
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    isbn: '9780062315007',
    category: 'Fiction',
    status: 'available',
    location: 'Shelf E2',
    publishedYear: 1988,
    publisher: 'HarperOne',
    language: 'English',
    pages: 208,
    description: 'A novel about an Andalusian shepherd boy who dreams of finding a worldly treasure.'
  },
  {
    title: 'The Art of War',
    author: 'Sun Tzu',
    isbn: '9781590302255',
    category: 'Non-Fiction',
    status: 'available',
    location: 'Shelf F1',
    publishedYear: -500,
    publisher: 'Shambhala',
    language: 'English',
    pages: 273,
    description: 'An ancient Chinese military treatise.'
  },
  {
    title: 'The Diary of a Young Girl',
    author: 'Anne Frank',
    isbn: '9780553296983',
    category: 'Biography',
    status: 'borrowed',
    location: 'Shelf F2',
    publishedYear: 1947,
    publisher: 'Bantam',
    language: 'English',
    pages: 283,
    description: 'A diary written by Anne Frank while in hiding during the Nazi occupation.',
    lastBorrowed: '2024-03-18',
    dueDate: '2024-04-18'
  },
  {
    title: 'The Hitchhiker\'s Guide to the Galaxy',
    author: 'Douglas Adams',
    isbn: '9780345391803',
    category: 'Science Fiction',
    status: 'available',
    location: 'Shelf G1',
    publishedYear: 1979,
    publisher: 'Del Rey',
    language: 'English',
    pages: 224,
    description: 'A comic science fiction series.'
  },
  {
    title: 'The Kite Runner',
    author: 'Khaled Hosseini',
    isbn: '9781594631931',
    category: 'Fiction',
    status: 'reserved',
    location: 'Shelf G2',
    publishedYear: 2003,
    publisher: 'Riverhead Books',
    language: 'English',
    pages: 371,
    description: 'A story about the unlikely friendship between a wealthy boy and the son of his father\'s servant.'
  },
  {
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    isbn: '9780307474278',
    category: 'Mystery',
    status: 'available',
    location: 'Shelf H1',
    publishedYear: 2003,
    publisher: 'Anchor',
    language: 'English',
    pages: 489,
    description: 'A mystery thriller novel.'
  },
  {
    title: 'The Book Thief',
    author: 'Markus Zusak',
    isbn: '9780375842207',
    category: 'Historical Fiction',
    status: 'borrowed',
    location: 'Shelf H2',
    publishedYear: 2005,
    publisher: 'Knopf Books for Young Readers',
    language: 'English',
    pages: 552,
    description: 'A story about a young girl living in Nazi Germany.',
    lastBorrowed: '2024-03-22',
    dueDate: '2024-04-22'
  },
  {
    title: 'The Road',
    author: 'Cormac McCarthy',
    isbn: '9780307387899',
    category: 'Post-Apocalyptic',
    status: 'available',
    location: 'Shelf I1',
    publishedYear: 2006,
    publisher: 'Vintage',
    language: 'English',
    pages: 287,
    description: 'A post-apocalyptic novel about a father and son\'s journey.'
  },
  {
    title: 'The Girl with the Dragon Tattoo',
    author: 'Stieg Larsson',
    isbn: '9780307269751',
    category: 'Mystery',
    status: 'maintenance',
    location: 'Shelf I2',
    publishedYear: 2005,
    publisher: 'Vintage Crime/Black Lizard',
    language: 'English',
    pages: 465,
    description: 'A psychological thriller novel.'
  },
  {
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    isbn: '9780439023481',
    category: 'Science Fiction',
    status: 'available',
    location: 'Shelf J1',
    publishedYear: 2008,
    publisher: 'Scholastic Press',
    language: 'English',
    pages: 374,
    description: 'A dystopian novel set in Panem.'
  },
  {
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    isbn: '9781250301697',
    category: 'Psychological Thriller',
    status: 'reserved',
    location: 'Shelf J2',
    publishedYear: 2019,
    publisher: 'Celadon Books',
    language: 'English',
    pages: 323,
    description: 'A psychological thriller about a woman who shoots her husband and then stops speaking.'
  }
];

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
    category: 'Fiction',
    status: 'available',
    location: '',
    publishedYear: new Date().getFullYear(),
    publisher: '',
    language: 'English',
    pages: 0,
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddBook(formData);
    setFormData({
      title: '',
      author: '',
      isbn: '',
      category: 'Fiction',
      status: 'available',
      location: '',
      publishedYear: new Date().getFullYear(),
      publisher: '',
      language: 'English',
      pages: 0,
      description: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  // Height of navbar (e.g., 4rem = 64px)
  const overlayStyle = { top: '4rem', height: 'calc(100vh - 4rem)' };

  return (
    <>
      {/* Overlay for mobile and tablet */}
      <div className="fixed left-0 right-0 bg-black bg-opacity-75 lg:hidden z-40" style={overlayStyle} />
      
      {/* Overlay for desktop (excluding sidebar area) */}
      <div className="hidden lg:block fixed right-0 bg-black bg-opacity-75 z-40" style={{ ...overlayStyle, left: '16rem' }} />
      
      {/* Modal content */}
      <div className="fixed left-0 right-0 flex items-center justify-center lg:pl-64 z-50" style={overlayStyle}>
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-2xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Add New Book</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.isbn}
                  onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Fiction">Fiction</option>
                  <option value="Science Fiction">Science Fiction</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Romance">Romance</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Non-Fiction">Non-Fiction</option>
                  <option value="Biography">Biography</option>
                  <option value="Classic">Classic</option>
                  <option value="Historical Fiction">Historical Fiction</option>
                  <option value="Psychological Thriller">Psychological Thriller</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Publisher</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.publisher}
                  onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Published Year</label>
                <input
                  type="number"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.publishedYear}
                  onChange={(e) => setFormData({ ...formData, publishedYear: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pages</label>
                <input
                  type="number"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.pages}
                  onChange={(e) => setFormData({ ...formData, pages: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
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
                Add Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
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
    onEditBook(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-2xl pointer-events-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Book</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.isbn}
                onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Fiction">Fiction</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Romance">Romance</option>
                <option value="Mystery">Mystery</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Biography">Biography</option>
                <option value="Classic">Classic</option>
                <option value="Historical Fiction">Historical Fiction</option>
                <option value="Psychological Thriller">Psychological Thriller</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Publisher</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.publisher}
                onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Published Year</label>
              <input
                type="number"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.publishedYear}
                onChange={(e) => setFormData({ ...formData, publishedYear: parseInt(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pages</label>
              <input
                type="number"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.pages}
                onChange={(e) => setFormData({ ...formData, pages: parseInt(e.target.value) })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
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

export function Books() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Sorting state
  const [sortField, setSortField] = useState<'title' | 'author' | 'category' | 'status' | 'publishedYear'>('title');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  // Add edit modal state
  const [editBookId, setEditBookId] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  // Add state for delete modal
  const [deleteBookId, setDeleteBookId] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    seedDatabase();
    loadBooks();
  }, []);

  const seedDatabase = async () => {
    try {
      const count = await db.books.count();
      if (count === 0) {
        // Add initial books with unique IDs
        const booksWithIds = initialBooks.map((book, index) => ({
          ...book,
          id: (index + 1).toString()
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
    const book = books.find(b => b.id === bookId) || null;
    setEditBookId(bookId);
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
    <div className="space-y-6">
      <div className="flex items-center">
        <div className="flex-1" />
        <button 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ml-auto"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Book
        </button>
      </div>

      <AddBookModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddBook={handleAddBook}
      />

      {!isAddModalOpen && (
        <div className="w-full mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Search */}
            <div className="w-full">
              <label className="block md:hidden text-xs font-semibold mb-1 text-gray-600">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by title, author, or ISBN..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            {/* Filters */}
            <div className="w-full flex flex-col sm:flex-row gap-2">
              <div className="flex-1">
                <label className="block md:hidden text-xs font-semibold mb-1 text-gray-600">Category</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <label className="block md:hidden text-xs font-semibold mb-1 text-gray-600">Status</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <div className="w-full flex flex-col sm:flex-row gap-2 md:justify-end">
              <div className="flex-1">
                <label className="block md:hidden text-xs font-semibold mb-1 text-gray-600">Sort by</label>
                <select
                  className="w-full px-2 py-1 border border-gray-300 rounded"
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
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedBooks.map((book) => (
                <tr key={book.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{book.title}</div>
                    <div className="text-sm text-gray-500">{book.isbn}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{book.author}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
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
                    <button className="text-blue-600 hover:text-blue-900 mr-3" onClick={() => handleEditBook(book.id)}>
                      <Edit className="w-5 h-5" />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => openDeleteModal(book.id)}
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

      <EditBookModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        book={books.find(b => b.id === editBookId) || null}
        onEditBook={handleEditBookSave}
      />

      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 pointer-events-auto">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Delete Book</h2>
            <p className="mb-6 text-gray-700">Are you sure you want to delete this book? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                onClick={() => { setDeleteModalOpen(false); setDeleteBookId(null); }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
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