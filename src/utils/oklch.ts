/**
 * OKLCH Color Utilities
 * Helper functions for working with OKLCH color space in the theme morphing system
 */

export interface OKLCHColor {
  l: number; // Lightness (0-1)
  c: number; // Chroma (0-0.4 typically)
  h: number; // Hue (0-360)
}

/**
 * Parse OKLCH string to object
 * @param oklchString - OKLCH string in format "l c h"
 * @returns OKLCHColor object
 */
export const parseOKLCH = (oklchString: string): OKLCHColor => {
  const [l, c, h] = oklchString.split(' ').map(Number);
  return { l, c, h };
};

/**
 * Convert OKLCHColor object to string
 * @param color - OKLCHColor object
 * @returns OKLCH string
 */
export const stringifyOKLCH = (color: OKLCHColor): string => {
  return `${color.l} ${color.c} ${color.h}`;
};

/**
 * Shift hue by specified degrees
 * @param oklchString - Original OKLCH string
 * @param degrees - Degrees to shift hue (can be negative)
 * @returns New OKLCH string with shifted hue
 */
export const shiftHue = (oklchString: string, degrees: number): string => {
  const color = parseOKLCH(oklchString);
  const newHue = (color.h + degrees) % 360;
  return stringifyOKLCH({ ...color, h: newHue < 0 ? newHue + 360 : newHue });
};

/**
 * Adjust lightness by specified amount
 * @param oklchString - Original OKLCH string
 * @param adjustment - Amount to adjust lightness (-1 to 1)
 * @returns New OKLCH string with adjusted lightness
 */
export const adjustLightness = (oklchString: string, adjustment: number): string => {
  const color = parseOKLCH(oklchString);
  const newLightness = Math.max(0, Math.min(1, color.l + adjustment));
  return stringifyOKLCH({ ...color, l: newLightness });
};

/**
 * Adjust chroma by specified amount
 * @param oklchString - Original OKLCH string
 * @param adjustment - Amount to adjust chroma
 * @returns New OKLCH string with adjusted chroma
 */
export const adjustChroma = (oklchString: string, adjustment: number): string => {
  const color = parseOKLCH(oklchString);
  const newChroma = Math.max(0, color.c + adjustment);
  return stringifyOKLCH({ ...color, c: newChroma });
};

/**
 * Create a complementary color (180° hue shift)
 * @param oklchString - Original OKLCH string
 * @returns Complementary OKLCH string
 */
export const getComplementary = (oklchString: string): string => {
  return shiftHue(oklchString, 180);
};

/**
 * Create an analogous color (30° hue shift)
 * @param oklchString - Original OKLCH string
 * @param direction - 1 for clockwise, -1 for counterclockwise
 * @returns Analogous OKLCH string
 */
export const getAnalogous = (oklchString: string, direction: 1 | -1 = 1): string => {
  return shiftHue(oklchString, 30 * direction);
};

/**
 * Create a triadic color (120° hue shift)
 * @param oklchString - Original OKLCH string
 * @param position - 1, 2, or 3 for which triadic position
 * @returns Triadic OKLCH string
 */
export const getTriadic = (oklchString: string, position: 1 | 2 | 3 = 1): string => {
  return shiftHue(oklchString, 120 * position);
};

/**
 * Blend two OKLCH colors
 * @param color1 - First OKLCH string
 * @param color2 - Second OKLCH string
 * @param ratio - Blend ratio (0-1, where 0 is all color1, 1 is all color2)
 * @returns Blended OKLCH string
 */
export const blendOKLCH = (color1: string, color2: string, ratio: number): string => {
  const c1 = parseOKLCH(color1);
  const c2 = parseOKLCH(color2);
  
  // Handle hue interpolation (shortest path)
  let hueDiff = c2.h - c1.h;
  if (hueDiff > 180) hueDiff -= 360;
  if (hueDiff < -180) hueDiff += 360;
  
  const newHue = (c1.h + hueDiff * ratio + 360) % 360;
  
  return stringifyOKLCH({
    l: c1.l + (c2.l - c1.l) * ratio,
    c: c1.c + (c2.c - c1.c) * ratio,
    h: newHue,
  });
};

/**
 * Generate a color palette from a base color
 * @param baseColor - Base OKLCH string
 * @param variations - Number of variations to generate
 * @returns Array of OKLCH strings
 */
export const generatePalette = (baseColor: string, variations: number = 5): string[] => {
  const color = parseOKLCH(baseColor);
  const palette: string[] = [];
  
  for (let i = 0; i < variations; i++) {
    const hueShift = (360 / variations) * i;
    const lightnessVariation = (i - Math.floor(variations / 2)) * 0.1;
    
    palette.push(stringifyOKLCH({
      l: Math.max(0, Math.min(1, color.l + lightnessVariation)),
      c: color.c,
      h: (color.h + hueShift) % 360,
    }));
  }
  
  return palette;
};
