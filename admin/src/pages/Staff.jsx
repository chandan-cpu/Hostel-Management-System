import React, { useState } from 'react';
import { UserCheck, Mail, Phone, Calendar, Plus, Search, Filter, Edit, Trash2 } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const Staff = () => {
  const { data } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const roleColors = {
    'Administrator': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    'Maintenance': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
    'Security': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    'Cleaning': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
  };

  const filteredStaff = data.staff.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || staff.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const StaffCard = ({ staff }) => (
    <div className="card p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4 mb-4">
        <img
          src={staff.avatar}
          alt={staff.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{staff.name}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColors[staff.role]}`}>
              {staff.role}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{staff.shift} Shift</p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Mail className="h-4 w-4" />
          <span>{staff.email}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Phone className="h-4 w-4" />
          <span>{staff.phone}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Calendar className="h-4 w-4" />
          <span>Hired: {new Date(staff.hireDate).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
          <span className={`text-sm font-medium ${
            staff.status === 'active' ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'
          }`}>
            {staff.status.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="flex space-x-2">
        <button className="flex-1 btn btn-secondary flex items-center justify-center space-x-1">
          <Edit className="h-4 w-4" />
          <span>Edit</span>
        </button>
        <button className="flex-1 btn btn-primary">View Details</button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Staff Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage staff profiles and assignments</p>
        </div>
        <button className="btn btn-primary flex items-center space-x-2 mt-4 md:mt-0">
          <Plus className="h-5 w-5" />
          <span>Add Staff</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{data.staff.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Staff</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-bold text-green-600">{data.staff.filter(s => s.status === 'active').length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-bold text-blue-600">{data.staff.filter(s => s.shift === 'Day').length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Day Shift</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-bold text-purple-600">{data.staff.filter(s => s.shift === 'Night').length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Night Shift</div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search staff..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="all">All Roles</option>
            <option value="Administrator">Administrator</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Security">Security</option>
            <option value="Cleaning">Cleaning</option>
          </select>
        </div>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map(staff => (
          <StaffCard key={staff.id} staff={staff} />
        ))}
      </div>

      {filteredStaff.length === 0 && (
        <div className="text-center py-12">
          <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">No staff members found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Staff;