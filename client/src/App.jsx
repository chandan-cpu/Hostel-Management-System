import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Carousel from './components/Carousel/Carousel';
import Features from './components/Features/Features';
import Hostels from './components/Hostels/Hostels';
import Gallery from './components/Gallery/Gallery';
import Testimonials from './components/Testimonials/Testimonials';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import './App.css';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleAdminClick = () => {
    alert('Admin panel would open here!');
    // You can implement admin panel modal or redirect
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleSwitchToSignup = () => {
    console.log('Switch to signup functionality');
  };

  return (
    <div className="App">
      <Navbar 
        scrollToSection={scrollToSection} 
        onLoginClick={handleLoginClick}
        onAdminClick={handleAdminClick}
      />
      <Carousel scrollToSection={scrollToSection} />
      <Features />
      <Hostels />
      <Gallery />
      <Testimonials />
      <Footer />

      {/* Login Modal */}
      {showLogin && (
        <Login 
          onClose={handleCloseLogin}
          onSwitchToSignup={handleSwitchToSignup}
        />
      )}
    </div>
  );
};

export default App;