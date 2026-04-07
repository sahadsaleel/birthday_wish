import React, { useEffect, useRef } from 'react';

const Cursor = () => {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const canvasRef = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    // ─── CANVAS SETUP ───
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Resize handler for canvas
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // ─── PARTICLE LOGIC ───
    const colors = ['#f9b4c4', '#e8607a', '#f0c060', '#c4405a', '#ffd0dc', '#ffffff'];
    
    const createSparkle = (x, y) => {
      if (particles.current.length > 60) return; // Cap for performance
      for (let i = 0; i < 2; i++) {
        particles.current.push({
          x, y,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 3 + 1,
          alpha: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: Math.random() * 0.02 + 0.015
        });
      }
    };

    // ─── ANIMATION LOOP ───
    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.life;
        
        if (p.alpha <= 0) {
          particles.current.splice(i, 1);
          continue;
        }
        
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      
      animationId = requestAnimationFrame(animate);
    };
    animate();

    // ─── MOUSE TRACKING ───
    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }

      createSparkle(x, y);
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.classList.add('active');
      if (ringRef.current) ringRef.current.classList.add('active');
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.classList.remove('active');
      if (ringRef.current) ringRef.current.classList.remove('active');
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    const updateInteractiveListeners = () => {
      document.querySelectorAll('button, .gallery-item, .lb-close, a').forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    updateInteractiveListeners();
    const observer = new MutationObserver(updateInteractiveListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <canvas 
        ref={canvasRef} 
        style={{ 
          position: 'fixed', 
          inset: 0, 
          zIndex: 9997, 
          pointerEvents: 'none',
          willChange: 'transform' 
        }} 
      />
      <div id="cursor" ref={cursorRef}></div>
      <div id="cursor-ring" ref={ringRef}></div>
    </>
  );
};

export default Cursor;

