import { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { 
  BookOpen, Users, Calendar, DollarSign, TrendingUp, Clock, AlertCircle
} from 'lucide-react';
import { books, users, borrowings, fines } from '../../const/dummyData';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function Reports() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  // Calculate statistics
  const totalBooks = books.length;
  const totalUsers = users.length;
  const activeBorrowings = borrowings.filter(r => r.status === 'active').length;
  const overdueBooks = borrowings.filter(r => r.status === 'overdue').length;
  const totalFines = fines.reduce((sum, fine) => sum + fine.amount, 0);
  const unpaidFines = fines.filter(f => f.status === 'unpaid').reduce((sum, fine) => sum + fine.amount, 0);

  // Prepare data for charts
  const categoryData = books.reduce((acc, book) => {
    acc[book.category] = (acc[book.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryChartData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value
  }));

  const monthlyBorrowings = borrowings.reduce((acc, record) => {
    const month = new Date(record.borrowDate).toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const monthlyChartData = Object.entries(monthlyBorrowings).map(([name, value]) => ({
    name,
    value
  }));

  const userActivityData = users.map(user => {
    const userBorrowings = borrowings.filter(r => r.userId === user.id).length;
    return {
      name: user.name,
      borrowings: userBorrowings
    };
  }).sort((a, b) => b.borrowings - a.borrowings).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-end">
        <div className="inline-flex rounded-lg border border-gray-200">
          {['week', 'month', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range as 'week' | 'month' | 'year')}
              className={`px-4 py-2 text-sm font-medium ${
                timeRange === range
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Books', value: totalBooks, icon: BookOpen, color: 'bg-blue-500' },
          { title: 'Total Users', value: totalUsers, icon: Users, color: 'bg-green-500' },
          { title: 'Active Borrowings', value: activeBorrowings, icon: Calendar, color: 'bg-yellow-500' },
          { title: 'Overdue Books', value: overdueBooks, icon: AlertCircle, color: 'bg-red-500' },
          { title: 'Total Fines', value: `$${totalFines.toFixed(2)}`, icon: DollarSign, color: 'bg-purple-500' },
          { title: 'Unpaid Fines', value: `$${unpaidFines.toFixed(2)}`, icon: DollarSign, color: 'bg-red-500' },
          { title: 'Average Return Time', value: '7 days', icon: Clock, color: 'bg-indigo-500' },
          { title: 'Growth Rate', value: '+12%', icon: TrendingUp, color: 'bg-green-500' },
        ].map((metric) => (
          <div key={metric.title} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${metric.color} text-white`}>
                <metric.icon className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{metric.title}</p>
                <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Book Categories Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Book Categories</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Borrowings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Borrowings</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" name="Borrowings" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Users */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Users by Borrowings</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="borrowings" fill="#8884d8" name="Borrowings" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Book Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Book Status Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Available', value: books.filter(b => b.status === 'available').length },
                    { name: 'Borrowed', value: books.filter(b => b.status === 'borrowed').length },
                    { name: 'Lost', value: books.filter(b => b.status === 'lost').length },
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
} 