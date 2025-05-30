import { Book } from '../lib/db';

export const books = [
  {
    id: '1',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    isbn: '9780062416216',
    category: 'Fiction',
    status: 'available',
    location: 'Shelf A1',
    publishedYear: 1988,
    publisher: 'HarperOne',
    language: 'English',
    pages: 208,
    description: 'A novel about an Andalusian shepherd boy who dreams of finding a worldly treasure.',
    imageUrl: 'https://m.media-amazon.com/images/I/71ZvnK+4JKL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    id: '2',
    title: 'Harry Potter and the Philosopher\'s Stone',
    author: 'J.K. Rowling',
    isbn: '9780747532743',
    category: 'Fantasy',
    status: 'available',
    location: 'Shelf B2',
    publishedYear: 1997,
    publisher: 'Bloomsbury',
    language: 'English',
    pages: 223,
    description: 'The first book in the Harry Potter series, following the adventures of a young wizard.',
    imageUrl: 'https://m.media-amazon.com/images/I/71-++hbbERL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    id: '3',
    title: 'The Art of War',
    author: 'Sun Tzu',
    isbn: '9780140439199',
    category: 'Non-Fiction',
    status: 'available',
    location: 'Shelf C3',
    publishedYear: -500,
    publisher: 'Penguin Classics',
    language: 'English',
    pages: 273,
    description: 'An ancient Chinese military treatise dating from the 5th century BC.',
    imageUrl: 'https://m.media-amazon.com/images/I/71+Q6Rh6OIL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    id: '4',
    title: '1984',
    author: 'George Orwell',
    isbn: '9780451524935',
    category: 'Science Fiction',
    status: 'available',
    location: 'Shelf D4',
    publishedYear: 1949,
    publisher: 'Signet Classic',
    language: 'English',
    pages: 328,
    description: 'A dystopian social science fiction novel and cautionary tale.',
    imageUrl: 'https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    id: '5',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '9780446310789',
    category: 'Fiction',
    status: 'available',
    location: 'Shelf E5',
    publishedYear: 1960,
    publisher: 'Grand Central Publishing',
    language: 'English',
    pages: 281,
    description: 'A classic novel about racial injustice and moral growth in the American South.',
    imageUrl: 'https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    id: '6',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '9780743273565',
    category: 'Fiction',
    status: 'available',
    location: 'Shelf F6',
    publishedYear: 1925,
    publisher: 'Scribner',
    language: 'English',
    pages: 180,
    description: 'A novel depicting the excesses of the Jazz Age and the American Dream.',
    imageUrl: 'https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    id: '7',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    isbn: '9780141439518',
    category: 'Fiction',
    status: 'available',
    location: 'Shelf G7',
    publishedYear: 1813,
    publisher: 'Penguin Classics',
    language: 'English',
    pages: 432,
    description: 'A romantic novel of manners set in Georgian-era England.',
    imageUrl: 'https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    id: '8',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    isbn: '9780547928227',
    category: 'Fantasy',
    status: 'available',
    location: 'Shelf H8',
    publishedYear: 1937,
    publisher: 'Mariner Books',
    language: 'English',
    pages: 310,
    description: 'A fantasy novel about the adventures of Bilbo Baggins.',
    imageUrl: 'https://m.media-amazon.com/images/I/710+HcoP38L._AC_UF1000,1000_QL80_.jpg'
  },
  {
    id: '9',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    isbn: '9780316769488',
    category: 'Fiction',
    status: 'available',
    location: 'Shelf I9',
    publishedYear: 1951,
    publisher: 'Little, Brown and Company',
    language: 'English',
    pages: 277,
    description: 'A classic coming-of-age story about teenage alienation and loss of innocence.',
    imageUrl: 'https://m.media-amazon.com/images/I/61fgOuZNWYL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    id: '10',
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    isbn: '9780544003415',
    category: 'Fantasy',
    status: 'available',
    location: 'Shelf J10',
    publishedYear: 1954,
    publisher: 'Mariner Books',
    language: 'English',
    pages: 1178,
    description: 'An epic high-fantasy novel about the quest to destroy the One Ring.',
    imageUrl: 'https://m.media-amazon.com/images/I/71jLBXtWJWL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    id: '11',
    title: 'The Little Prince',
    author: 'Antoine de Saint-Exupéry',
    isbn: '9780156013987',
    category: 'Fiction',
    status: 'available',
    location: 'Shelf K11',
    publishedYear: 1943,
    publisher: 'Mariner Books',
    language: 'English',
    pages: 93,
    description: 'A poetic tale about a young prince who visits various planets in space.',
    imageUrl: 'https://m.media-amazon.com/images/I/71OZY035QKL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    id: '12',
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    isbn: '9780307474278',
    category: 'Mystery',
    status: 'available',
    location: 'Shelf L12',
    publishedYear: 2003,
    publisher: 'Anchor',
    language: 'English',
    pages: 489,
    description: 'A mystery thriller novel about a murder investigation in the Louvre Museum.',
    imageUrl: 'https://m.media-amazon.com/images/I/71UwSHSZRnS._AC_UF1000,1000_QL80_.jpg'
  },
  {
    id: '13',
    title: 'The Kite Runner',
    author: 'Khaled Hosseini',
    isbn: '9781594631931',
    category: 'Fiction',
    status: 'available',
    location: 'Shelf M13',
    publishedYear: 2003,
    publisher: 'Riverhead Books',
    language: 'English',
    pages: 371,
    description: 'A story of friendship, betrayal, and redemption set in Afghanistan.',
    imageUrl: 'https://m.media-amazon.com/images/I/71X1p4TGlxL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    id: '14',
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    isbn: '9780439023481',
    category: 'Science Fiction',
    status: 'available',
    location: 'Shelf N14',
    publishedYear: 2008,
    publisher: 'Scholastic Press',
    language: 'English',
    pages: 374,
    description: 'A dystopian novel about a televised battle to the death between teenagers.',
    imageUrl: 'https://m.media-amazon.com/images/I/71WSzS6zvCL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    id: '15',
    title: 'The Book Thief',
    author: 'Markus Zusak',
    isbn: '9780375842207',
    category: 'Historical Fiction',
    status: 'available',
    location: 'Shelf O15',
    publishedYear: 2005,
    publisher: 'Knopf Books for Young Readers',
    language: 'English',
    pages: 552,
    description: 'A story about a young girl in Nazi Germany who steals books to share with others.',
    imageUrl: 'https://m.media-amazon.com/images/I/71LhLZGHrlL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    id: '16',
    title: 'The Fault in Our Stars',
    author: 'John Green',
    isbn: '9780142424179',
    category: 'Fiction',
    status: 'available',
    location: 'Shelf P16',
    publishedYear: 2012,
    publisher: 'Dutton Books',
    language: 'English',
    pages: 313,
    description: 'A young adult novel about two teenagers who meet at a cancer support group.',
    imageUrl: 'https://m.media-amazon.com/images/I/71Q9lUQKVBL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    id: '17',
    title: 'The Giver',
    author: 'Lois Lowry',
    isbn: '9780544336261',
    category: 'Science Fiction',
    status: 'available',
    location: 'Shelf Q17',
    publishedYear: 1993,
    publisher: 'HMH Books for Young Readers',
    language: 'English',
    pages: 240,
    description: 'A dystopian novel about a seemingly perfect society without pain or suffering.',
    imageUrl: 'https://m.media-amazon.com/images/I/71JS7+zmHsL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    id: '18',
    title: 'The Help',
    author: 'Kathryn Stockett',
    isbn: '9780425232200',
    category: 'Historical Fiction',
    status: 'available',
    location: 'Shelf R18',
    publishedYear: 2009,
    publisher: 'Berkley',
    language: 'English',
    pages: 522,
    description: 'A novel about African American maids working in white households in 1960s Mississippi.',
    imageUrl: 'https://m.media-amazon.com/images/I/71XMTLcyq0L._AC_UF1000,1000_QL80_.jpg'
  },
  {
    id: '19',
    title: 'The Chronicles of Narnia',
    author: 'C.S. Lewis',
    isbn: '9780064471190',
    category: 'Fantasy',
    status: 'available',
    location: 'Shelf S19',
    publishedYear: 1950,
    publisher: 'HarperCollins',
    language: 'English',
    pages: 767,
    description: 'A series of seven fantasy novels about the magical land of Narnia.',
    imageUrl: 'https://m.media-amazon.com/images/I/91bD4U3jGJL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    id: '20',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    isbn: '9780061122415',
    category: 'Fiction',
    status: 'available',
    location: 'Shelf T20',
    publishedYear: 1988,
    publisher: 'HarperOne',
    language: 'English',
    pages: 208,
    description: 'A philosophical novel about following your dreams and listening to your heart.',
    imageUrl: 'https://m.media-amazon.com/images/I/71ZvnK+4JKL._AC_UF1000,1000_QL80_.jpg'
  }
] as Book[];

