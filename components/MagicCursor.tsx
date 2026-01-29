import React, { useEffect, useState, useRef } from 'react';

const MagicCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
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
      if (followerRef.current) {
         // Follower delay logic could be done with requestAnimationFrame for super smoothness
         // but CSS transition is easier and performant enough here
         followerRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
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
       if (followerRef.current) followerRef.current.style.transform += ' scale(0.8)';
    };

    const handleMouseUp = (e: MouseEvent) => {
        if (followerRef.current) followerRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
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
      {/* Main Dot */}
      <div 
        ref={cursorRef}
        className={`absolute top-0 left-0 w-2 h-2 bg-brand-500 rounded-full -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      ></div>

      {/* Trailing Circle */}
      <div 
        ref={followerRef}
        className={`absolute top-0 left-0 border border-brand-500 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ease-out flex items-center justify-center mix-blend-difference ${
            isVisible ? 'opacity-100' : 'opacity-0'
        } ${
            isHovering ? 'w-12 h-12 bg-white/20 border-transparent backdrop-blur-[1px]' : 'w-8 h-8 bg-transparent'
        }`}
      ></div>
    </div>
  );
};

export default MagicCursor;