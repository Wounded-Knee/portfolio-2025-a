'use client';

import { useState, useEffect, useRef } from 'react';
import { scrollToBySelector } from '../utils/scroll';

const Hero = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMobileVertical, setIsMobileVertical] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Detect mobile vertical screens
  useEffect(() => {
    const checkScreenOrientation = () => {
      const isVertical = window.innerHeight > window.innerWidth;
      const isMobile = window.innerWidth < 768;
      setIsMobileVertical(isVertical && isMobile);
    };

    // Check on mount
    checkScreenOrientation();

    // Check on resize and orientation change
    window.addEventListener('resize', checkScreenOrientation);
    window.addEventListener('orientationchange', checkScreenOrientation);

    return () => {
      window.removeEventListener('resize', checkScreenOrientation);
      window.removeEventListener('orientationchange', checkScreenOrientation);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const checkAndStartAnimation = () => {
      setIsVideoPlaying(true);
    };

    // Add event listeners
    video.addEventListener('play', checkAndStartAnimation);
    video.addEventListener('playing', checkAndStartAnimation);
    video.addEventListener('canplay', checkAndStartAnimation);

    // Check if video is already playing (in case events fired before React mounted)
    if (!video.paused) {
      setIsVideoPlaying(true);
    }

    // Fallback: start animation after 3 seconds if video hasn't started
    const fallbackTimer = setTimeout(() => {
      setIsVideoPlaying(true);
    }, 3000);

    return () => {
      video.removeEventListener('play', checkAndStartAnimation);
      video.removeEventListener('playing', checkAndStartAnimation);
      video.removeEventListener('canplay', checkAndStartAnimation);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden" aria-labelledby="hero-heading">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster="/videos/hero-poster.jpg"
        className={`absolute inset-0 w-full h-full object-cover z-0 ${
          isVideoPlaying ? 'animate-video-blur' : 'opacity-100'
        }`}
        aria-hidden="true"
        key={isMobileVertical ? 'mobile' : 'desktop'}
      >
        <source src={isMobileVertical ? '/hero-mobile.webm' : '/hero.webm'} type="video/webm" />
      </video>
      
      {/* Gradient Overlay for text readability */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30 dark:from-black/40 dark:via-black/30 dark:to-black/40 z-[1] pointer-events-none" aria-hidden="true" /> */}
      
      {/* Fallback background for mobile and when video doesn't load */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 -z-10 md:hidden" aria-hidden="true" /> */}
      
      {/* Content */}
      <div className={`relative z-10 text-center max-w-4xl mx-auto px-4 ${
        isVideoPlaying ? 'animate-content-unblur' : 'blur-[100px]'
      }`}>
        <div className={`transition-all duration-1000`}>          
          {/* Name */}
          <h1 id="hero-heading" className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-0 font-cinzel drop-shadow-2xl">
            JP Kramer
          </h1>
          
          {/* Title */}
          <h2 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-200 mb-8 font-light drop-shadow-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
            Full-Stack Engineer
          </h2>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            Experience &middot; Innovation &middot; Integrity
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => scrollToBySelector('#projects')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              aria-label="View my portfolio projects"
            >
              View My Work
            </button>
            <button 
              onClick={() => scrollToBySelector('#contact')}
              className="border-2 border-gray-800 dark:border-white bg-gray-800/10 dark:bg-white/10 backdrop-blur-sm text-gray-900 dark:text-white hover:bg-gray-800 hover:text-white dark:hover:bg-white dark:hover:text-blue-900 px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-white focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900"
              aria-label="Contact me for opportunities"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
