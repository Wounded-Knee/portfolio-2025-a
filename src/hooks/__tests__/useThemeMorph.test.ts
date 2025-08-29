import { renderHook, act } from '@testing-library/react';
import { useThemeMorph } from '../useThemeMorph';
import { ThemeColors } from '../../types';

// Mock document.documentElement
const mockRoot = {
  style: {
    setProperty: jest.fn(),
  },
};

const mockComputedStyle = {
  getPropertyValue: jest.fn((property: string) => {
    // Return mock OKLCH values for each property
    const mockValues: Record<string, string> = {
      '--background': '1 0 0',
      '--foreground': '0.1 0 240',
      '--primary': '0.55 0.15 240',
      '--primary-foreground': '0.98 0.01 240',
      '--secondary': '0.96 0.01 240',
      '--secondary-foreground': '0.1 0 240',
      '--muted': '0.96 0.01 240',
      '--muted-foreground': '0.46 0.02 240',
      '--accent': '0.96 0.01 240',
      '--accent-foreground': '0.1 0 240',
      '--destructive': '0.6 0.2 25',
      '--destructive-foreground': '0.98 0.01 240',
      '--border': '0.91 0.02 240',
      '--input': '0.91 0.02 240',
      '--ring': '0.55 0.15 240',
      '--focus-blue': '0.55 0.15 240',
      '--text-gray-600': '0.46 0.02 240',
      '--text-gray-400': '0.64 0.02 240',
      '--bg-gray-100': '0.96 0.01 240',
      '--bg-slate-800': '0.11 0.02 240',
      '--border-gray-300': '0.91 0.02 240',
      '--border-gray-600': '0.46 0.02 240',
      '--theme-color': '0.55 0.15 240',
      '--card': '1 0 0',
      '--card-foreground': '0.1 0 240',
      '--popover': '1 0 0',
      '--popover-foreground': '0.1 0 240',
    };
    return mockValues[property] || '';
  }),
};

// Mock getComputedStyle
Object.defineProperty(window, 'getComputedStyle', {
  value: jest.fn(() => mockComputedStyle),
  writable: true,
});

// Mock document.documentElement
Object.defineProperty(document, 'documentElement', {
  value: mockRoot,
  writable: true,
});

describe('useThemeMorph', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a morph function', () => {
    const { result } = renderHook(() => useThemeMorph());
    
    expect(result.current.morph).toBeDefined();
    expect(typeof result.current.morph).toBe('function');
  });

  it('should apply new colors when morph function is called', () => {
    const { result } = renderHook(() => useThemeMorph());
    
    const newPrimaryColor = '0.7 0.2 240';
    
    act(() => {
      result.current.morph((colors) => ({
        primary: newPrimaryColor,
      }));
    });
    
    expect(mockRoot.style.setProperty).toHaveBeenCalledWith('--primary', newPrimaryColor);
  });

  it('should apply multiple colors when callback returns multiple values', () => {
    const { result } = renderHook(() => useThemeMorph());
    
    const newColors = {
      primary: '0.7 0.2 240',
      secondary: '0.8 0.1 240',
      accent: '0.6 0.3 240',
    };
    
    act(() => {
      result.current.morph(() => newColors);
    });
    
    expect(mockRoot.style.setProperty).toHaveBeenCalledWith('--primary', '0.7 0.2 240');
    expect(mockRoot.style.setProperty).toHaveBeenCalledWith('--secondary', '0.8 0.1 240');
    expect(mockRoot.style.setProperty).toHaveBeenCalledWith('--accent', '0.6 0.3 240');
  });

  it('should pass current colors to the callback function', () => {
    const { result } = renderHook(() => useThemeMorph());
    
    const mockCallback = jest.fn(() => ({}));
    
    act(() => {
      result.current.morph(mockCallback);
    });
    
    expect(mockCallback).toHaveBeenCalledWith(expect.objectContaining({
      primary: '0.55 0.15 240',
      background: '1 0 0',
      foreground: '0.1 0 240',
    }));
  });

  it('should handle empty callback return value', () => {
    const { result } = renderHook(() => useThemeMorph());
    
    act(() => {
      result.current.morph(() => ({}));
    });
    
    expect(mockRoot.style.setProperty).not.toHaveBeenCalled();
  });

  it('should handle partial callback return value', () => {
    const { result } = renderHook(() => useThemeMorph());
    
    act(() => {
      result.current.morph(() => ({
        primary: '0.7 0.2 240',
      }));
    });
    
    expect(mockRoot.style.setProperty).toHaveBeenCalledTimes(1);
    expect(mockRoot.style.setProperty).toHaveBeenCalledWith('--primary', '0.7 0.2 240');
  });

  it('should throttle rapid calls to morph function', () => {
    const { result } = renderHook(() => useThemeMorph());
    
    const mockCallback = jest.fn(() => ({ primary: '0.7 0.2 240' }));
    
    // Call morph multiple times rapidly
    act(() => {
      result.current.morph(mockCallback);
      result.current.morph(mockCallback);
      result.current.morph(mockCallback);
    });
    
    // Should only be called once due to throttling
    expect(mockRoot.style.setProperty).toHaveBeenCalledTimes(1);
  });
});
