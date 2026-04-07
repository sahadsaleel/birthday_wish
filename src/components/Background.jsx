import React, { useEffect, useState } from 'react';

const Background = () => {
  const [stars, setStars] = useState([]);
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    // Generate Stars
    const newStars = [];
    for (let i = 0; i < 160; i++) {
      const isGold = Math.random() < 0.12;
      const size = Math.random() * 2.5 + 0.4;
      newStars.push({
        id: i,
        className: `star${isGold ? ' gold' : ''}`,
        style: {
          width: `${size}px`,
          height: `${size}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          '--a1': Math.random() * 0.2 + 0.05,
          '--a2': Math.random() * 0.7 + 0.3,
          '--d': `${Math.random() * 4 + 2}s`,
          animationDelay: `${Math.random() * 5}s`,
        },
      });
    }
    setStars(newStars);

    // Generate Petals
    const petalSyms = ['🌸', '🌹', '❤️', '🌺', '💕', '🌷', '✨', '💖'];
    const newPetals = [];
    for (let i = 0; i < 28; i++) {
      const drift = (Math.random() - 0.5) * 180;
      newPetals.push({
        id: i,
        text: petalSyms[Math.floor(Math.random() * petalSyms.length)],
        style: {
          left: `${Math.random() * 100}%`,
          '--fd': `${Math.random() * 8 + 10}s`,
          '--fd-delay': `-${Math.random() * 14}s`,
          '--drift': `${drift}px`,
          fontSize: `${Math.random() * 14 + 10}px`,
        },
      });
    }
    setPetals(newPetals);
  }, []);

  return (
    <>
      <div id="aurora">
        <div className="aurora-band ab1"></div>
        <div className="aurora-band ab2"></div>
        <div className="aurora-band ab3"></div>
        <div className="aurora-band ab4"></div>
      </div>

      <div id="stars">
        {stars.map((star) => (
          <div key={star.id} className={star.className} style={star.style}></div>
        ))}
      </div>

      <div id="petals">
        {petals.map((petal) => (
          <div key={petal.id} className="petal" style={petal.style}>
            {petal.text}
          </div>
        ))}
      </div>
    </>
  );
};

export default Background;
