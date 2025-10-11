export const mockData = {
  students: [
    {
      id: 1,
      name: 'Chandan Kumar',
      email: 'chandan.kumar@email.com',
      phone: '+91-98765-43210',
      room: 'A-101',
      checkIn: '2025-01-15',
      dues: 0,
      status: 'active',
      course: 'Computer Science',
      year: 'Final Year',
      emergencyContact: 'chandan (+91-98765-43211)',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: 2,
      name: 'Pranshu Singh',
      email: 'pranshu.singh@email.com',
      phone: '+91-98765-43212',
      room: 'B-205',
      checkIn: '2024-02-01',
      dues: 850,
      status: 'active',
      course: 'Business Administration',
      year: 'Second Year',
      emergencyContact: 'Pranshu (+91-98765-43212)',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: 3,
      name: 'Kunal Rastogi',
      email: 'kunal.rastogi@email.com',
      phone: '+91-98765-43213',
      room: null,
      checkIn: null,
      dues: 0,
      status: 'checked-out',
      course: 'Engineering',
      year: 'Third Year',
      emergencyContact: 'Kunal rastogi (+91-98765-43214)',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  ],
  rooms: [
    {
      id: 1,
      number: 'A-101',
      type: 'Single',
      capacity: 1,
      occupied: 1,
      status: 'occupied',
      floor: 1,
      amenities: ['WiFi', 'AC', 'Study Table', 'Wardrobe'],
      rent: 800,
      student: 'John Doe'
    },
    {
      id: 2,
      number: 'A-102',
      type: 'Single',
      capacity: 1,
      occupied: 0,
      status: 'available',
      floor: 1,
      amenities: ['WiFi', 'AC', 'Study Table', 'Wardrobe'],
      rent: 800,
      student: null
    },
    {
      id: 3,
      number: 'B-205',
      type: 'Double',
      capacity: 2,
      occupied: 1,
      status: 'partially-occupied',
      floor: 2,
      amenities: ['WiFi', 'AC', 'Study Tables', 'Wardrobes', 'Balcony'],
      rent: 600,
      student: 'Sarah Wilson'
    },
    {
      id: 4,
      number: 'C-301',
      type: 'Triple',
      capacity: 3,
      occupied: 0,
      status: 'maintenance',
      floor: 3,
      amenities: ['WiFi', 'Fan', 'Study Tables', 'Wardrobes'],
      rent: 500,
      student: null
    }
  ],
  bookings: [
    {
      id: 1,
      studentName: 'Emma Davis',
      email: 'emma.davis@email.com',
      phone: '+1-234-567-8907',
      roomPreference: 'Single',
      checkInDate: '2024-03-15',
      duration: '6 months',
      status: 'pending',
      createdAt: '2024-02-28'
    },
    {
      id: 2,
      studentName: 'Alex Smith',
      email: 'alex.smith@email.com',
      phone: '+1-234-567-8908',
      roomPreference: 'Double',
      checkInDate: '2024-03-01',
      duration: '1 year',
      status: 'confirmed',
      createdAt: '2024-02-15'
    }
  ],
  payments: [
    {
      id: 1,
      studentId: 1,
      studentName: 'John Doe',
      amount: 800,
      type: 'rent',
      status: 'paid',
      dueDate: '2024-03-01',
      paidDate: '2024-02-28',
      month: 'March 2024'
    },
    {
      id: 2,
      studentId: 2,
      studentName: 'Sarah Wilson',
      amount: 600,
      type: 'rent',
      status: 'overdue',
      dueDate: '2024-02-01',
      paidDate: null,
      month: 'February 2024'
    }
  ],
  maintenance: [
    {
      id: 1,
      room: 'C-301',
      issue: 'Air conditioning not working',
      description: 'The AC unit is not cooling properly and making unusual noises',
      priority: 'high',
      status: 'in-progress',
      reportedBy: 'John Doe',
      assignedTo: 'Mike Tech',
      reportedAt: '2024-02-25',
      estimatedCompletion: '2024-03-02'
    },
    {
      id: 2,
      room: 'B-205',
      issue: 'Leaky faucet in bathroom',
      description: 'Water continuously dripping from the bathroom faucet',
      priority: 'medium',
      status: 'pending',
      reportedBy: 'Sarah Wilson',
      assignedTo: null,
      reportedAt: '2024-02-28',
      estimatedCompletion: null
    }
  ],
  staff: [
    {
      id: 1,
      name: 'Mike Tech',
      role: 'Maintenance',
      email: 'mike.tech@hostel.com',
      phone: '+1-234-567-8909',
      shift: 'Day',
      status: 'active',
      hireDate: '2023-06-15',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: 2,
      name: 'Lisa Admin',
      role: 'Administrator',
      email: 'lisa.admin@hostel.com',
      phone: '+1-234-567-8910',
      shift: 'Day',
      status: 'active',
      hireDate: '2023-01-10',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  ]
};