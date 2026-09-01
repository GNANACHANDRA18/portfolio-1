import { ogCards, ogImage } from '@/lib/og';

/**
 * Share cards, served as ordinary route handlers.
 *
 * Every key in the registry is prerendered at build time, so a crawler that
 * hits /og/ai gets a static PNG rather than waking a function. An unknown key
 * falls back to the home card instead of 404ing — a share link with a broken
 * image is worse than a share link with a generic one.
 */

export const dynamic = 'force-static';
export const dynamicParams = true;

export function generateStaticParams() {
  return Object.keys(ogCards).map((key) => ({ key }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string }> },
) {
  const { key } = await params;
  return ogImage(ogCards[key] ?? ogCards.home);
}
