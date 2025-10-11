import React from 'react';
import './Hostels.css';

const HostelModal = ({ hostel, onClose }) => {
  if (!hostel) return null;

  return (
    <div className="hostel-modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="modal-image">
          <img src={hostel.image} alt={hostel.name} />
        </div>

        <div className="modal-details">
          <div className="modal-header">
            <h3>{hostel.name}</h3>
            <div className="hostel-rating large">
              <span className="star">⭐</span>
              {hostel.rating}
            </div>
          </div>

          <p className="modal-description">{hostel.description}</p>

          <div className="modal-section">
            <h4>Available Room Types</h4>
            <div className="rooms-list">
              {hostel.rooms.split(', ').map((room, index) => (
                <span key={index} className="room-type">{room}</span>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <h4>Facilities</h4>
            <div className="facilities-grid">
              {hostel.facilities.map((facility, index) => (
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
  );
};

export default HostelModal;
