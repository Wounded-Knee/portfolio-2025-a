import { useCallback, useRef } from 'react';
import { ThemeColors, ThemeColorCallback } from '../types';

const COLOR_NAMES = [
    'background',
    'foreground',
    'card',
    'card-foreground',
    'popover',
    'popover-foreground',
    'primary',
    'primary-foreground',
    'secondary',
    'secondary-foreground',
    'muted',
    'muted-foreground',
    'accent',
    'accent-foreground',
    'destructive',
    'destructive-foreground',
    'border',
    'input',
    'ring',
    'focus-blue',
    'text-gray-600',
    'text-gray-400',
    'bg-gray-100',
    'bg-slate-800',
    'border-gray-300',
    'border-gray-600',
    'theme-color',
  ];

  /**
 * Hook that provides a function to morph theme colors
 * The function accepts a callback that receives current colors and returns new color values
 * Colors are updated instantly without React state changes or component re-renders
 */
export const useThemeMorph = () => {
  // Get all current theme colors from CSS custom properties
  const getCurrentColors = useCallback((): ThemeColors => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      // Return default values for server-side rendering
      return COLOR_NAMES.reduce((acc, colorName) => {
        acc[colorName as keyof ThemeColors] = '';
        return acc;
      }, {} as ThemeColors);
    }
    
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    
    return COLOR_NAMES.reduce((acc, colorName) => {
      acc[colorName as keyof ThemeColors] = computedStyle.getPropertyValue(`--${colorName}`).trim();
      return acc;
    }, {} as ThemeColors);
  }, []);

  // Apply new colors to CSS custom properties
  const applyColors = useCallback((newColors: Partial<ThemeColors>) => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }
    
    const root = document.documentElement;
    
    Object.entries(newColors).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        root.style.setProperty(`--${key}`, value);
      }
    });
  }, []);  
  
  // Throttled morph function
  const lastMorphTimeRef = useRef(0);
  const MORPH_FPS = 60;
  const MORPH_INTERVAL = 1000 / MORPH_FPS;
  
  const morph = useCallback((callback: ThemeColorCallback) => {
    const now = Date.now();
    
    // Throttle to specified FPS
    if (now - lastMorphTimeRef.current < MORPH_INTERVAL) {
      return;
    }
    
    lastMorphTimeRef.current = now;
    
    // Get current colors
    const currentColors = getCurrentColors();
    
    // Execute callback with current colors
    const newColors = callback(currentColors);
    
    applyColors(newColors);
  }, [getCurrentColors, applyColors]);

  return { morph };
};
