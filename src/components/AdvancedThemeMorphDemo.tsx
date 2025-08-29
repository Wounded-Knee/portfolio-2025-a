'use client';

import React, { useState } from 'react';
import { useThemeMorph } from '../hooks/useThemeMorph';
import { 
  shiftHue, 
  adjustLightness, 
  adjustChroma, 
  getComplementary, 
  getAnalogous, 
  getTriadic,
  blendOKLCH,
  generatePalette
} from '../utils/oklch';

/**
 * Advanced demo component showcasing OKLCH utilities and sophisticated theme morphing
 */
export const AdvancedThemeMorphDemo: React.FC = () => {
  const { morph } = useThemeMorph();
  const [currentPalette, setCurrentPalette] = useState<string[]>([]);

  // Advanced color transformations
  const createComplementaryTheme = () => {
    morph((colors) => {
      const primary = colors.primary;
      const complementary = getComplementary(primary);
      
      return {
        primary: complementary,
        accent: getAnalogous(complementary, 1),
        secondary: getAnalogous(complementary, -1),
        'theme-color': complementary,
      };
    });
  };

  const createTriadicTheme = () => {
    morph((colors) => {
      const primary = colors.primary;
      
      return {
        primary: getTriadic(primary, 1),
        accent: getTriadic(primary, 2),
        secondary: getTriadic(primary, 3),
        'theme-color': getTriadic(primary, 1),
      };
    });
  };

  const adjustThemeBrightness = (adjustment: number) => {
    morph((colors) => ({
      primary: adjustLightness(colors.primary, adjustment),
      accent: adjustLightness(colors.accent, adjustment),
      secondary: adjustLightness(colors.secondary, adjustment),
      background: adjustLightness(colors.background, adjustment * 0.5),
      foreground: adjustLightness(colors.foreground, -adjustment * 0.5),
    }));
  };

  const adjustThemeSaturation = (adjustment: number) => {
    morph((colors) => ({
      primary: adjustChroma(colors.primary, adjustment),
      accent: adjustChroma(colors.accent, adjustment),
      secondary: adjustChroma(colors.secondary, adjustment),
    }));
  };

  const shiftThemeHue = (degrees: number) => {
    morph((colors) => ({
      primary: shiftHue(colors.primary, degrees),
      accent: shiftHue(colors.accent, degrees + 30),
      secondary: shiftHue(colors.secondary, degrees - 30),
      'theme-color': shiftHue(colors.primary, degrees),
    }));
  };

  const createBlendedTheme = () => {
    morph((colors) => {
      const warmColor = '0.6 0.2 30';
      const coolColor = '0.6 0.2 220';
      
      return {
        primary: blendOKLCH(colors.primary, warmColor, 0.3),
        accent: blendOKLCH(colors.accent, coolColor, 0.3),
        secondary: blendOKLCH(colors.secondary, warmColor, 0.2),
      };
    });
  };

  const generateAndApplyPalette = () => {
    morph((colors) => {
      const palette = generatePalette(colors.primary, 5);
      setCurrentPalette(palette);
      
      return {
        primary: palette[0],
        accent: palette[1],
        secondary: palette[2],
        'theme-color': palette[0],
      };
    });
  };

  const applyPaletteColor = (index: number) => {
    if (currentPalette[index]) {
      morph(() => ({
        primary: currentPalette[index],
        'theme-color': currentPalette[index],
      }));
    }
  };

  return (
    <div className="p-6 bg-surface border border-default rounded-lg">
      <h2 className="text-2xl font-bold text-heading mb-4">Advanced Theme Morphing</h2>
      
      {/* Color Theory Transformations */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-heading mb-3">Color Theory</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={createComplementaryTheme}
            className="btn-primary text-sm"
          >
            Complementary
          </button>
          <button
            onClick={createTriadicTheme}
            className="btn-primary text-sm"
          >
            Triadic
          </button>
          <button
            onClick={createBlendedTheme}
            className="btn-primary text-sm"
          >
            Blended
          </button>
          <button
            onClick={generateAndApplyPalette}
            className="btn-primary text-sm"
          >
            Generate Palette
          </button>
        </div>
      </div>

      {/* Brightness Controls */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-heading mb-3">Brightness</h3>
        <div className="flex gap-2">
          <button
            onClick={() => adjustThemeBrightness(-0.1)}
            className="btn-secondary text-sm"
          >
            Darker
          </button>
          <button
            onClick={() => adjustThemeBrightness(0.1)}
            className="btn-secondary text-sm"
          >
            Lighter
          </button>
        </div>
      </div>

      {/* Saturation Controls */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-heading mb-3">Saturation</h3>
        <div className="flex gap-2">
          <button
            onClick={() => adjustThemeSaturation(-0.05)}
            className="btn-secondary text-sm"
          >
            Less Saturated
          </button>
          <button
            onClick={() => adjustThemeSaturation(0.05)}
            className="btn-secondary text-sm"
          >
            More Saturated
          </button>
        </div>
      </div>

      {/* Hue Controls */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-heading mb-3">Hue Shift</h3>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => shiftThemeHue(-60)}
            className="btn-secondary text-sm"
          >
            -60°
          </button>
          <button
            onClick={() => shiftThemeHue(60)}
            className="btn-secondary text-sm"
          >
            +60°
          </button>
          <button
            onClick={() => shiftThemeHue(180)}
            className="btn-secondary text-sm"
          >
            +180°
          </button>
        </div>
      </div>

      {/* Generated Palette Display */}
      {currentPalette.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-heading mb-3">Generated Palette</h3>
          <div className="grid grid-cols-5 gap-2">
            {currentPalette.map((color, index) => (
              <button
                key={index}
                onClick={() => applyPaletteColor(index)}
                className="h-12 rounded border border-default transition-transform hover:scale-105"
                style={{ backgroundColor: `oklch(${color})` }}
                aria-label={`Apply palette color ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Color Preview */}
      <div className="space-y-4">
        <div className="p-4 bg-card border border-default rounded">
          <h3 className="text-lg font-semibold text-heading mb-2">Current Theme Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="h-8 bg-primary rounded mb-1"></div>
              <p className="text-xs text-muted-foreground">Primary</p>
            </div>
            <div>
              <div className="h-8 bg-accent rounded mb-1"></div>
              <p className="text-xs text-muted-foreground">Accent</p>
            </div>
            <div>
              <div className="h-8 bg-secondary rounded mb-1"></div>
              <p className="text-xs text-muted-foreground">Secondary</p>
            </div>
            <div>
              <div className="h-8 bg-background border border-default rounded mb-1"></div>
              <p className="text-xs text-muted-foreground">Background</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-muted rounded">
        <h3 className="text-lg font-semibold text-heading mb-2">Advanced Features:</h3>
        <ul className="text-body space-y-1 text-sm">
          <li>• Color theory transformations (complementary, triadic)</li>
          <li>• OKLCH color space manipulation</li>
          <li>• Dynamic palette generation</li>
          <li>• Brightness and saturation controls</li>
          <li>• Hue shifting with proper interpolation</li>
          <li>• Color blending capabilities</li>
        </ul>
      </div>
    </div>
  );
};
