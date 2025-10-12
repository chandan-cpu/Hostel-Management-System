import React, { useEffect, useState } from 'react';

import { BookingForm } from './booking/BookingForm';
import { Calendar, Clock, User, Mail, Phone, Plus, Search, X, CheckCircle, XCircle } from 'lucide-react';
import axios from '../axios';

const Bookings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const [bookings, setBookings] = useState([]);
     const fetchBookings=async()=>{
      const res= await axios.get("/booking-data")
      console.log("Coming Data is :",res.data);
      setBookings(res.data);
      // console.log("Bookings:",bookings.map(booking => booking.id));
    }
  useEffect(()=>{
    //fetch booking data from backen
    fetchBookings();
  },[])

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    confirmed: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
    waitlisted: 'bg-blue-100 text-blue-800 border-blue-200'
  };

  const statusIcons = {
    pending: <Clock className="w-4 h-4" />,
    confirmed: <CheckCircle className="w-4 h-4" />,
    cancelled: <XCircle className="w-4 h-4" />,
    waitlisted: <Calendar className="w-4 h-4" />
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.studentName || !formData.email || !formData.phone || 
        !formData.roomPreference || !formData.checkInDate || !formData.duration) {
      alert('Please fill all required fields');
      return;
    }

    const newBooking = {
      id: bookings.length + 1,
      ...formData,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setBookings([newBooking, ...bookings]);
    setShowAddModal(false);
    setFormData({
      studentName: '',
      email: '',
      phone: '',
      roomPreference: '',
      checkInDate: '',
      duration: '',
      specialRequests: ''
    });
  };

  const updateBookingStatus = (booking, newStatus) => {
    // console.log("Updating booking id:", booking?.id, "to status:", newStatus);
    console.log("Id:", booking?._id);

    // Update status in backend
    axios.patch(`/booking-status/${booking?._id}`, { status: newStatus })
    .then(response => {
      console.log("Status updated:", response.data);
      setBookings(bookings.map(b =>
        //same booking thakibo ako change nhoii
        b.id === booking?._id ? { ...b, status: newStatus } : b
      ));
      fetchBookings();
    });
  };




  console.log("booking Data", bookings?.id);
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
  const waitlistedBookings = bookings.filter(b => b.status === 'waitlisted').length;

  const BookingCard = ({ booking }) => (
    
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-105 transform">
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-3 rounded-full">
              <User className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{booking.studentName}</h3>
              <p className="text-purple-100 text-sm">{booking.roomPreference} Room</p>
            </div>
          </div>
        </div>
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[booking.status]}`}>
          {statusIcons[booking.status]}
          {booking.status.toUpperCase()}
        </span>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Mail className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 font-medium">Email</p>
            <p className="text-sm text-gray-900 font-semibold truncate">{booking.email}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-green-100 p-2 rounded-lg">
            <Phone className="h-5 w-5 text-green-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 font-medium">Phone</p>
            <p className="text-sm text-gray-900 font-semibold">{booking.phone}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-orange-100 p-2 rounded-lg">
            <Calendar className="h-5 w-5 text-orange-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 font-medium">Check-in Date</p>
            <p className="text-sm text-gray-900 font-semibold">
              {new Date(booking.checkInDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-purple-100 p-2 rounded-lg">
            <Clock className="h-5 w-5 text-purple-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 font-medium">Duration</p>
            <p className="text-sm text-gray-900 font-semibold">{booking.duration}</p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Applied on</p>
            <p className="text-sm font-medium text-gray-900">

              {/* //This date also come from backend */}
              {new Date(booking.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        {booking.status === 'pending' ? (
          <div className="flex gap-2">
            <button 
            //booking id come from booking card and backend id
              onClick={() => updateBookingStatus(booking, 'confirmed')
                
              }
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all font-medium shadow-md hover:shadow-lg"
            >
              Approve
            </button>
            <button 
              onClick={() => updateBookingStatus(booking, 'cancelled')}
              className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 text-white py-2 rounded-xl hover:from-red-700 hover:to-rose-700 transition-all font-medium shadow-md hover:shadow-lg"
            >
              Reject
            </button>
          </div>
        ) : (
          <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all font-medium shadow-md hover:shadow-lg">
            View Details
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Booking Management</h1>
            <p className="text-gray-600">Manage room reservations and applications</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            <span>New Booking</span>
          </button>
        </div>

        {showAddModal && <BookingForm onClose={() => setShowAddModal(false)} />}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{totalBookings}</div>
                <div className="text-gray-600 font-medium">Total Bookings</div>
              </div>
              <div className="bg-purple-100 p-4 rounded-xl">
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-yellow-600 mb-1">{pendingBookings}</div>
                <div className="text-gray-600 font-medium">Pending</div>
              </div>
              <div className="bg-yellow-100 p-4 rounded-xl">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-1">{confirmedBookings}</div>
                <div className="text-gray-600 font-medium">Confirmed</div>
              </div>
              <div className="bg-green-100 p-4 rounded-xl">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-1">{waitlistedBookings}</div>
                <div className="text-gray-600 font-medium">Waitlisted</div>
              </div>
              <div className="bg-blue-100 p-4 rounded-xl">
                <User className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search bookings by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="waitlisted">Waitlisted</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBookings.map(booking => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>

        {filteredBookings.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;