export const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    joinDate: '2024-01-01',
    lastLogin: '2024-03-15',
    fineAmount: 0
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    status: 'active',
    joinDate: '2024-01-15',
    lastLogin: '2024-03-14',
    fineAmount: 5.00
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'user',
    status: 'inactive',
    joinDate: '2024-02-01',
    lastLogin: '2024-03-10',
    fineAmount: 0
  }
];

export const borrowings = [
  {
    id: '1',
    userId: '2',
    bookId: '1',
    borrowDate: '2024-03-01',
    dueDate: '2024-03-15',
    returnDate: null,
    status: 'borrowed',
    fineAmount: 0
  },
  {
    id: '2',
    userId: '3',
    bookId: '3',
    borrowDate: '2024-02-15',
    dueDate: '2024-03-01',
    returnDate: '2024-03-05',
    status: 'returned',
    fineAmount: 2.00
  }
];

export const reservations = [
  {
    id: '1',
    userId: '2',
    bookId: '4',
    reservationDate: '2024-03-10',
    status: 'pending',
    expiryDate: '2024-03-17'
  }
];

export const fines = [
  {
    id: '1',
    userId: '2',
    amount: 5.00,
    reason: 'Late return',
    status: 'unpaid',
    dueDate: '2024-03-20',
    paidDate: null
  }
];

