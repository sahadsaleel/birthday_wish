import React, { useRef, useState } from 'react';

const BirthdayCard = ({ onReveal }) => {
  const cardRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg) scale(1.01)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = '';
    cardRef.current.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    setTimeout(() => {
      if (cardRef.current) cardRef.current.style.transition = '';
    }, 600);
  };

  const handleWish = () => {
    setIsRevealed(true);
    onReveal();
  };

  return (
    <div 
      className="card" 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="corner corner-tl"></div>
      <div className="corner corner-tr"></div>
      <div className="corner corner-bl"></div>
      <div className="corner corner-br"></div>

      <p className="subtitle">✦ A Birthday Wish ✦</p>
      <h1 className="heading"><span>Advance Happy Birthday,</span></h1>
      <h2 className="name">My Love</h2>

      <div className="divider">
        <div className="divider-line"></div>
        <div className="divider-diamond"></div>
        <div className="divider-line"></div>
      </div>

      <p className="message">
        On this beautiful day, I want you to know<br />
        how deeply you are cherished and adored.<br />
        You are my favourite reason to smile,<br />
        my greatest adventure, my softest place.<br /><br />
        <em>May this year be as wonderful as you are.</em>
      </p>

      {/* Animated Cake */}
      <div className="cake-area">
        <div className="cake-wrapper">
          <div className="candle-flames">
            <div className="flame"></div>
            <div className="flame"></div>
            <div className="flame"></div>
          </div>
          <div className="cake-emoji">🎂</div>
          <div className="cake-glow"></div>
        </div>
      </div>

      {!isRevealed ? (
        <button className="wish-btn" id="wishBtn" onClick={handleWish}>
          Open Your Wish ♡
        </button>
      ) : (
        <div className="extra-msg" style={{ display: 'block' }}>
          ❝ Every moment with you is a gift I never take for granted.<br />
          You are my today, my tomorrow, and all my forevers. <span className="heartbeat">♥</span><br /><br />
          Advance Happy Birthday, my love. ❞
        </div>
      )}
    </div>
  );
};

export default BirthdayCard;
