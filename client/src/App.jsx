import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: '🏢',
      title: 'Welcome to Modern Hostel Living',
      subtitle: 'Your home away from home with world-class facilities',
      buttonText: 'Explore Features',
      buttonLink: 'features'
    },
    {
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: '🛏️',
      title: 'Comfortable Rooms & Amenities',
      subtitle: 'Experience premium comfort with modern amenities',
      buttonText: 'View Gallery',
      buttonLink: 'gallery'
    },
    {
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      icon: '👥',
      title: 'Community & Support',
      subtitle: 'Join a vibrant community with 24/7 support',
      buttonText: 'Read Reviews',
      buttonLink: 'testimonials'
    }
  ];

  const features = [
    {
      icon: '🔐',
      title: 'Secure Environment',
      description: '24/7 security with CCTV surveillance and biometric access control for your safety'
    },
    {
      icon: '📶',
      title: 'High-Speed WiFi',
      description: 'Unlimited high-speed internet connectivity in all rooms and common areas'
    },
    {
      icon: '🍽️',
      title: 'Quality Meals',
      description: 'Nutritious and delicious meals prepared with hygiene and variety in mind'
    },
    {
      icon: '🧺',
      title: 'Laundry Service',
      description: 'Convenient laundry facilities and services to keep your wardrobe fresh'
    },
    {
      icon: '📚',
      title: 'Study Rooms',
      description: 'Quiet study spaces with comfortable seating and proper lighting'
    },
    {
      icon: '💪',
      title: 'Fitness Center',
      description: 'Well-equipped gym and recreation facilities for your wellness'
    }
  ];

  const galleryItems = [
    {
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: '🛏️',
      title: 'Deluxe Rooms',
      description: 'Spacious and comfortable'
    },
    {
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: '🍴',
      title: 'Dining Area',
      description: 'Clean and hygienic'
    },
    {
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: '🛋️',
      title: 'Common Area',
      description: 'Relax and socialize'
    },
    {
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      icon: '📖',
      title: 'Study Room',
      description: 'Focus on your goals'
    },
    {
      gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      icon: '🏋️',
      title: 'Fitness Center',
      description: 'Stay healthy and fit'
    },
    {
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      icon: '🅿️',
      title: 'Parking Area',
      description: 'Safe vehicle parking'
    }
  ];

  const testimonials = [
    {
      name: 'Rahul Sharma',
      role: 'Engineering Student',
      avatar: 'RS',
      text: "The best hostel experience I've had! The facilities are top-notch, and the staff is incredibly supportive. The WiFi is super fast, which is perfect for my online classes.",
      rating: 5
    },
    {
      name: 'Priya Kapoor',
      role: 'Medical Student',
      avatar: 'PK',
      text: "Safety was my primary concern, and this hostel exceeded my expectations. The 24/7 security and girls-only floor make me feel completely safe. Highly recommended!",
      rating: 5
    },
    {
      name: 'Amit Verma',
      role: 'MBA Student',
      avatar: 'AV',
      text: "From the food quality to the study rooms, everything is well-maintained. The community here is amazing, and I've made friends for life. Great value for money!",
      rating: 5
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar h-18">
        <div className="nav-container">
          <div className="logo">
            <div className="logo-icon"><img src="https://hbtu.ac.in/wp-content/uploads/2024/07/hbtu-logo-1.jpg" alt="" srcset="" /></div>
            <span>HostelHub</span>
          </div>
          <ul className="nav-links">
            <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
            <li><a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>Features</a></li>
            <li><a href="#gallery" onClick={(e) => { e.preventDefault(); scrollToSection('gallery'); }}>Gallery</a></li>
            <li><a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollToSection('testimonials'); }}>Testimonials</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
          </ul>
          <a href="#login" className="login-btn">Login</a>
        </div>
      </nav>

      {/* Carousel */}
      <div className="carousel-container" id="home">
        {slides.map((slide, index) => (
          <div key={index} className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}>
            <div 
              className="carousel-background"
              style={{ background: slide.gradient }}
            >
              <div className="carousel-icon">{slide.icon}</div>
            </div>
            <div className="carousel-overlay">
              <div className="carousel-content">
                <h1>{slide.title}</h1>
                <p>{slide.subtitle}</p>
                <button 
                  className="cta-button"
                  onClick={() => scrollToSection(slide.buttonLink)}
                >
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="carousel-nav">
          {slides.map((_, index) => (
            <span 
              key={index}
              className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Features Section */}
      <section className="features" id="features">
        <h2 className="section-title">Our Features</h2>
        <p className="section-subtitle">Everything you need for a comfortable stay</p>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery" id="gallery">
        <h2 className="section-title">Our Gallery</h2>
        <p className="section-subtitle">Take a virtual tour of our facilities</p>
        <div className="gallery-grid">
          {galleryItems.map((item, index) => (
            <div key={index} className="gallery-item">
              <div 
                className="gallery-background"
                style={{ background: item.gradient }}
              >
                <div className="gallery-icon">{item.icon}</div>
              </div>
              <div className="gallery-overlay">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials" id="testimonials">
        <div className="testimonials-container">
          <h2 className="section-title" style={{ color: 'white' }}>What Our Residents Say</h2>
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.9)' }}>Real experiences from our community</p>
          <div className="testimonial-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">{testimonial.avatar}</div>
                  <div className="testimonial-info">
                    <h4>{testimonial.name}</h4>
                    <p className="testimonial-role">{testimonial.role}</p>
                  </div>
                </div>
                <div className="stars">{'★'.repeat(testimonial.rating)}</div>
                <p className="testimonial-text">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
};

export default App;