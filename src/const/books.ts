import { Book } from '../lib/db';

export const books: Omit<Book, 'id'>[] = [
  {
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
    description: 'A novel about an Andalusian shepherd boy who dreams of finding a worldly treasure.'
  },
  // ... rest of the books data ...
]; 