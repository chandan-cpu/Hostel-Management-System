import React from 'react';
import './Navbar.css';

const Navbar = ({ scrollToSection }) => {
  return (
    <nav className="navbar h-18">
      <div className="nav-container">
        <div className="logo">
          <div className="logo-icon">
            <img src="https://hbtu.ac.in/wp-content/uploads/2024/07/hbtu-logo-1.jpg" alt="HBTU Logo" />
          </div>
          <span>HostelHub</span>
        </div>
        <ul className="nav-links">
          <li>
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
              Home
            </a>
          </li>
          <li>
            <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>
              Features
            </a>
          </li>
          <li>
            <a href="#gallery" onClick={(e) => { e.preventDefault(); scrollToSection('gallery'); }}>
              Gallery
            </a>
          </li>
          <li>
            <a href="#hostels" onClick={(e) => { e.preventDefault(); scrollToSection('hostels'); }}>
              Hostels
            </a>
          </li>
          <li>
            <a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollToSection('testimonials'); }}>
              Testimonials
            </a>
          </li>
          <li>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
              Contact
            </a>
          </li>
        </ul>
        <a href="#login" className="login-btn">Login</a>
      </div>
    </nav>
  );
};

export default Navbar;