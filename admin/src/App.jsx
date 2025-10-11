import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Rooms from './pages/Rooms';
import Students from './pages/Students';
import Bookings from './pages/Bookings';
import Finances from './pages/Finances';
import Maintenance from './pages/Maintenance';
import Staff from './pages/Staff';
import Settings from './pages/Settings';
// import { ThemeProvider } from './contexts/ThemeContext';
import { DataProvider } from './contexts/DataContext';
import { RoomProvider } from './contexts/RoomContext';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <RoomProvider>
      <DataProvider>
        <Router>
          <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header onMenuClick={() => setSidebarOpen(true)} />

              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-6 py-8 max-w-7xl">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/rooms" element={<Rooms />} />
                    <Route path="/students" element={<Students />} />
                    <Route path="/bookings" element={<Bookings />} />
                    <Route path="/finances" element={<Finances />} />
                    <Route path="/maintenance" element={<Maintenance />} />
                    <Route path="/staff" element={<Staff />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </div>
              </main>
            </div>
          </div>
        </Router>
      </DataProvider>
    </RoomProvider>
  );
}

export default App;