import React from 'react';
import './Navbar.css';

const Navbar = ({ scrollToSection, onLoginClick, onAdminClick }) => {
  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <div className="logo-icon">
            <img src="https://hbtu.ac.in/wp-content/uploads/2024/07/hbtu-logo-1.jpg" alt="HBTU Logo" />
          </div>
          <span>HostelHub</span>
        </div>

        <ul className="nav-links">
          <li><a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>Home</a></li>
          <li><a href="#features" onClick={(e) => { e.preventDefault(); handleNavClick('features'); }}>Features</a></li>
          <li><a href="#hostels" onClick={(e) => { e.preventDefault(); handleNavClick('hostels'); }}>Hostels</a></li>
          <li><a href="#gallery" onClick={(e) => { e.preventDefault(); handleNavClick('gallery'); }}>Gallery</a></li>
          <li><a href="#testimonials" onClick={(e) => { e.preventDefault(); handleNavClick('testimonials'); }}>Testimonials</a></li>
          <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>Contact</a></li>
        </ul>

        <div className="nav-actions">
          <button className="admin-btn" onClick={onAdminClick} title="Admin Panel">
            <span className="admin-icon">👨‍💼</span>
            <span className="admin-text">Admin</span>
          </button>
          <button className="login-btn" onClick={onLoginClick}>
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;