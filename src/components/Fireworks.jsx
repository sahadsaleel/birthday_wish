import React, { useEffect, useRef } from 'react';

const Fireworks = ({ trigger }) => {
  const canvasRef = useRef(null);
  const heartsRef = useRef(null);

  useEffect(() => {
    if (!trigger) return;

    // ── FIREWORKS LOGIC ──
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.style.display = 'block';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const particles = [];
    const colors = ['#f9b4c4', '#e8607a', '#f0c060', '#ffd0dc', '#c4405a', '#ffffff', '#ffb0c0'];

    function Particle(x, y) {
      const a = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      return {
        x, y,
        vx: Math.cos(a) * speed,
        vy: Math.sin(a) * speed - 2,
        alpha: 1, size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        gravity: 0.12,
      };
    }

    const burst = (x, y) => {
      for (let i = 0; i < 60; i++) particles.push(Particle(x, y));
    };

    const positions = [
      [0.2, 0.3], [0.5, 0.2], [0.8, 0.3],
      [0.3, 0.5], [0.7, 0.4], [0.5, 0.6],
      [0.1, 0.6], [0.9, 0.5], [0.5, 0.35],
    ];

    positions.forEach((pos, i) => {
      setTimeout(() => burst(pos[0] * canvas.width, pos[1] * canvas.height), i * 200);
    });

    let frame = 0;
    let animationId;
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        p.vy += p.gravity; p.alpha -= 0.018;
        if (p.alpha <= 0) { particles.splice(i, 1); continue; }
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color; ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      frame++;
      if (particles.length > 0 || frame < 120) {
        animationId = requestAnimationFrame(draw);
      } else {
        canvas.style.display = 'none';
      }
    };
    draw();

    // ── HEARTS BURST LOGIC ──
    const layer = heartsRef.current;
    if (layer) {
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      const syms = ['❤️', '💕', '💖', '💗', '🌹', '💝', '✨', '🌸', '💫'];
      for (let i = 0; i < 50; i++) {
        const h = document.createElement('div');
        h.className = 'burst-heart';
        h.textContent = syms[Math.floor(Math.random() * syms.length)];
        const a = Math.random() * Math.PI * 2;
        const d = Math.random() * 320 + 80;
        h.style.cssText = `
          left:${cx}px;top:${cy}px;
          --bx:${Math.cos(a) * d}px;--by:${Math.sin(a) * d}px;
          --br:${(Math.random() - 0.5) * 360}deg;
          --bd:${Math.random() * 1 + 0.6}s;
          --bd-delay:${Math.random() * 0.5}s;
          font-size:${Math.random() * 16 + 14}px;
        `;
        layer.appendChild(h);
      }
      setTimeout(() => {
        if (layer) layer.innerHTML = '';
      }, 3000);
    }

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [trigger]);

  return (
    <>
      <div className="hearts-burst" ref={heartsRef}></div>
      <canvas id="fireworks-canvas" ref={canvasRef}></canvas>
    </>
  );
};

export default Fireworks;
