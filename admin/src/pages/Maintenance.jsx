import React, { useState } from 'react';
import { Wrench, AlertTriangle, Clock, CheckCircle, Plus, Search, Filter, User } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const Maintenance = () => {
  const { data } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const priorityColors = {
    high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    low: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
  };

  const statusColors = {
    pending: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
    'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
  };

  const filteredIssues = data.maintenance.filter(issue => {
    const matchesSearch = issue.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.room.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'all' || issue.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || issue.status === filterStatus;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const MaintenanceCard = ({ issue }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${
            issue.priority === 'high' ? 'bg-red-100 dark:bg-red-900/30' :
            issue.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
            'bg-green-100 dark:bg-green-900/30'
          }`}>
            <Wrench className={`h-5 w-5 ${
              issue.priority === 'high' ? 'text-red-600 dark:text-red-400' :
              issue.priority === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
              'text-green-600 dark:text-green-400'
            }`} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Room {issue.room}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{issue.issue}</p>
          </div>
        </div>
        <div className="text-right space-y-1">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[issue.priority]}`}>
            {issue.priority.toUpperCase()}
          </span>
          <div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[issue.status]}`}>
              {issue.status.replace('-', ' ').toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{issue.description}</p>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Reported by:</span>
          <span className="font-medium text-gray-900 dark:text-white">{issue.reportedBy}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Assigned to:</span>
          <span className="font-medium text-gray-900 dark:text-white">{issue.assignedTo || 'Unassigned'}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Reported:</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {new Date(issue.reportedAt).toLocaleDateString()}
          </span>
        </div>
        {issue.estimatedCompletion && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Estimated completion:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {new Date(issue.estimatedCompletion).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        {issue.status === 'pending' && (
          <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-medium transition-colors">Assign</button>
        )}
        {issue.status === 'in-progress' && (
          <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-medium transition-colors">Mark Complete</button>
        )}
        <button className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors">View Details</button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Maintenance Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track and resolve maintenance issues</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center space-x-2 mt-4 md:mt-0">
          <Plus className="h-5 w-5" />
          <span>Report Issue</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{data.maintenance.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Issues</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{data.maintenance.filter(m => m.status === 'pending').length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{data.maintenance.filter(m => m.status === 'in-progress').length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">{data.maintenance.filter(m => m.priority === 'high').length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">High Priority</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search issues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Issues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIssues.map(issue => (
          <MaintenanceCard key={issue.id} issue={issue} />
        ))}
      </div>

      {filteredIssues.length === 0 && (
        <div className="text-center py-12">
          <Wrench className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">No maintenance issues found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Maintenance;