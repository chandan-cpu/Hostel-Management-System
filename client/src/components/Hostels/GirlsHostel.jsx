import React, { useState } from 'react';
import './Hostels.css';
import { HOSTELS_DATA } from '../../data/constants';
import HostelModal from './HostelModal';

const GirlsHostel = () => {
  const [selectedHostel, setSelectedHostel] = useState(null);
  const hostels = HOSTELS_DATA['girls'] || [];

  return (
    <section className="hostels" id={`girls-hostels`}>
      <div className="hostels-container">
        <h2 className="section-title">Girls Hostels</h2>
        <p className="section-subtitle">
          Safe and comfortable accommodation for all students
        </p>

        <div className="hostels-grid">
          {hostels.map((hostel) => (
            <div
              key={hostel.id}
              className="hostel-card"
              onClick={() => setSelectedHostel(hostel)}
            >
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
                    <span className="facility-tag">
                      +{hostel.facilities.length - 3} more
                    </span>
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

      {selectedHostel && (
        <HostelModal
          hostel={selectedHostel}
          onClose={() => setSelectedHostel(null)}
        />
      )}
    </section>
  );
};

export default GirlsHostel;
