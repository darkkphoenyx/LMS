import { useState } from 'react';
import { Search, Book, User, Calendar, Filter, ChevronDown, ChevronUp } from 'lucide-react';

interface SearchResult {
  type: 'book' | 'user' | 'borrowing';
  id: string;
  title?: string;
  name?: string;
  author?: string;
  email?: string;
  status?: string;
  date?: string;
  details?: string;
}

// Dummy search results
const dummyResults: SearchResult[] = [
  {
    type: 'book',
    id: '101',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    status: 'Available',
    details: 'ISBN: 9780743273565, Category: Fiction'
  },
  {
    type: 'user',
    id: '201',
    name: 'John Doe',
    email: 'john.doe@example.com',
    status: 'Active',
    details: 'Member since: 2023-01-15'
  },
  {
    type: 'borrowing',
    id: '301',
    title: 'To Kill a Mockingbird',
    name: 'Jane Smith',
    status: 'Borrowed',
    date: '2024-05-01',
    details: 'Due date: 2024-05-15'
  },
  {
    type: 'book',
    id: '102',
    title: '1984',
    author: 'George Orwell',
    status: 'Borrowed',
    details: 'ISBN: 9780451524935, Category: Dystopian'
  },
  {
    type: 'user',
    id: '202',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    status: 'Active',
    details: 'Member since: 2023-03-20'
  },
  {
    type: 'borrowing',
    id: '302',
    title: 'The Great Gatsby',
    name: 'John Doe',
    status: 'Returned',
    date: '2024-04-20',
    details: 'Returned on: 2024-05-01'
  }
];

export function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<('book' | 'user' | 'borrowing')[]>(['book', 'user', 'borrowing']);
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredResults = dummyResults.filter(result => {
    const matchesSearch = (
      result.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesType = selectedTypes.includes(result.type);
    const matchesDate = !dateRange.start || !dateRange.end || (
      result.date && 
      new Date(result.date) >= new Date(dateRange.start) && 
      new Date(result.date) <= new Date(dateRange.end)
    );
    const matchesStatus = statusFilter === 'all' || result.status === statusFilter;
    
    return matchesSearch && matchesType && matchesDate && matchesStatus;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'book': return <Book className="w-5 h-5" />;
      case 'user': return <User className="w-5 h-5" />;
      case 'borrowing': return <Calendar className="w-5 h-5" />;
      default: return <Search className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'book': return 'bg-blue-100 text-blue-800';
      case 'user': return 'bg-green-100 text-green-800';
      case 'borrowing': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleType = (type: 'book' | 'user' | 'borrowing') => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Advanced Search</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Filter className="w-5 h-5" />
          <span>Filters</span>
          {showFilters ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search books, users, or borrowing history..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Types</label>
            <div className="space-y-2">
              {(['book', 'user', 'borrowing'] as const).map(type => (
                <label key={type} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => toggleType(type)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <div className="space-y-2">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="Available">Available</option>
              <option value="Borrowed">Borrowed</option>
              <option value="Returned">Returned</option>
              <option value="Active">Active</option>
            </select>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Additional Info</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredResults.map((result) => (
                <tr key={`${result.type}-${result.id}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full ${getTypeColor(result.type)}`}>
                        {getTypeIcon(result.type)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 capitalize">{result.type}</div>
                        <div className="text-sm text-gray-500">ID: {result.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {result.title || result.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {result.author || result.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      result.status === 'Available' ? 'bg-green-100 text-green-800' :
                      result.status === 'Borrowed' ? 'bg-yellow-100 text-yellow-800' :
                      result.status === 'Returned' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {result.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {result.date ? new Date(result.date).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {result.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 