'use client';

import { useState, useEffect, useRef } from 'react';

const Navigation = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' }
  ];

  // Function to get current theme state
  const getCurrentTheme = () => {
    try {
      const storedTheme = localStorage.getItem('theme');
      const isDarkClass = document.documentElement.classList.contains('dark');
      
      // If there's a stored theme, use it
      if (storedTheme) {
        return storedTheme === 'dark';
      }
      
      // Otherwise, use the current class state
      return isDarkClass;
    } catch (error) {
      console.warn('Failed to get theme from localStorage:', error);
      return document.documentElement.classList.contains('dark');
    }
  };

  // Function to update theme state
  const updateThemeState = () => {
    const isDark = getCurrentTheme();
    setIsDarkMode(isDark);
  };

  useEffect(() => {
    // Check initial dark mode from document class and localStorage
    updateThemeState();
    setMounted(true);

    // Check initial scroll position
    const checkInitialScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Check scroll position immediately
    checkInitialScroll();

    // Listen for scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Listen for storage changes (in case theme is changed from another tab/window)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme') {
        updateThemeState();
      }
    };

    // Listen for DOM changes (in case theme is changed programmatically)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          updateThemeState();
        }
      });
    });

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('storage', handleStorageChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', handleStorageChange);
      observer.disconnect();
    };
  }, []);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        mobileMenuButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Trap focus in mobile menu when open
  useEffect(() => {
    if (isMobileMenuOpen && mobileMenuRef.current) {
      const focusableElements = mobileMenuRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      firstElement?.focus();

      return () => document.removeEventListener('keydown', handleTabKey);
    }
  }, [isMobileMenuOpen]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    
    try {
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      
      // Update state after successful change
      setIsDarkMode(newMode);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
      // Revert state if localStorage fails
      setIsDarkMode(!newMode);
    }
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Don't render theme-dependent content until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent" role="navigation" aria-label="Main navigation">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className={`text-xl font-bold text-gray-900 font-cinzel ${isScrolled ? 'opacity-100' : 'opacity-0'} transition-opacity ${isScrolled ? 'duration-5000' : 'duration-500'}`}>
              JP Kramer
            </div>
            <div className="hidden md:flex items-center space-x-8" role="menubar">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
                  role="menuitem"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="hidden md:flex items-center">
              <div className="p-2 rounded-lg bg-gray-100 text-gray-700 w-9 h-9"></div>
            </div>
            <div className="md:hidden flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-gray-100 text-gray-700 w-9 h-9"></div>
              <div className="w-6 h-6"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-lg' 
        : 'bg-transparent'
    }`} role="navigation" aria-label="Main navigation">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className={`text-xl font-bold text-white font-cinzel ${isScrolled ? 'opacity-100' : 'opacity-0'} transition-opacity ${isScrolled ? 'duration-5000' : 'duration-500'}`}>
            <a href="#home" className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1">
              JP Kramer
            </a>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8" role="menubar">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
                role="menuitem"
              >
                {item.name}
              </a>
            ))}
          </div>
          
          {/* Desktop Dark Mode Toggle */}
          <div className="hidden md:flex items-center">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
              aria-pressed={isDarkMode}
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile menu button and dark mode toggle */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
              aria-pressed={isDarkMode}
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            
            {/* Mobile menu button */}
            <button
              ref={mobileMenuButtonRef}
              onClick={toggleMobileMenu}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded p-2"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div 
            ref={mobileMenuRef}
            id="mobile-menu"
            className="md:hidden"
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md dark:bg-slate-900/95 rounded-b-lg shadow-lg">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 block px-3 py-2 text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded w-full text-left"
                  role="menuitem"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
