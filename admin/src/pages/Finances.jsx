import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Download, Search, AlertCircle, CheckCircle, Clock, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';

const FinancialDashboard = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample payment data
  const payments = [
    { id: 1, studentName: 'Alice Johnson', amount: 1200, status: 'paid', month: 'January 2025', dueDate: '2025-01-15', paidDate: '2025-01-14' },
    { id: 2, studentName: 'Bob Smith', amount: 1500, status: 'paid', month: 'January 2025', dueDate: '2025-01-15', paidDate: '2025-01-10' },
    { id: 3, studentName: 'Carol White', amount: 1200, status: 'overdue', month: 'January 2025', dueDate: '2025-01-15', paidDate: null },
    { id: 4, studentName: 'David Brown', amount: 1800, status: 'paid', month: 'February 2025', dueDate: '2025-02-15', paidDate: '2025-02-12' },
    { id: 5, studentName: 'Emma Davis', amount: 1200, status: 'overdue', month: 'February 2025', dueDate: '2025-02-15', paidDate: null },
    { id: 6, studentName: 'Frank Miller', amount: 1500, status: 'pending', month: 'March 2025', dueDate: '2025-03-15', paidDate: null },
    { id: 7, studentName: 'Grace Wilson', amount: 1200, status: 'paid', month: 'February 2025', dueDate: '2025-02-15', paidDate: '2025-02-14' },
    { id: 8, studentName: 'Henry Taylor', amount: 1800, status: 'pending', month: 'March 2025', dueDate: '2025-03-15', paidDate: null },
    { id: 9, studentName: 'Ivy Anderson', amount: 1200, status: 'paid', month: 'January 2025', dueDate: '2025-01-15', paidDate: '2025-01-13' },
  ];

  // Calculate financial metrics
  const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const paidPayments = payments.filter(p => p.status === 'paid');
  const overduePayments = payments.filter(p => p.status === 'overdue');
  const pendingPayments = payments.filter(p => p.status === 'pending');
  const totalPaid = paidPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const totalOverdue = overduePayments.reduce((sum, payment) => sum + payment.amount, 0);
  const totalPending = pendingPayments.reduce((sum, payment) => sum + payment.amount, 0);

  // Revenue trend data
  const revenueData = [
    { month: 'Aug', revenue: 38000, expenses: 14200, profit: 23800 },
    { month: 'Sep', revenue: 42000, expenses: 15000, profit: 27000 },
    { month: 'Oct', revenue: 44000, expenses: 16000, profit: 28000 },
    { month: 'Nov', revenue: 46000, expenses: 15500, profit: 30500 },
    { month: 'Dec', revenue: 43000, expenses: 14800, profit: 28200 },
    { month: 'Jan', revenue: 47000, expenses: 16200, profit: 30800 },
    { month: 'Feb', revenue: 45280, expenses: 15800, profit: 29480 },
  ];

  // Expense breakdown
  const expenseCategories = [
    { name: 'Salaries', value: 12000, color: '#3B82F6' },
    { name: 'Utilities', value: 8500, color: '#10B981' },
    { name: 'Maintenance', value: 4200, color: '#F59E0B' },
    { name: 'Supplies', value: 2800, color: '#EF4444' },
    { name: 'Marketing', value: 3300, color: '#8B5CF6' },
  ];

  // Payment status distribution
  const paymentStatusData = [
    { name: 'Paid', value: paidPayments.length, color: '#10B981' },
    { name: 'Overdue', value: overduePayments.length, color: '#EF4444' },
    { name: 'Pending', value: pendingPayments.length, color: '#F59E0B' },
  ];

  // Filter payments
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const PaymentCard = ({ payment }) => {
    const statusConfig = {
      paid: {
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-800 dark:text-green-400',
        icon: CheckCircle,
        label: 'PAID'
      },
      overdue: {
        bg: 'bg-red-100 dark:bg-red-900/30',
        text: 'text-red-800 dark:text-red-400',
        icon: AlertCircle,
        label: 'OVERDUE'
      },
      pending: {
        bg: 'bg-yellow-100 dark:bg-yellow-900/30',
        text: 'text-yellow-800 dark:text-yellow-400',
        icon: Clock,
        label: 'PENDING'
      }
    };

    const config = statusConfig[payment.status];
    const StatusIcon = config.icon;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-600">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">{payment.studentName}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center mt-1">
              <Calendar className="h-3 w-3 mr-1" />
              {payment.month}
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg text-gray-900 dark:text-white">${payment.amount.toLocaleString()}</p>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${config.bg} ${config.text}`}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {config.label}
            </span>
          </div>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700">
          <div>Due: {new Date(payment.dueDate).toLocaleDateString()}</div>
          {payment.paidDate && (
            <div className="text-green-600 dark:text-green-400">
              Paid: {new Date(payment.paidDate).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Financial Management</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Track payments, revenue, and expenses</p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2 transition-colors">
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>

        {/* Financial Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-green-400 to-green-600 p-6 rounded-xl text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold mt-2">${totalRevenue.toLocaleString()}</p>
                <div className="flex items-center mt-3 text-green-100">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm">+12% from last month</span>
                </div>
              </div>
              <DollarSign className="h-12 w-12 text-green-200 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-6 rounded-xl text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Collected</p>
                <p className="text-3xl font-bold mt-2">${totalPaid.toLocaleString()}</p>
                <div className="flex items-center mt-3 text-blue-100">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  <span className="text-sm">{paidPayments.length} payments</span>
                </div>
              </div>
              <CheckCircle className="h-12 w-12 text-blue-200 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-400 to-red-600 p-6 rounded-xl text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm font-medium">Overdue</p>
                <p className="text-3xl font-bold mt-2">${totalOverdue.toLocaleString()}</p>
                <div className="flex items-center mt-3 text-red-100">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span className="text-sm">{overduePayments.length} pending</span>
                </div>
              </div>
              <AlertCircle className="h-12 w-12 text-red-200 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-400 to-purple-600 p-6 rounded-xl text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Net Profit</p>
                <p className="text-3xl font-bold mt-2">$29,480</p>
                <div className="flex items-center mt-3 text-purple-100">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm">+8.4% margin</span>
                </div>
              </div>
              <TrendingUp className="h-12 w-12 text-purple-200 opacity-80" />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Trend */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }} 
                />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} name="Revenue" />
                <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} name="Expenses" />
                <Line type="monotone" dataKey="profit" stroke="#3B82F6" strokeWidth={2} name="Profit" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Payment Status */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={paymentStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {paymentStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense Categories */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={expenseCategories}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {expenseCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Payments */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Payments</h3>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search payments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 w-full sm:w-64 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPayments.map(payment => (
                <PaymentCard key={payment.id} payment={payment} />
              ))}
            </div>
            {filteredPayments.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 dark:text-gray-400">No payments found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialDashboard;