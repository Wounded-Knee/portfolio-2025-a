"use client";

import { useState, useEffect, useRef } from 'react';

interface MarioEasterEggProps {
  // Animation duration in seconds - easily configurable
  animationDuration?: number;
  // Custom CSS classes for positioning
  className?: string;
  // Start delay in seconds - easily configurable
  startDelay?: number;
}

const MarioEasterEgg = ({ 
  animationDuration = 8, 
  startDelay = 3,
  className = ""
}: MarioEasterEggProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [footerHeight, setFooterHeight] = useState(0);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const measureFooter = () => {
      const footer = document.querySelector('footer');
      if (footer) {
        const height = footer.offsetHeight;
        setFooterHeight(height);
      }
    };

    // Measure footer on mount and when window resizes
    measureFooter();
    window.addEventListener('resize', measureFooter);
    
    // Also measure after a short delay to ensure footer is rendered
    const timer = setTimeout(measureFooter, 100);

    return () => {
      window.removeEventListener('resize', measureFooter);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled to bottom
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      
      if (isAtBottom && !hasTriggered) {
        setHasTriggered(true);
        
        // Wait 10 seconds after reaching bottom, then start animation
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, startDelay * 1000);

        return () => clearTimeout(timer);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasTriggered, startDelay]);

  const animationStyle = {
    animation: isVisible 
      ? `slideRight ${animationDuration}s linear forwards`
      : 'none',
  };

  return (
    <div 
      className={`absolute left-0 w-full h-20 pointer-events-none z-50 ${className}`}
      style={{
        // Position at the top of the footer using measured height
        bottom: `-30px`,
      }}
    >
      <img
        src="/easter-eggs/mario.gif"
        alt="Mario running easter egg"
        className="h-[50px] w-[42.5px] object-contain" // 25% of original 200x170px
        style={animationStyle}
      />
      
      <style jsx>{`
        @keyframes slideRight {
          0% {
            transform: translateX(-42.5px);
          }
          100% {
            transform: translateX(calc(100vw + 42.5px));
          }
        }
      `}</style>
    </div>
  );
};

export default MarioEasterEgg;
