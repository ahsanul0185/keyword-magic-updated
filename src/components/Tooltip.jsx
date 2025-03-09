import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const Tooltip = ({ children, text }) => {
  const [hovered, setHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseEnter = (e) => {
    if (isMobile) {
      setTooltipPosition({
        top: '10%',
        left: '50%',
      });
    } else {
      const { top, left, width, height } = e.currentTarget.getBoundingClientRect();
      setTooltipPosition({
        top: top + height + window.scrollY,
        left: left + width / 2 + window.scrollX,
      });
    }
    setHovered(true);
  };

  const tooltipElement = (
    hovered && (
      <div
        style={{
          position: isMobile ? 'fixed' : 'absolute',
          zIndex: 9999,
          top: tooltipPosition.top,
          left: tooltipPosition.left,
          transform: isMobile ? 'translate(-50%, -50%)' : 'translateX(-50%)',
          backgroundColor: isMobile ? 'rgba(255, 255, 255, 0.9)' : '#38324a',
          color: isMobile ? '#1c1c1c' : '#fff',
          padding: isMobile ? '10px 15px' : '5px',
          borderRadius: isMobile ? '20px' : '6px',
          whiteSpace: isMobile ? 'normal' : 'nowrap',
          pointerEvents: 'none',
          opacity: hovered ? 0.9 : 0,
          transition: 'opacity 0.2s',
          maxWidth: isMobile ? '80%' : 'auto',
          width: isMobile ? '80%' : 'auto',
          textAlign: 'center', // Ensure text is centered
          fontWeight: isMobile ? 'bold' : 'normal',
        }}
      >
        {text}
      </div>
    )
  );

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setHovered(false)}
      onClick={isMobile ? handleMouseEnter : null}
      style={{ display: 'inline-block' }}
    >
      {children}
      {isMobile
        ? tooltipElement
        : ReactDOM.createPortal(tooltipElement, document.body)}
    </div>
  );
};

export default Tooltip;