export const notifications = [
  {
    id: '1',
    title: 'Book Due Reminder',
    message: 'The Alchemist is due in 2 days',
    type: 'reminder',
    status: 'unread',
    createdAt: '2024-03-13',
    userId: '2'
  }
];

export const categories = [
  { id: '1', name: 'Fiction', count: 2 },
  { id: '2', name: 'Fantasy', count: 1 },
  { id: '3', name: 'Non-Fiction', count: 1 },
  { id: '4', name: 'Science Fiction', count: 1 }
];

export const recentActivity = [
  {
    id: '1',
    type: 'borrow',
    userId: '2',
    bookId: '1',
    timestamp: '2024-03-01T10:00:00Z',
    details: 'Borrowed The Alchemist'
  },
  {
    id: '2',
    type: 'return',
    userId: '3',
    bookId: '3',
    timestamp: '2024-03-05T14:30:00Z',
    details: 'Returned The Art of War'
  },
  {
    id: '3',
    type: 'reservation',
    userId: '2',
    bookId: '4',
    timestamp: '2024-03-10T09:15:00Z',
    details: 'Reserved 1984'
  }
];

export const statistics = {
  totalBooks: 20,
  totalUsers: 3,
  activeBorrowings: 1,
  totalFines: 5.00,
  pendingReservations: 1
};

export const bookCategoriesData = {
  daily: [
    { name: 'Fiction', value: 2 },
    { name: 'Fantasy', value: 1 },
    { name: 'Non-Fiction', value: 1 },
    { name: 'Science Fiction', value: 1 }
  ],
  weekly: [
    { name: 'Fiction', value: 2 },
    { name: 'Fantasy', value: 1 },
    { name: 'Non-Fiction', value: 1 },
    { name: 'Science Fiction', value: 1 }
  ],
  monthly: [
    { name: 'Fiction', value: 2 },
    { name: 'Fantasy', value: 1 },
    { name: 'Non-Fiction', value: 1 },
    { name: 'Science Fiction', value: 1 }
  ]
};

export const borrowingTrendsData = {
  daily: [
    { date: '2024-03-10', count: 1 },
    { date: '2024-03-11', count: 0 },
    { date: '2024-03-12', count: 1 },
    { date: '2024-03-13', count: 0 },
    { date: '2024-03-14', count: 1 }
  ],
  weekly: [
    { date: '2024-03-04', count: 3 },
    { date: '2024-03-05', count: 2 },
    { date: '2024-03-06', count: 4 },
    { date: '2024-03-07', count: 1 },
    { date: '2024-03-08', count: 2 },
    { date: '2024-03-09', count: 3 },
    { date: '2024-03-10', count: 1 }
  ],
  monthly: [
    { date: '2024-02-10', count: 5 },
    { date: '2024-02-17', count: 7 },
    { date: '2024-02-24', count: 4 },
    { date: '2024-03-02', count: 6 },
    { date: '2024-03-09', count: 3 }
  ]
};

export const fineTrendsData = {
  daily: [
    { date: '2024-03-10', amount: 2.00 },
    { date: '2024-03-11', amount: 0 },
    { date: '2024-03-12', amount: 1.50 },
    { date: '2024-03-13', amount: 0 },
    { date: '2024-03-14', amount: 1.00 }
  ],
  weekly: [
    { date: '2024-03-04', amount: 5.00 },
    { date: '2024-03-05', amount: 3.50 },
    { date: '2024-03-06', amount: 2.00 },
    { date: '2024-03-07', amount: 4.00 },
    { date: '2024-03-08', amount: 1.50 },
    { date: '2024-03-09', amount: 2.50 },
    { date: '2024-03-10', amount: 3.00 }
  ],
  monthly: [
    { date: '2024-02-10', amount: 15.00 },
    { date: '2024-02-17', amount: 12.50 },
    { date: '2024-02-24', amount: 8.00 },
    { date: '2024-03-02', amount: 10.00 },
    { date: '2024-03-09', amount: 7.50 }
  ]
};

export const dummyData = {
  books,
  users,
  borrowings,
  reservations,
  fines,
  notifications,
  categories,
  recentActivity,
  statistics,
  bookCategoriesData,
  borrowingTrendsData,
  fineTrendsData
}; 