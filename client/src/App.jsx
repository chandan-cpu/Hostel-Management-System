import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Carousel from './components/Carousel/Carousel';
import Features from './components/features/features';
import Gallery from './components/Gallery/Gallery';
import Hostels from './components/Hostels/Hostels';
import Testimonials from './components/Testimonials/Testimonials';
import Footer from './components/footer/footer';
import GirlsHostel from './components/Hostels/GirlsHostel';
import BoysHostel from './components/Hostels/BoysHostel';
import './App.css';

const App = () => {
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // if navigation included a scroll target in state, scroll to it after mount
    if (location.state && location.state.scrollTo) {
      const target = location.state.scrollTo;
      // small timeout so the DOM is ready
      setTimeout(() => scrollToSection(target), 50);
      // optionally clear the history state by replacing (not done here)
    }
  }, [location]);

  return (
    <div className="App">
      <Navbar scrollToSection={scrollToSection} />
      <Routes>
        <Route path="/" element={
          <>
            <Carousel scrollToSection={scrollToSection} />
            <Features />
            <Hostels />
            <Gallery />
            <Testimonials />
          </>
        } />
  <Route path="/hostels/girls" element={<GirlsHostel />} />
  <Route path="/hostels/boys" element={<BoysHostel />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;