import React from 'react';
import { Users, Bed, DollarSign, AlertTriangle, TrendingUp, TrendingDown, Calendar, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { useData } from '../contexts/DataContext';

const Dashboard = () => {
  const { data } = useData();
  
  // Calculate statistics
  const totalStudents = data.students.length;
  const activeStudents = data.students.filter(s => s.status === 'active').length;
  const totalRooms = data.rooms.length;
  const availableRooms = data.rooms.filter(r => r.status === 'available').length;
  const occupiedRooms = data.rooms.filter(r => r.status === 'occupied').length;
  const pendingBookings = data.bookings.filter(b => b.status === 'pending').length;
  const overduePayments = data.payments.filter(p => p.status === 'overdue').length;
  const maintenanceIssues = data.maintenance.filter(m => m.status !== 'completed').length;

  const stats = [
    { 
      name: 'Total Students', 
      value: totalStudents, 
      change: '+12', 
      icon: Users, 
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-700 dark:text-blue-300'
    },
    { 
      name: 'Available Rooms', 
      value: availableRooms, 
      change: '-5', 
      icon: Bed, 
      color: 'bg-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-700 dark:text-green-300'
    },
    { 
      name: 'Monthly Revenue', 
      value: '$45,280', 
      change: '+8%', 
      icon: DollarSign, 
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      textColor: 'text-yellow-700 dark:text-yellow-300'
    },
    { 
      name: 'Pending Issues', 
      value: maintenanceIssues, 
      change: '+3', 
      icon: AlertTriangle, 
      color: 'bg-red-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      textColor: 'text-red-700 dark:text-red-300'
    },
  ];

  const occupancyData = [
    { month: 'Jan', occupancy: 85, revenue: 42000 },
    { month: 'Feb', occupancy: 88, revenue: 44000 },
    { month: 'Mar', occupancy: 92, revenue: 46000 },
    { month: 'Apr', occupancy: 89, revenue: 43000 },
    { month: 'May', occupancy: 94, revenue: 47000 },
    { month: 'Jun', occupancy: 96, revenue: 45280 },
  ];

  const roomTypeData = [
    { name: 'Single', value: 45, color: '#3B82F6' },
    { name: 'Double', value: 85, color: '#10B981' },
    { name: 'Triple', value: 62, color: '#F59E0B' }
  ];

  const recentActivities = [
    { 
      id: 1, 
      type: 'check-in', 
      student: 'John Doe', 
      room: 'A-101', 
      time: '2 hours ago',
      icon: Users,
      color: 'text-green-500'
    },
    { 
      id: 2, 
      type: 'payment', 
      student: 'Jane Smith', 
      amount: '$850', 
      time: '4 hours ago',
      icon: DollarSign,
      color: 'text-blue-500'
    },
    { 
      id: 3, 
      type: 'maintenance', 
      issue: 'AC repair in B-205', 
      status: 'completed', 
      time: '6 hours ago',
      icon: AlertTriangle,
      color: 'text-yellow-500'
    },
    { 
      id: 4, 
      type: 'booking', 
      student: 'Mike Johnson', 
      room: 'C-301', 
      time: '1 day ago',
      icon: Calendar,
      color: 'text-purple-500'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back! Here's what's happening at your hostel.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mt-4 md:mt-0">
          <Clock className="h-4 w-4" />
          <span>Last updated: {new Date().toLocaleString()}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.change.startsWith('+');
          
          return (
            <div key={stat.name} className={`${stat.bgColor} p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
                  <div className="flex items-center mt-2">
                    <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
                    <span className={`ml-2 flex items-center text-sm font-medium ${
                      isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {isPositive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Occupancy & Revenue Chart */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Occupancy & Revenue Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={occupancyData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="right" dataKey="revenue" fill="#3B82F6" fillOpacity={0.3} />
              <Line yAxisId="left" type="monotone" dataKey="occupancy" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Room Types Distribution */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Room Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roomTypeData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {roomTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, 'Rooms']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 card">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activities</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className={`p-2 rounded-full bg-gray-100 dark:bg-gray-700`}>
                      <Icon className={`h-4 w-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.type === 'check-in' && `${activity.student} checked into room ${activity.room}`}
                        {activity.type === 'payment' && `${activity.student} made a payment of ${activity.amount}`}
                        {activity.type === 'maintenance' && `${activity.issue} - ${activity.status}`}
                        {activity.type === 'booking' && `New booking request from ${activity.student}`}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Occupancy Rate</span>
                <span className="font-semibold text-gray-900 dark:text-white">96%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Pending Bookings</span>
                <span className="font-semibold text-gray-900 dark:text-white">{pendingBookings}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Overdue Payments</span>
                <span className="font-semibold text-red-600 dark:text-red-400">{overduePayments}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Staff on Duty</span>
                <span className="font-semibold text-gray-900 dark:text-white">8</span>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Today's Tasks</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Review new applications</span>
              </div>
              <div className="flex items-center space-x-3">
                <input type="checkbox" className="rounded" checked readOnly />
                <span className="text-sm text-gray-600 dark:text-gray-400 line-through">Update room inventory</span>
              </div>
              <div className="flex items-center space-x-3">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Send payment reminders</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;