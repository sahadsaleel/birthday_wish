import React, { useEffect, useState } from 'react';

const Curtain = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4500); // Animation duration (3.5s delay + 1s fade)

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div id="curtain">
      <div className="curtain-text">She is my universe ✨</div>
      <div className="curtain-sub">a love letter, just for you</div>
      <div className="curtain-hearts">🌹 💕 🌸</div>
    </div>
  );
};

export default Curtain;
