import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ scrollToSection }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const goTo = (section) => {
    // if we're already on the home page, just scroll
    if (location.pathname === '/') {
      scrollToSection(section);
    } else {
      // navigate to home and provide the scroll target in location state
      navigate('/', { state: { scrollTo: section } });
    }
  };

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
            <a href="#home" onClick={(e) => { e.preventDefault(); goTo('home'); }}>
              Home
            </a>
          </li>
          <li>
            <a href="#features" onClick={(e) => { e.preventDefault(); goTo('features'); }}>
              Features
            </a>
          </li>
          <li>
            <a href="#gallery" onClick={(e) => { e.preventDefault(); goTo('gallery'); }}>
              Gallery
            </a>
          </li>
          <li>
            <a href="#hostels" onClick={(e) => { e.preventDefault(); goTo('hostels'); }}>
              Hostels
            </a>
          </li>
          <li>
            <a href="#testimonials" onClick={(e) => { e.preventDefault(); goTo('testimonials'); }}>
              Testimonials
            </a>
          </li>
          <li>
            <a href="#contact" onClick={(e) => { e.preventDefault(); goTo('contact'); }}>
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