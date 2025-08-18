"use client";

import { useState, useEffect } from 'react';

export const useDisplay = () => {
  const [isRetina, setIsRetina] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Detect retina display
    const checkRetina = () => {
      const mediaQuery = window.matchMedia('(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)');
      setIsRetina(mediaQuery.matches);
    };

    // Detect dark mode
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    // Initial check
    checkRetina();
    checkDarkMode();

    // Listen for changes
    const mediaQuery = window.matchMedia('(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)');
    const observer = new MutationObserver(checkDarkMode);

    mediaQuery.addEventListener('change', checkRetina);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => {
      mediaQuery.removeEventListener('change', checkRetina);
      observer.disconnect();
    };
  }, []);

  return { isRetina, isDarkMode };
};
