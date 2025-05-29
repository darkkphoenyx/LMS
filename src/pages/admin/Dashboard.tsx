import { useState, useEffect } from 'react';
import { 
  Book, 
  Users, 
  Calendar, 
  AlertCircle, 
  Clock, 
  TrendingUp, 
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  BookOpen,
  Library,
  BookText
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';
import { db, type Activity } from '../../lib/db';
import { liveQuery } from 'dexie';

// Dummy data for different time ranges
const monthlyBorrowingsData = {
  week: [
    { day: 'Mon', count: 8 },
    { day: 'Tue', count: 12 },
    { day: 'Wed', count: 10 },
    { day: 'Thu', count: 15 },
    { day: 'Fri', count: 9 },
    { day: 'Sat', count: 6 },
    { day: 'Sun', count: 4 }
  ],
  month: [
    { month: 'Week 1', count: 45 },
    { month: 'Week 2', count: 52 },
    { month: 'Week 3', count: 48 },
    { month: 'Week 4', count: 60 }
  ],
  year: [
    { month: 'Jan', count: 45 },
    { month: 'Feb', count: 52 },
    { month: 'Mar', count: 48 },
    { month: 'Apr', count: 60 },
    { month: 'May', count: 55 },
    { month: 'Jun', count: 65 },
    { month: 'Jul', count: 58 },
    { month: 'Aug', count: 62 },
    { month: 'Sep', count: 70 },
    { month: 'Oct', count: 75 },
    { month: 'Nov', count: 68 },
    { month: 'Dec', count: 80 }
  ]
};

const bookCategoriesData = {
  week: [
    { name: 'Fiction', value: 35 },
    { name: 'Non-Fiction', value: 25 },
    { name: 'Science', value: 20 },
    { name: 'History', value: 15 },
    { name: 'Biography', value: 5 }
  ],
  month: [
    { name: 'Fiction', value: 120 },
    { name: 'Non-Fiction', value: 85 },
    { name: 'Science', value: 70 },
    { name: 'History', value: 55 },
    { name: 'Biography', value: 20 }
  ],
  year: [
    { name: 'Fiction', value: 1200 },
    { name: 'Non-Fiction', value: 850 },
    { name: 'Science', value: 700 },
    { name: 'History', value: 550 },
    { name: 'Biography', value: 200 }
  ]
};

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

interface Stats {
  totalBooks: string;
  activeUsers: string;
  activeBorrowings: string;
  overdueBooks: string;
  totalFines: string;
  newMembers: string;
}

interface TimeRangeStats {
  week: Stats;
  month: Stats;
  year: Stats;
}

export function Dashboard() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const subscription = liveQuery(async () => {
      const activities = await db.activities.toArray();
      activities.sort((a, b) => {
        const aTime = typeof a.timestamp === 'number' ? a.timestamp : Number(a.id);
        const bTime = typeof b.timestamp === 'number' ? b.timestamp : Number(b.id);
        return bTime - aTime;
      });
      return activities.slice(0, 10);
    }).subscribe({
      next: (activities) => {
        setRecentActivity(activities);
        setIsLoading(false);
        setError(null);
      },
      error: (err) => {
        setError('Failed to load recent activity. Please try again later.');
        setIsLoading(false);
        console.error('Error loading recent activity:', err);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  // Calculate stats based on time range
  const getStats = (): TimeRangeStats => {
    const baseStats: TimeRangeStats = {
      week: {
        totalBooks: '1,234',
        activeUsers: '856',
        activeBorrowings: '245',
        overdueBooks: '12',
        totalFines: '$245',
        newMembers: '45'
      },
      month: {
        totalBooks: '1,234',
        activeUsers: '856',
        activeBorrowings: '245',
        overdueBooks: '12',
        totalFines: '$245',
        newMembers: '45'
      },
      year: {
        totalBooks: '1,234',
        activeUsers: '856',
        activeBorrowings: '245',
        overdueBooks: '12',
        totalFines: '$245',
        newMembers: '45'
      }
    };

    return baseStats;
  };

  const stats = [
    {
      title: 'Total Books',
      value: getStats()[timeRange].totalBooks,
      change: '+12%',
      trend: 'up',
      icon: Book,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Active Users',
      value: getStats()[timeRange].activeUsers,
      change: '+5%',
      trend: 'up',
      icon: Users,
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      title: 'Active Borrowings',
      value: getStats()[timeRange].activeBorrowings,
      change: '-3%',
      trend: 'down',
      icon: Calendar,
      color: 'from-violet-500 to-violet-600'
    },
    {
      title: 'Overdue Books',
      value: getStats()[timeRange].overdueBooks,
      change: '-8%',
      trend: 'down',
      icon: AlertCircle,
      color: 'from-rose-500 to-rose-600'
    },
    {
      title: 'Total Fines',
      value: getStats()[timeRange].totalFines,
      change: '+15%',
      trend: 'up',
      icon: Clock,
      color: 'from-amber-500 to-amber-600'
    },
    {
      title: 'New Members',
      value: getStats()[timeRange].newMembers,
      change: '+20%',
      trend: 'up',
      icon: TrendingUp,
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  return (
    <div className="space-y-6 relative z-0">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-indigo-700/90"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <Library className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Welcome back, Admin!</h1>
                <p className="text-blue-100 mt-1">Here's what's happening in your library today.</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-blue-100">Total Books</p>
                <p className="text-2xl font-bold">12,345</p>
              </div>
              <div className="h-12 w-px bg-white/20"></div>
              <div className="text-right">
                <p className="text-sm text-blue-100">Active Members</p>
                <p className="text-2xl font-bold">2,345</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex justify-between items-center bg-white rounded-xl p-4 shadow-sm relative z-0">
        <div className="flex-1" />
        <div className="flex space-x-2 justify-end w-full">
          {(['week', 'month', 'year'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                timeRange === range
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-0">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-200 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} group-hover:scale-110 transition-transform duration-200`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center ${
                  stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {stat.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  <span className="ml-1 text-sm font-medium">{stat.change}</span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-0">
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                {timeRange === 'week' ? 'Daily' : timeRange === 'month' ? 'Weekly' : 'Monthly'} Borrowings
              </h2>
              <p className="mt-1 text-sm text-gray-500">Overview of book borrowing trends</p>
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-50">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyBorrowingsData[timeRange]}>
                <defs>
                  <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                <XAxis 
                  dataKey={timeRange === 'week' ? 'day' : 'month'} 
                  className="text-sm text-gray-500"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  className="text-sm text-gray-500"
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    padding: '0.75rem'
                  }}
                />
                <Bar 
                  dataKey="count" 
                  fill="url(#colorBar)" 
                  radius={[4, 4, 0, 0]}
                  className="hover:opacity-80 transition-opacity duration-200"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Book Categories</h2>
              <p className="mt-1 text-sm text-gray-500">Distribution of books by category</p>
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-50">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={bookCategoriesData[timeRange]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {bookCategoriesData[timeRange].map((_, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                      className="hover:opacity-80 transition-opacity duration-200"
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    padding: '0.75rem'
                  }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 relative z-0">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
              <p className="mt-1 text-sm text-gray-500">Latest actions in the library system</p>
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-50">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          ) : recentActivity.length === 0 ? (
            <div className="text-center py-12">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <div className="absolute inset-0 bg-blue-50 rounded-full animate-pulse"></div>
                <BookOpen className="w-12 h-12 text-blue-500 relative z-10 mx-auto mt-6" />
              </div>
              <p className="text-gray-500">No recent activity to display</p>
              <p className="text-sm text-gray-400 mt-1">Check back later for updates</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentActivity.map((activity) => (
                    <tr key={activity.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-lg ${
                            activity.type === 'borrow' ? 'bg-blue-50 text-blue-600' :
                            activity.type === 'return' ? 'bg-emerald-50 text-emerald-600' :
                            'bg-amber-50 text-amber-600'
                          }`}>
                            <BookText className="w-4 h-4" />
                          </div>
                          <span className="ml-3 capitalize text-sm font-medium text-gray-900">{activity.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <Users className="w-4 h-4 text-gray-500" />
                          </div>
                          <div className="ml-3 text-sm text-gray-900">{activity.user}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <Book className="w-4 h-4 text-gray-500" />
                          </div>
                          <div className="ml-3 text-sm text-gray-900">{activity.book}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {activity.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          activity.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                          activity.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                          'bg-rose-100 text-rose-800'
                        }`}>
                          {activity.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 