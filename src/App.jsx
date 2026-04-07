import React, { useState, useEffect } from 'react';
import Background from './components/Background';
import Curtain from './components/Curtain';
import BirthdayCard from './components/BirthdayCard';
import Gallery from './components/Gallery';
import Cursor from './components/Cursor';
import Fireworks from './components/Fireworks';

function App() {
  const [showFireworks, setShowFireworks] = useState(false);

  const handleReveal = () => {
    setShowFireworks(true);
    // Intersection Observer for scroll reveal effect
    // In React, we usually handle this per component or with a library, 
    // but I'll add a simple global observer here for the 'scroll-reveal' class.
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.15 });
    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
  };

  useEffect(() => {
    // Initial scroll reveal check
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.15 });
    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="App">
      <Cursor />
      <Curtain />
      <Background />
      <Fireworks trigger={showFireworks} />

      <div className="container">
        <BirthdayCard onReveal={handleReveal} />
        <Gallery />
        <p className="footer-text">made with love, just for you <span>♡</span></p>
      </div>
    </div>
  );
}

export default App;
