import React, { useEffect, useRef } from 'react';

const Cursor = () => {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const sparklesRef = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      
      if (cursorRef.current) {
        cursorRef.current.style.left = `${x}px`;
        cursorRef.current.style.top = `${y}px`;
      }

      // Ring follow animation (simpler than the original tick for React performance)
      if (ringRef.current) {
        ringRef.current.style.left = `${x}px`;
        ringRef.current.style.top = `${y}px`;
        ringRef.current.style.transition = 'transform 0.12s ease-out, left 0.15s ease-out, top 0.15s ease-out';
      }

      // Sparkles
      createSparkle(x, y);
    };

    const createSparkle = (x, y) => {
      const now = Date.now();
      if (sparklesRef.current.lastTime && now - sparklesRef.current.lastTime < 40) return;
      sparklesRef.current.lastTime = now;

      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle-dot';
      const size = Math.random() * 6 + 3;
      const colors = ['#f9b4c4', '#e8607a', '#f0c060', '#c4405a', '#ffd0dc', '#ffffff'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      sparkle.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        --sx: ${(Math.random() - 0.5) * 40}px;
        --sy: ${(Math.random() - 0.5) * 40}px;
        --sp-d: ${Math.random() * 0.5 + 0.4}s;
      `;
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 900);
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = '20px';
        cursorRef.current.style.height = '20px';
      }
      if (ringRef.current) {
        ringRef.current.style.width = '52px';
        ringRef.current.style.height = '52px';
        ringRef.current.style.borderColor = 'rgba(249, 180, 196, 0.8)';
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = '12px';
        cursorRef.current.style.height = '12px';
      }
      if (ringRef.current) {
        ringRef.current.style.width = '36px';
        ringRef.current.style.height = '36px';
        ringRef.current.style.borderColor = 'rgba(232, 96, 122, 0.5)';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Attach to interactive elements
    const updateInteractiveListeners = () => {
      document.querySelectorAll('button, .gallery-item, .lb-close').forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    updateInteractiveListeners();
    
    // Observer for dynamic elements
    const observer = new MutationObserver(updateInteractiveListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div id="cursor" ref={cursorRef}></div>
      <div id="cursor-ring" ref={ringRef}></div>
    </>
  );
};

export default Cursor;
