/**
 * Route → surface theme.
 *
 * The site is dark end to end. Routes differ only in accent temperature:
 * `/ai` runs a cooler blue-violet room, `/marketing` a flat editorial noir,
 * and everything else the warm gold default. Shared chrome (header, footer,
 * cursor, ambient layer) reads this so it stays in step with whichever page
 * is showing.
 */
export type SurfaceTheme = 'ai' | 'lux' | 'noir';

export function themeFor(pathname: string): SurfaceTheme {
  if (pathname.startsWith('/ai')) return 'ai';
  if (pathname.startsWith('/marketing')) return 'noir';
  return 'lux';
}

/** Token class for a route. Matches the surface blocks in globals.css. */
export function themeClass(pathname: string): SurfaceTheme {
  return themeFor(pathname);
}

/**
 * Accent as a literal, for the places that have to paint a colour directly
 * — canvas, SVG attributes, framer-motion `animate` values — where a CSS
 * custom property is not resolvable.
 */
export function accentFor(pathname: string): string {
  return themeFor(pathname) === 'lux' ? '#e9b872' : '#3b6bff';
}

/** Every surface is dark now. Kept so callers reading it stay correct. */
export function isDark(): boolean {
  return true;
}
