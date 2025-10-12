import React, { useEffect, useState } from 'react';
import { MagnifyingGlassIcon, PlusIcon, PencilIcon, PhoneIcon, EnvelopeIcon, HomeIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import axios from '../axios.jsx';
import StudentForm from './student/FormData.jsx';
import OverDuesClear from './student/OverDuesClear.jsx';

const StudentCards = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [boxOpen, setBoxOpen] = useState(false);

  // Sample data
  // const students = [
  //   {
  //     id: 1,
  //     name: 'Alice Johnson',
  //     email: 'alice.j@university.edu',
  //     phone: '+1 (555) 123-4567',
  //     avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
  //     year: '3rd Year',
  //     course: 'Computer Science',
  //     room: 'A-301',
  //     checkIn: '2024-08-15',
  //     dues: 0,
  //     status: 'active'
  //   },
  //   {
  //     id: 2,
  //     name: 'Bob Smith',
  //     email: 'bob.smith@university.edu',
  //     phone: '+1 (555) 234-5678',
  //     avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
  //     year: '2nd Year',
  //     course: 'Mechanical Engineering',
  //     room: 'B-205',
  //     checkIn: '2024-08-20',
  //     dues: 450,
  //     status: 'active'
  //   },
  //   {
  //     id: 3,
  //     name: 'Carol White',
  //     email: 'carol.w@university.edu',
  //     phone: '+1 (555) 345-6789',
  //     avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carol',
  //     year: '4th Year',
  //     course: 'Business Administration',
  //     room: 'C-102',
  //     checkIn: '2024-07-10',
  //     dues: 650,
  //     status: 'active'
  //   },
  //   {
  //     id: 4,
  //     name: 'David Brown',
  //     email: 'david.b@university.edu',
  //     phone: '+1 (555) 456-7890',
  //     avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
  //     year: '1st Year',
  //     course: 'Electrical Engineering',
  //     room: null,
  //     checkIn: null,
  //     dues: 0,
  //     status: 'checked-out'
  //   },
  //   {
  //     id: 5,
  //     name: 'Emma Davis',
  //     email: 'emma.d@university.edu',
  //     phone: '+1 (555) 567-8901',
  //     avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
  //     year: '3rd Year',
  //     course: 'Psychology',
  //     room: 'A-215',
  //     checkIn: '2024-08-18',
  //     dues: 200,
  //     status: 'active'
  //   },
  //   {
  //     id: 6,
  //     name: 'Frank Miller',
  //     email: 'frank.m@university.edu',
  //     phone: '+1 (555) 678-9012',
  //     avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Frank',
  //     year: '2nd Year',
  //     course: 'Biology',
  //     room: 'D-308',
  //     checkIn: '2024-08-12',
  //     dues: 0,
  //     status: 'active'
  //   }
  // ];

  const [students, setStudents] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const fetchStudents=async()=>{
      const response =await axios.get('/get-students');

      console.log(response.data);
      setStudents(response.data);
    }

    fetchStudents();
  }, [showAddModal]);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.phone.includes(searchTerm);
    const matchesStatus = selectedStatus === 'all' || student.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'checked-out':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getDuesColor = (dues) => {
    if (dues === 0) return 'text-green-600';
    if (dues > 500) return 'text-red-600';
    return 'text-yellow-600';
  };
  const [selectedStudent, setSelectedStudent] = useState(null);
  let id="";

  const handleViewDetails = (studentId) => {
    // const student = students.find(s => s.id === studentId);
    // const id=studentId;
    console.log("View details for student ID:", studentId);
    setSelectedStudent(studentId);

    // Implement the logic to view student details
  }

  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === 'active').length;
  const totalDues = students.reduce((sum, student) => sum + student.dues, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Students</h1>
            <p className="text-gray-600">Manage and view all student information</p>
          </div>
          <button
          onClick={(e) => {
              setShowAddModal(true);
              console.log("Add Student button clicked");
            }} 
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            <PlusIcon className="w-5 h-5" />
            Add Student
          </button>
        </div>
        {showAddModal && <StudentForm onClose={() => setShowAddModal(false)} />}
        
        
        

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {totalStudents}
                </div>
                <div className="text-gray-600 font-medium">Total Students</div>
              </div>
              <div className="bg-blue-100 p-4 rounded-xl">
                <AcademicCapIcon className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {activeStudents}
                </div>
                <div className="text-gray-600 font-medium">Active Students</div>
              </div>
              <div className="bg-green-100 p-4 rounded-xl">
                <HomeIcon className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-red-600 mb-1">
                  ₹{totalDues}
                </div>
                <div className="text-gray-600 font-medium">Outstanding Dues</div>
              </div>
              <div className="bg-red-100 p-4 rounded-xl">
                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="checked-out">Checked Out</option>
            </select>
          </div>
        </div>

        {/* Student Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-105 transform"
            >
              {/* Card Header with Avatar */}
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 relative">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(student.status)}`}>
                    {student.status}
                  </span>
                  <button className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors">
                    <PencilIcon className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    className="h-24 w-24 rounded-full border-4 border-white shadow-lg"
                    src={student.avatar}
                    alt={student.name}
                  />
                  <h3 className="text-xl font-bold text-white mt-4">
                    {student.name}
                  </h3>
                  <p className="text-blue-100 text-sm">{student.year}</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                {/* Course */}
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <AcademicCapIcon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium">Course</p>
                    <p className="text-sm text-gray-900 font-semibold">{student.course}</p>
                  </div>
                </div>

                {/* Room */}
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <HomeIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium">Room</p>
                    <p className="text-sm text-gray-900 font-semibold">
                      {student.room || 'Not assigned'}
                    </p>
                    {student.checkIn && (
                      <p className="text-xs text-gray-500 mt-1">
                        Since {new Date(student.checkIn).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <EnvelopeIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium">Email</p>
                    <p className="text-sm text-gray-900 font-semibold truncate">{student.email}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <PhoneIcon className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium">Phone</p>
                    <p className="text-sm text-gray-900 font-semibold">{student.phone}</p>
                  </div>
                </div>

                {/* Dues */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 font-medium">Outstanding Dues</span>
                    <span className={`text-lg font-bold ${getDuesColor(student.dues)}`}>
                      ₹{student.dues}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6">
                <button onClick={() => {
                  handleViewDetails(student?._id);
                  setBoxOpen(true);
                }} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-md hover:shadow-lg cursor-pointer">
                  View Details
                </button>
              </div>
              {boxOpen && <OverDuesClear onClose={() => setBoxOpen(false)} id={selectedStudent} />}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredStudents.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MagnifyingGlassIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No students found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCards;