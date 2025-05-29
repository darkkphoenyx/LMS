export const books = [
  { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', status: 'available' },
  { id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Fiction', status: 'borrowed' },
  { id: '3', title: '1984', author: 'George Orwell', category: 'Fiction', status: 'available' },
  { id: '4', title: 'Pride and Prejudice', author: 'Jane Austen', category: 'Fiction', status: 'borrowed' },
  { id: '5', title: 'The Hobbit', author: 'J.R.R. Tolkien', category: 'Fantasy', status: 'available' },
];

export const users = [
  { id: '1', name: 'John Doe', role: 'student', status: 'active' },
  { id: '2', name: 'Jane Smith', role: 'teacher', status: 'active' },
  { id: '3', name: 'Bob Johnson', role: 'student', status: 'inactive' },
  { id: '4', name: 'Alice Brown', role: 'teacher', status: 'active' },
  { id: '5', name: 'Charlie Wilson', role: 'student', status: 'active' },
];

export const borrowings = [
  { id: '1', bookId: '2', userId: '1', borrowDate: '2024-01-01', dueDate: '2024-01-15', status: 'active' },
  { id: '2', bookId: '4', userId: '2', borrowDate: '2024-01-02', dueDate: '2024-01-16', status: 'active' },
  { id: '3', bookId: '1', userId: '3', borrowDate: '2023-12-15', dueDate: '2023-12-30', status: 'returned' },
  { id: '4', bookId: '3', userId: '4', borrowDate: '2023-12-20', dueDate: '2024-01-03', status: 'overdue' },
  { id: '5', bookId: '5', userId: '5', borrowDate: '2024-01-03', dueDate: '2024-01-17', status: 'active' },
];

export const fines = [
  { id: '1', borrowingId: '4', userId: '4', amount: 5.00, dueDate: '2024-01-10', status: 'unpaid' },
  { id: '2', borrowingId: '3', userId: '3', amount: 2.50, dueDate: '2024-01-05', status: 'paid' },
];

export const activities = [
  { id: '1', type: 'borrow', user: 'John Doe', book: 'To Kill a Mockingbird', time: '2024-01-01 10:00:00', status: 'completed' },
  { id: '2', type: 'return', user: 'Jane Smith', book: 'Pride and Prejudice', time: '2024-01-02 14:30:00', status: 'completed' },
  { id: '3', type: 'fine', user: 'Bob Johnson', book: 'The Great Gatsby', time: '2023-12-30 09:15:00', status: 'completed' },
]; 