import React, { createContext, useContext, useState } from 'react';
import { mockData } from '../data/Mock';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(mockData);

  const updateStudent = (id, updates) => {
    setData(prev => ({
      ...prev,
      students: prev.students.map(student => 
        student.id === id ? { ...student, ...updates } : student
      )
    }));
  };

  const updateRoom = (id, updates) => {
    setData(prev => ({
      ...prev,
      rooms: prev.rooms.map(room => 
        room.id === id ? { ...room, ...updates } : room
      )
    }));
  };

  const addBooking = (booking) => {
    setData(prev => ({
      ...prev,
      bookings: [...prev.bookings, { ...booking, id: Date.now() }]
    }));
  };

  const updateBooking = (id, updates) => {
    setData(prev => ({
      ...prev,
      bookings: prev.bookings.map(booking => 
        booking.id === id ? { ...booking, ...updates } : booking
      )
    }));
  };

  return (
    <DataContext.Provider value={{
      data,
      updateStudent,
      updateRoom,
      addBooking,
      updateBooking,
    }}>
      {children}
    </DataContext.Provider>
  );
};