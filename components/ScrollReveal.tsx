import React, { useEffect, useRef, useState } from 'react';

type RevealVariant = 'up' | 'left' | 'right' | 'zoom';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  immediate?: boolean;
  variant?: RevealVariant;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  delay = 0, 
  className = '', 
  immediate = false,
  variant = 'up'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (immediate) {
      const raf = requestAnimationFrame(() => {
        setIsVisible(true);
      });
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
          observer.disconnect(); 
        }
      },
      {
        threshold: 0.15, // Cần thấy 15% element mới kích hoạt
        rootMargin: '0px 0px -40px 0px' 
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [immediate]);

  // Map variant to CSS class
  const getVariantClass = () => {
    switch (variant) {
      case 'left': return 'reveal-left';
      case 'right': return 'reveal-right';
      case 'zoom': return 'reveal-zoom';
      default: return 'reveal-up';
    }
  };

  return (
    <div
      ref={ref}
      className={`reveal ${getVariantClass()} ${isVisible ? 'active' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;