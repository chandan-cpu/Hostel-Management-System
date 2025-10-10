import React from 'react';

import Navbar from './components/Navbar/Navbar';
import Carousel from './components/Carousel/Carousel';
import Features from './components/features/features';
import Gallery from './components/Gallery/Gallery';
import Hostels from './components/Hostels/hostels';
import Testimonials from './components/Testimonials/Testimonials';
import Footer from './components/footer/footer';
import './App.css';

const App = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      <Navbar scrollToSection={scrollToSection} />
      <Carousel scrollToSection={scrollToSection} />
      <Features />
      <Hostels />
      <Gallery />
      <Testimonials />
      <Footer />
    </div>
  );
};
export default App;