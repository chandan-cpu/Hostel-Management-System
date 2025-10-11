import React, { useState ,useEffect} from 'react';
import { Bed, Users, Settings, Plus, Search, Filter, Eye, Edit, Trash2, X } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import axios from '../axios.jsx';
// import { set } from 'mongoose';
import { FormData } from './Rooms/FormData';
import { RoomContext } from '../contexts/RoomContext.jsx';
import { useContext } from 'react'; 
import RoomCard from './Rooms/RoomCard.jsx';


const Rooms = () => {
    const { rooms, loading } = useContext(RoomContext);
    if (loading) return <p>Loading rooms...</p>;
  // const { data, updateRoom } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  // const [amenityInput, setAmenityInput] = useState("");

  // const [occupants, setOccupants] = useState([""]);

  const statusColors = {
    available: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    occupied: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    'partially-occupied': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    maintenance: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
  };

  // const filteredRooms = data.rooms.filter(room => {
  //   const matchesSearch = room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     room.type.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesFilter = filterStatus === 'all' || room.status === filterStatus;
  //   return matchesSearch && matchesFilter;
  // });



  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Room Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage room inventory and assignments</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-amber-50 flex items-center space-x-2 mt-4 md:mt-0 p-2 rounded-md hover:shadow-md transition-shadow sm:w-50"
        >
          <Plus className="h-5 w-5" />
          <span>Add Room</span>
        </button>
      </div>
  {showAddModal && (<FormData onClose={() => setShowAddModal(false)} />)}

     



      {/* Stats */}
      <div className="flex flex-wrap justify-between md:flex-row gap-4">
        <div className="card p-4">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{rooms.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Rooms</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-bold text-green-600">{rooms.filter(r => r.status === 'Available').length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Available</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-bold text-red-600">{rooms.filter(r => r.status === 'Occupied').length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Occupied</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-bold text-yellow-600">{rooms.filter(r => r.status === 'Maintenance').length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Maintenance</div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search rooms..."
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
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="partially-occupied">Partially Occupied</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
      </div>

      {/* Rooms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {rooms.map((room) => (
        <RoomCard key={room._id} room={room} />
      ))}
    </div>

      {/* {filteredRooms.length === 0 && (
        <div className="text-center py-12">
          <Bed className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">No rooms found matching your criteria.</p>
        </div>
      )} */}
    </div>
  );
};

export default Rooms;