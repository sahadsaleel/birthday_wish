import React, { useEffect, useRef } from 'react';

const Background = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Resize handler
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // ─── BACKGROUND LAYERS ───
    
    // 1. Stars Data
    const stars = [];
    for (let i = 0; i < 180; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.2,
        isGold: Math.random() < 0.12,
        alpha: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.05 + 0.01,
        phase: Math.random() * Math.PI * 2
      });
    }

    // 2. Petals Data
    const petalSyms = ['🌸', '🌹', '❤️', '🌺', '💕', '🌷', '✨', '💖'];
    const petals = [];
    for (let i = 0; i < 24; i++) {
      petals.push({
        x: Math.random() * canvas.width,
        y: -50 - Math.random() * 500,
        text: petalSyms[Math.floor(Math.random() * petalSyms.length)],
        fontSize: Math.random() * 12 + 10,
        vy: Math.random() * 0.8 + 0.5,
        vx: (Math.random() - 0.5) * 1.5,
        rotation: Math.random() * 360,
        rv: (Math.random() - 0.5) * 2,
        drift: Math.random() * 100,
        driftPhase: Math.random() * Math.PI * 2
      });
    }

    let animationId;
    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- Draw Stars ---
      stars.forEach(s => {
        const twinkle = Math.sin(time * 0.001 * s.speed * 50 + s.phase) * 0.4 + 0.6;
        ctx.globalAlpha = s.alpha * twinkle;
        ctx.fillStyle = s.isGold ? '#f0c060' : '#ffffff';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * (twinkle * 0.5 + 0.8), 0, Math.PI * 2);
        ctx.fill();
      });

      // --- Draw Petals ---
      ctx.globalAlpha = 1;
      petals.forEach(p => {
        p.y += p.vy;
        p.x += p.vx + Math.sin(time * 0.001 + p.driftPhase) * 0.5;
        p.rotation += p.rv;

        if (p.y > canvas.height + 100) {
          p.y = -50;
          p.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation * Math.PI / 180);
        ctx.font = `${p.fontSize}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.text, 0, 0);
        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <div id="aurora">
        <div className="aurora-band ab1"></div>
        <div className="aurora-band ab2"></div>
        <div className="aurora-band ab3"></div>
        <div className="aurora-band ab4"></div>
      </div>
      <canvas 
        ref={canvasRef} 
        id="background-canvas"
        style={{ 
          position: 'fixed', 
          inset: 0, 
          zIndex: 1, 
          pointerEvents: 'none' 
        }} 
      />
    </>
  );
};

export default Background;

