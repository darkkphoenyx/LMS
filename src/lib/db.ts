import Dexie, { Table } from 'dexie';

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  status: 'available' | 'borrowed' | 'reserved' | 'maintenance';
  location: string;
  publishedYear: number;
  publisher: string;
  language: string;
  pages: number;
  description: string;
  imageUrl?: string;
  lastBorrowed?: string;
  dueDate?: string;
}

export interface Activity {
  id: string;
  type: 'borrow' | 'return' | 'reservation' | 'fine' | 'add' | 'edit' | 'delete';
  user: string;
  book: string;
  time: string;
  status: 'completed' | 'pending' | 'unpaid';
  timestamp?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
  status: 'active' | 'inactive';
  joinDate: number;
  imageUrl?: string;
}

export interface ProfileDetails {
  userId: string;
  phone: string;
  address: string;
  lastUpdated: number;
}

export interface Borrowing {
  id: string;
  bookId: string;
  userId: string;
  borrowDate: number;
  dueDate: number;
  returnDate?: number;
  status: 'active' | 'overdue' | 'returned';
}

export interface Fine {
  id: string;
  borrowingId: string;
  userId: string;
  amount: number;
  dueDate: number;
  paidDate?: number;
  status: 'unpaid' | 'paid';
  reason: string;
}

export interface Settings {
  id: string;
  borrowingRules: {
    maxBooksPerUser: number;
    loanPeriod: number;
    renewalLimit: number;
    renewalPeriod: number;
  };
  fineSettings: {
    dailyFine: number;
    gracePeriod: number;
    maxFine: number;
  };
  notifications: {
    dueDateReminder: boolean;
    overdueAlert: boolean;
    fineNotification: boolean;
    newBookNotification: boolean;
    emailNotifications: boolean;
    smsNotifications: boolean;
  };
  security: {
    sessionTimeout: number;
    passwordExpiry: number;
    failedLoginAttempts: number;
    twoFactorAuth: boolean;
  };
  system: {
    maintenanceMode: boolean;
    autoBackup: boolean;
    backupFrequency: string;
    dataRetention: number;
  };
}

export interface Notification {
  id: string;
  type: 'system' | 'alert' | 'user';
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  action?: {
    label: string;
    url: string;
  };
}

export interface Reservation {
  id: string;
  bookId: string;
  userId: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  reservationDate: string;
  pickupDate?: string;
  expiryDate?: string;
  notes?: string;
}

export class LMSDatabase extends Dexie {
  books: Dexie.Table<Book, string>;
  users: Dexie.Table<User, string>;
  borrowings: Dexie.Table<Borrowing, string>;
  fines: Dexie.Table<Fine, string>;
  activities: Dexie.Table<Activity, string>;
  settings: Dexie.Table<Settings, string>;
  notifications: Dexie.Table<Notification, string>;
  reservations: Dexie.Table<Reservation, string>;
  profileDetails: Dexie.Table<ProfileDetails, string>;

  constructor() {
    super('LMSDatabase');
    this.version(1).stores({
      books: '++id, title, author, isbn, status',
      users: '++id, name, email, role, status',
      borrowings: '++id, bookId, userId, status',
      fines: '++id, borrowingId, userId, status',
      activities: '++id, type, user, book, status',
      settings: '++id',
      notifications: '++id, type, priority, read, timestamp',
      reservations: '++id, bookId, userId, status',
      profileDetails: 'userId, phone, address, lastUpdated'
    });
    this.books = this.table('books');
    this.users = this.table('users');
    this.borrowings = this.table('borrowings');
    this.fines = this.table('fines');
    this.activities = this.table('activities');
    this.settings = this.table('settings');
    this.notifications = this.table('notifications');
    this.reservations = this.table('reservations');
    this.profileDetails = this.table('profileDetails');
  }
}

export const db = new LMSDatabase(); 