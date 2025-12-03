'use client';

import { useEffect, useState } from 'react';
import { scrollToBySelector } from '../utils/scroll';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16" aria-labelledby="hero-heading">
      <div className="text-center max-w-4xl mx-auto px-4">
        <div className={`transition-all duration-1000`}>
          {/* Greeting */}
          <p className="text-blue-600 dark:text-blue-400 font-medium mb-4 text-lg">
            Hello, I'm
          </p>
          
          {/* Name */}
          <h1 id="hero-heading" className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 font-cinzel">
            JP Kramer
          </h1>
          
          {/* Title */}
          <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-8 font-light" style={{ fontFamily: 'Inter, sans-serif' }}>
            Senior Front-End Software Engineer
          </h2>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Integrity &middot; Innovation &middot; Expertise
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => scrollToBySelector('#projects')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900"
              aria-label="View my portfolio projects"
            >
              View My Work
            </button>
            <button 
              onClick={() => scrollToBySelector('#contact')}
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900"
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
