import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../../data/constants';
import './Gallery.css';
import { GALLERY_IMAGES } from '../../data/constants';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openGallery = (category) => {
    setSelectedCategory(category);
    setCurrentImageIndex(0);
  };

  const closeGallery = () => {
    setSelectedCategory(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedCategory) {
      setCurrentImageIndex((prev) => 
        (prev + 1) % GALLERY_IMAGES[selectedCategory].length
      );
    }
  };

  const prevImage = () => {
    if (selectedCategory) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? GALLERY_IMAGES[selectedCategory].length - 1 : prev - 1
      );
    }
  };

  return (
    <>
      <section className="gallery" id="gallery">
        <h2 className="section-title">Our Gallery</h2>
        <p className="section-subtitle">Take a virtual tour of our facilities</p>
        <div className="gallery-grid">
          {GALLERY_ITEMS.map((item, index) => (
            <div 
              key={index} 
              className="gallery-item"
              onClick={() => openGallery(item.title)}
            >
              <div 
                className="gallery-background"
                style={{ background: item.gradient }}
              >
                <div className="gallery-icon">{item.icon}</div>
              </div>
              <div className="gallery-overlay">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                {/* <button className="view-images-btn">View Images</button> */}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Image Modal */}
      {selectedCategory && (
        <div className="gallery-modal" onClick={closeGallery}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeGallery}>×</button>
            
            <div className="modal-header">
              <h3>{selectedCategory}</h3>
              <p>{GALLERY_ITEMS.find(item => item.title === selectedCategory)?.description}</p>
            </div>

            <div className="image-container">
              <button className="nav-btn prev-btn" onClick={prevImage}>‹</button>
              
              <img 
                src={GALLERY_IMAGES[selectedCategory][currentImageIndex]} 
                alt={selectedCategory}
                className="modal-image"
              />
              
              <button className="nav-btn next-btn" onClick={nextImage}>›</button>
            </div>

            <div className="image-counter">
              {currentImageIndex + 1} / {GALLERY_IMAGES[selectedCategory].length}
            </div>

            <div className="thumbnail-grid">
              {GALLERY_IMAGES[selectedCategory].map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${selectedCategory} ${index + 1}`}
                  className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;





// import React from 'react';
// import { GALLERY_ITEMS } from '../../data/constants';
// import './Gallery.css';

// const Gallery = () => {
//   return (
//     <section className="gallery" id="gallery">
//       <h2 className="section-title">Our Gallery</h2>
//       <p className="section-subtitle">Take a virtual tour of our facilities</p>
//       <div className="gallery-grid">
//         {GALLERY_ITEMS.map((item, index) => (
//           <div key={index} className="gallery-item">
//             <div 
//               className="gallery-background"
//               style={{ background: item.gradient }}
//             >
//               <div className="gallery-icon">{item.icon}</div>
//             </div>
//             <div className="gallery-overlay">
//               <h3>{item.title}</h3>
//               <p>{item.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Gallery;