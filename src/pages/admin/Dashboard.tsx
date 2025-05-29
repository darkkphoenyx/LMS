import { useState, useEffect } from 'react';
import { 
  Book, 
  Users, 
  Calendar, 
  AlertCircle, 
  Clock, 
  TrendingUp, 
  BarChart2, 
  PieChart, 
  Activity as ActivityIcon,
  ArrowUp,
  ArrowDown
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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

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
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Active Users',
      value: getStats()[timeRange].activeUsers,
      change: '+5%',
      trend: 'up',
      icon: Users,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Active Borrowings',
      value: getStats()[timeRange].activeBorrowings,
      change: '-3%',
      trend: 'down',
      icon: Calendar,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Overdue Books',
      value: getStats()[timeRange].overdueBooks,
      change: '-8%',
      trend: 'down',
      icon: AlertCircle,
      color: 'bg-red-100 text-red-600'
    },
    {
      title: 'Total Fines',
      value: getStats()[timeRange].totalFines,
      change: '+15%',
      trend: 'up',
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      title: 'New Members',
      value: getStats()[timeRange].newMembers,
      change: '+20%',
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-indigo-100 text-indigo-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex-1" />
        <div className="flex space-x-2 justify-end w-full">
          {(['week', 'month', 'year'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                <span className="ml-1 text-sm font-medium">{stat.change}</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900">{stat.title}</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">
              {timeRange === 'week' ? 'Daily' : timeRange === 'month' ? 'Weekly' : 'Monthly'} Borrowings
            </h2>
            <BarChart2 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyBorrowingsData[timeRange]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={timeRange === 'week' ? 'day' : 'month'} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Book Categories</h2>
            <PieChart className="w-5 h-5 text-gray-400" />
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
                  {bookCategoriesData[timeRange].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
            <ActivityIcon className="w-5 h-5 text-gray-400" />
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          ) : recentActivity.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No recent activity to display
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
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
                    <tr key={activity.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="capitalize">{activity.type}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{activity.user}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{activity.book}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {activity.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                          activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
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