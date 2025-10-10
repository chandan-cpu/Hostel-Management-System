import React, { useState } from 'react';
import './Hostels.css';
import { HOSTELS_DATA } from '../../data/constants';

const Hostels = () => {
  const [activeTab, setActiveTab] = useState('girls');
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
            onClick={() => setActiveTab('girls')}
          >
            <span className="tab-icon">👩‍🎓</span>
            Girls Hostels
          </button>
          <button 
            className={`tab-btn ${activeTab === 'boys' ? 'active' : ''}`}
            onClick={() => setActiveTab('boys')}
          >
            <span className="tab-icon">👨‍🎓</span>
            Boys Hostels
          </button>
        </div>

        {/* Hostels Grid */}
        <div className="hostels-grid">
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
        </div>
      </div>

      {/* Hostel Detail Modal */}
      {selectedHostel && (
        <div className="hostel-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>×</button>
            
            <div className="modal-image">
              <img src={selectedHostel.image} alt={selectedHostel.name} />
            </div>
            
            <div className="modal-details">
              <div className="modal-header">
                <h3>{selectedHostel.name}</h3>
                <div className="hostel-rating large">
                  <span className="star">⭐</span>
                  {selectedHostel.rating}
                </div>
              </div>
              
              <p className="modal-description">{selectedHostel.description}</p>
              
              <div className="modal-section">
                <h4>Available Room Types</h4>
                <div className="rooms-list">
                  {selectedHostel.rooms.split(', ').map((room, index) => (
                    <span key={index} className="room-type">{room}</span>
                  ))}
                </div>
              </div>
              
              <div className="modal-section">
                <h4>Facilities</h4>
                <div className="facilities-grid">
                  {selectedHostel.facilities.map((facility, index) => (
                    <div key={index} className="facility-item">
                      <span className="facility-icon">✓</span>
                      {facility}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="modal-actions">
                <button className="book-now-btn">Book Now</button>
                <button className="contact-btn">Contact Warden</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hostels;