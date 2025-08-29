# Theme Color Morphing Hook

The `useThemeMorph` hook provides a powerful way to dynamically alter CSS color variables from within React components without causing re-renders or state changes.

## Features

- **Instant Updates**: Colors change immediately without React state changes
- **No Re-renders**: Uses CSS custom properties for direct DOM manipulation
- **Throttled Performance**: Limited to 60 FPS for optimal performance
- **Partial Updates**: Only specified colors are changed
- **OKLCH Support**: Works with perceptual color space for better interpolation
- **Type Safety**: Full TypeScript support with proper type definitions

## Usage

```tsx
import { useThemeMorph } from '../hooks/useThemeMorph';

const MyComponent = () => {
  const { morph } = useThemeMorph();

  const changeToWarmColors = () => {
    morph((colors) => ({
      primary: '0.6 0.2 30', // Warm orange/red
      accent: '0.7 0.15 45',  // Warm accent
    }));
  };

  return (
    <button onClick={changeToWarmColors}>
      Change to Warm Colors
    </button>
  );
};
```

## API

### `useThemeMorph()`

Returns an object with a `morph` function.

#### `morph(callback: ThemeColorCallback)`

The `morph` function accepts a callback that:
1. Receives the current theme colors as a parameter
2. Returns a partial object of new color values
3. Can return an empty object for no changes

**Parameters:**
- `callback`: Function that receives current colors and returns new colors

**Returns:** `void`

## Color Format

Colors are specified in OKLCH format as space-separated strings:
- `"lightness chroma hue"` (e.g., `"0.6 0.2 240"`)

## Available Colors

The hook supports all theme colors defined in `globals.css`:

- `background` - Main background color
- `foreground` - Main text color
- `primary` - Primary brand color
- `primary-foreground` - Text on primary color
- `secondary` - Secondary color
- `secondary-foreground` - Text on secondary color
- `accent` - Accent color
- `accent-foreground` - Text on accent color
- `muted` - Muted background color
- `muted-foreground` - Muted text color
- `destructive` - Error/destructive color
- `destructive-foreground` - Text on destructive color
- `border` - Border color
- `input` - Input field color
- `ring` - Focus ring color
- `card` - Card background color
- `card-foreground` - Text on card color
- `popover` - Popover background color
- `popover-foreground` - Text on popover color
- `focus-blue` - Focus indicator color
- `text-gray-600` - Gray text color
- `text-gray-400` - Light gray text color
- `bg-gray-100` - Light gray background
- `bg-slate-800` - Dark slate background
- `border-gray-300` - Light gray border
- `border-gray-600` - Dark gray border
- `theme-color` - General theme color

## Examples

### Basic Color Change
```tsx
morph(() => ({
  primary: '0.7 0.2 240',
}));
```

### Multiple Colors
```tsx
morph(() => ({
  primary: '0.6 0.2 30',
  accent: '0.7 0.15 45',
  background: '0.98 0.01 240',
}));
```

### Dynamic Color Based on Current Values
```tsx
morph((colors) => {
  const [l, c, h] = colors.primary.split(' ').map(Number);
  const newHue = (h + 60) % 360;
  
  return {
    primary: `${l} ${c} ${newHue}`,
    accent: `${l + 0.1} ${c - 0.05} ${(newHue + 30) % 360}`,
  };
});
```

### No Changes
```tsx
morph(() => ({})); // No colors will be changed
```

## Performance Considerations

- The hook is throttled to 60 FPS to prevent excessive DOM updates
- Only specified colors are updated, minimizing performance impact
- No React state changes occur, avoiding unnecessary re-renders
- CSS custom properties provide immediate visual feedback

## Browser Support

Requires support for:
- CSS Custom Properties (CSS Variables)
- `getComputedStyle()` API
- `document.documentElement.style.setProperty()`

Modern browsers (Chrome 49+, Firefox 31+, Safari 9.1+, Edge 16+) are supported.

## Testing

The hook includes comprehensive tests covering:
- Basic functionality
- Multiple color updates
- Callback parameter passing
- Empty callback handling
- Throttling behavior

Run tests with:
```bash
npm test useThemeMorph
```
