import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Calendar, Download, Search, AlertCircle, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { useData } from '../contexts/DataContext';

const Finances = () => {
  const { data } = useData();
  const [timeRange, setTimeRange] = useState('month');
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate financial metrics
  const totalRevenue = data.payments.reduce((sum, payment) => sum + payment.amount, 0);
  const paidPayments = data.payments.filter(p => p.status === 'paid');
  const overduePayments = data.payments.filter(p => p.status === 'overdue');
  const totalPaid = paidPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const totalOverdue = overduePayments.reduce((sum, payment) => sum + payment.amount, 0);

  const revenueData = [
    { month: 'Jan', revenue: 42000, expenses: 15000 },
    { month: 'Feb', revenue: 44000, expenses: 16000 },
    { month: 'Mar', revenue: 46000, expenses: 15500 },
    { month: 'Apr', revenue: 43000, expenses: 14800 },
    { month: 'May', revenue: 47000, expenses: 16200 },
    { month: 'Jun', revenue: 45280, expenses: 15800 },
  ];

  const expenseCategories = [
    { name: 'Utilities', value: 8500, color: '#3B82F6' },
    { name: 'Maintenance', value: 4200, color: '#10B981' },
    { name: 'Staff Salary', value: 12000, color: '#F59E0B' },
    { name: 'Supplies', value: 2800, color: '#EF4444' },
  ];

  const PaymentCard = ({ payment }) => (
    <div className="card p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">{payment.studentName}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{payment.month}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-lg text-gray-900 dark:text-white">${payment.amount}</p>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            payment.status === 'paid' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
          }`}>
            {payment.status === 'paid' ? <CheckCircle className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
            {payment.status.toUpperCase()}
          </span>
        </div>
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400">
        Due: {new Date(payment.dueDate).toLocaleDateString()}
        {payment.paidDate && ` • Paid: ${new Date(payment.paidDate).toLocaleDateString()}`}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Financial Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track payments, revenue, and expenses</p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <button className="btn btn-secondary flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Financial Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Total Revenue</p>
              <p className="text-3xl font-bold">${totalRevenue.toLocaleString()}</p>
              <div className="flex items-center mt-2 text-green-100">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+12% from last month</span>
              </div>
            </div>
            <DollarSign className="h-12 w-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Collected</p>
              <p className="text-3xl font-bold">${totalPaid.toLocaleString()}</p>
              <div className="flex items-center mt-2 text-blue-100">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span className="text-sm">{paidPayments.length} payments</span>
              </div>
            </div>
            <CheckCircle className="h-12 w-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-400 to-red-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100">Overdue</p>
              <p className="text-3xl font-bold">${totalOverdue.toLocaleString()}</p>
              <div className="flex items-center mt-2 text-red-100">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span className="text-sm">{overduePayments.length} pending</span>
              </div>
            </div>
            <AlertCircle className="h-12 w-12 text-red-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-400 to-purple-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Net Profit</p>
              <p className="text-3xl font-bold">$28,480</p>
              <div className="flex items-center mt-2 text-purple-100">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+8% margin</span>
              </div>
            </div>
            <TrendingUp className="h-12 w-12 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Expenses */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue vs Expenses</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#10B981" name="Revenue" />
              <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Breakdown */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Expense Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseCategories}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value, percent }) => `${name}: $${value}`}
              >
                {expenseCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Payments */}
      <div className="card">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Payments</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 w-64 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
              />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.payments
              .filter(payment => 
                payment.studentName.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(payment => (
                <PaymentCard key={payment.id} payment={payment} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finances;