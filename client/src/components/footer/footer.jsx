import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <p>&copy; 2025 HostelHub Management System. All rights reserved.</p>
      <p>📍 123 University Road, Kanpur, Uttar Pradesh | 📞 +91-XXXXXXXXXX | ✉️ info@hostelhub.com</p>
      <div className="social-links">
        <a href="#">📘</a>
        <a href="#">📷</a>
        <a href="#">🐦</a>
        <a href="#">💼</a>
      </div>
    </footer>
  );
};

export default Footer;