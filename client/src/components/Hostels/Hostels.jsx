import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hostels.css';
import { HOSTELS_DATA } from '../../data/constants';

const Hostels = ({ defaultTab }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(defaultTab || 'girls');

  useEffect(() => {
    if (defaultTab) setActiveTab(defaultTab);
  }, [defaultTab]);
  const [selectedHostel, setSelectedHostel] = useState(null);

  const openModal = (hostel) => {
    setSelectedHostel(hostel);
  };

  const closeModal = () => {
    setSelectedHostel(null);
  };

  return (
    <section className="hostels" id="hostels">
      <div className="hostels-container">
        <h2 className="section-title">Our Hostels</h2>
        <p className="section-subtitle">Safe and comfortable accommodation for all students</p>

        {/* Tab Navigation */}
        <div className="hostel-tabs">
          <button
            className={`tab-btn ${activeTab === 'girls' ? 'active' : ''}`}
            onClick={() => navigate('/hostels/girls')}
          >
            <span className="tab-icon">👩‍🎓</span>
            Girls Hostels
          </button>
          <button
            className={`tab-btn ${activeTab === 'boys' ? 'active' : ''}`}
            onClick={() => navigate('/hostels/boys')}
          >
            <span className="tab-icon">👨‍🎓</span>
            Boys Hostels
          </button>
        </div>

        {/* Hostels Grid */}
        {/* <div className="hostels-grid">
          {HOSTELS_DATA[activeTab].map((hostel) => (
            <div key={hostel.id} className="hostel-card" onClick={() => openModal(hostel)}>
              <div className="hostel-image">
                <img src={hostel.image} alt={hostel.name} />
                <div className="hostel-rating">
                  <span className="star">⭐</span>
                  {hostel.rating}
                </div>
              </div>
              
              <div className="hostel-content">
                <h3>{hostel.name}</h3>
                <p className="hostel-description">{hostel.description}</p>
                
                <div className="hostel-facilities">
                  {hostel.facilities.slice(0, 3).map((facility, index) => (
                    <span key={index} className="facility-tag">{facility}</span>
                  ))}
                  {hostel.facilities.length > 3 && (
                    <span className="facility-tag">+{hostel.facilities.length - 3} more</span>
                  )}
                </div>
                
                <div className="hostel-rooms">
                  <span className="rooms-info">🏠 {hostel.rooms}</span>
                </div>
                
                <button className="view-details-btn">View Details</button>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default Hostels;