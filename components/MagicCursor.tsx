
import React, { useEffect, useState, useRef } from 'react';

const MagicCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Only visible on movement to avoid glitch at start

  useEffect(() => {
    // Check if device has touch capability (likely mobile/tablet)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      setIsVisible(true);
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check if hovering interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer');

      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => {
       if (cursorRef.current) cursorRef.current.style.transform += ' scale(0.8) rotate(-15deg)';
    };

    const handleMouseUp = (e: MouseEvent) => {
        if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Don't render on mobile (handled by media query in CSS largely, but good to have safeguard)
  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999]">
      {/* Main Image Cursor */}
      <div 
        ref={cursorRef}
        className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <img 
            src="https://img.icons8.com/doodle/96/rabbit.png" 
            alt="Cute Rabbit Cursor"
            className={`object-contain drop-shadow-md transition-all duration-300 ${isHovering ? 'w-12 h-12 rotate-12' : 'w-9 h-9'}`}
        />
      </div>
    </div>
  );
};

export default MagicCursor;
