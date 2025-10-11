import React, { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, Plus, Search, Filter } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const Bookings = () => {
  const { data, updateBooking } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    confirmed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    waitlisted: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
  };

  const filteredBookings = data.bookings.filter(booking => {
    const matchesSearch = booking.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const BookingCard = ({ booking }) => (
    <div className="card p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{booking.studentName}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{booking.roomPreference} Room</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>
          {booking.status.toUpperCase()}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Mail className="h-4 w-4" />
          <span>{booking.email}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Phone className="h-4 w-4" />
          <span>{booking.phone}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Calendar className="h-4 w-4" />
          <span>Check-in: {new Date(booking.checkInDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Clock className="h-4 w-4" />
          <span>Duration: {booking.duration}</span>
        </div>
      </div>

      <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Applied on</p>
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {new Date(booking.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="flex space-x-2">
        {booking.status === 'pending' && (
          <>
            <button 
              onClick={() => updateBooking(booking.id, { status: 'confirmed' })}
              className="flex-1 btn btn-primary"
            >
              Approve
            </button>
            <button 
              onClick={() => updateBooking(booking.id, { status: 'cancelled' })}
              className="flex-1 btn btn-secondary"
            >
              Reject
            </button>
          </>
        )}
        {booking.status !== 'pending' && (
          <button className="flex-1 btn btn-secondary">View Details</button>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Booking Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage room reservations and applications</p>
        </div>
        <button className="btn btn-primary flex items-center space-x-2 mt-4 md:mt-0">
          <Plus className="h-5 w-5" />
          <span>New Booking</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{data.bookings.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Bookings</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-bold text-yellow-600">{data.bookings.filter(b => b.status === 'pending').length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-bold text-green-600">{data.bookings.filter(b => b.status === 'confirmed').length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Confirmed</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-bold text-blue-600">{data.bookings.filter(b => b.status === 'waitlisted').length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Waitlisted</div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
            <option value="waitlisted">Waitlisted</option>
          </select>
        </div>
      </div>

      {/* Bookings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBookings.map(booking => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">No bookings found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Bookings;