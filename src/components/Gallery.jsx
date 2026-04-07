import React, { useState } from 'react';

const Gallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const memories = [
    { src: '/photos/photo1.jpeg', caption: 'Where it all started: Instagram ♡' },
    { src: '/photos/photo2.jpeg', caption: 'Adventures together ♡' },
    { src: '/photos/photo3.jpeg', caption: 'My favourite smile ♡' },
    { src: '/photos/photo4.jpeg', caption: 'Always & forever ♡' },
  ];

  const openLightbox = (index) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  };

  return (
    <div className="gallery-section scroll-reveal visible">
      <div className="gallery-header">
        <span className="gallery-label">✦ our story ✦</span>
        <h2 className="gallery-title">Moments <span>From the Heart</span></h2>
        <div className="gallery-divider">
          <div className="gallery-divider-line"></div>
          <span className="gallery-divider-heart">♡</span>
          <div className="gallery-divider-line"></div>
        </div>
      </div>

      <div className="gallery-grid">
        {memories.map((photo, i) => (
          <div key={i} className="gallery-item" onClick={() => openLightbox(i)}>
            <img src={photo.src} alt={`Story ${i + 1}`} loading="lazy" />
            <div className="gallery-overlay">
              <span className="overlay-caption">{photo.caption}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="gallery-hint">✦ tap each frame — a memory lives inside ✦</p>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="lightbox open" onClick={closeLightbox}>
          <div className="lb-content" onClick={(e) => e.stopPropagation()}>
            <button className="lb-close" onClick={closeLightbox}>✕</button>
            <div 
              id="lbPlaceholder" 
              style={{
                width: 'auto',
                height: 'auto',
                maxWidth: '90vw',
                maxHeight: '80vh',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              <img 
                src={memories[lightboxIndex].src} 
                style={{
                  maxWidth: '100%',
                  maxHeight: '80vh',
                  objectFit: 'contain',
                  borderRadius: '16px',
                  border: '0.5px solid rgba(220,120,140,0.4)'
                }} 
                alt="Selected"
              />
            </div>
            <p className="lb-caption">{memories[lightboxIndex].caption}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
