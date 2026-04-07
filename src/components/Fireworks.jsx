import React, { useEffect, useRef } from 'react';

const Fireworks = ({ trigger }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!trigger) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.style.display = 'block';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    
    const particles = [];
    const hearts = [];
    const colors = ['#f9b4c4', '#e8607a', '#f0c060', '#ffd0dc', '#c4405a', '#ffffff', '#ffb0c0'];
    const syms = ['❤️', '💕', '💖', '💗', '🌹', '💝', '✨', '🌸', '💫'];

    function Particle(x, y) {
      const a = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      return {
        x, y,
        vx: Math.cos(a) * speed,
        vy: Math.sin(a) * speed - 2,
        alpha: 1, 
        size: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        gravity: 0.15,
      };
    }

    function Heart(x, y) {
      const a = Math.random() * Math.PI * 2;
      const d = Math.random() * 200 + 50;
      return {
        x, y,
        tx: x + Math.cos(a) * d,
        ty: y + Math.sin(a) * d,
        text: syms[Math.floor(Math.random() * syms.length)],
        size: Math.random() * 10 + 15,
        alpha: 1,
        rotation: (Math.random() - 0.5) * 60,
        progress: 0,
        speed: Math.random() * 0.02 + 0.01
      };
    }

    const burst = (x, y) => {
      for (let i = 0; i < 50; i++) particles.push(Particle(x, y));
    };

    const heartBurst = () => {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      for (let i = 0; i < 40; i++) hearts.push(Heart(cx, cy));
    };

    const positions = [
      [0.2, 0.3], [0.5, 0.2], [0.8, 0.3],
      [0.3, 0.5], [0.7, 0.4], [0.5, 0.6],
      [0.1, 0.6], [0.9, 0.5], [0.5, 0.35],
    ];

    positions.forEach((pos, i) => {
      setTimeout(() => burst(pos[0] * canvas.width, pos[1] * canvas.height), i * 150);
    });
    
    // Trigger heart burst
    heartBurst();

    let frame = 0;
    let animationId;
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Particles (Fireworks)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        p.vy += p.gravity; p.alpha -= 0.02;
        if (p.alpha <= 0) { particles.splice(i, 1); continue; }
        
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        // Optimization: Removed shadowBlur
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Hearts
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (let i = hearts.length - 1; i >= 0; i--) {
        const h = hearts[i];
        h.progress += h.speed;
        h.alpha = 1 - h.progress;
        
        if (h.progress >= 1) { hearts.splice(i, 1); continue; }
        
        const curX = h.x + (h.tx - h.x) * h.progress;
        const curY = h.y + (h.ty - h.y) * h.progress - (Math.sin(h.progress * Math.PI) * 50);
        
        ctx.globalAlpha = h.alpha;
        ctx.font = `${h.size}px serif`;
        ctx.save();
        ctx.translate(curX, curY);
        ctx.rotate(h.rotation * Math.PI / 180);
        ctx.fillText(h.text, 0, 0);
        ctx.restore();
      }

      frame++;
      if (particles.length > 0 || hearts.length > 0 || frame < 150) {
        animationId = requestAnimationFrame(draw);
      } else {
        canvas.style.display = 'none';
      }
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [trigger]);

  return (
    <canvas 
      id="fireworks-canvas" 
      ref={canvasRef} 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        zIndex: 9998, 
        pointerEvents: 'none', 
        display: 'none' 
      }}
    ></canvas>
  );
};

export default Fireworks;

