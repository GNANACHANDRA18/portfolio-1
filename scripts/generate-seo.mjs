/**
 * Writes public/sitemap.xml and public/robots.txt before each build.
 *
 * Next.js normally generates these from app/sitemap.ts and app/robots.ts.
 * That loader cannot handle a project path containing an apostrophe (the
 * current folder is "gnanachandra's"), so they are produced here instead.
 * If the project moves to a path without an apostrophe, this script can be
 * replaced by the standard app/sitemap.ts and app/robots.ts files.
 *
 * Keep ROUTES in sync with `navigation` in data/site.ts and `projects` in
 * data/projects.ts.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gnanachandra.netlify.app'
).replace(/\/$/, '');

const ROUTES = [
  { path: '/', priority: '1.0' },
  { path: '/about', priority: '0.8' },
  { path: '/ai', priority: '0.9' },
  { path: '/development', priority: '0.8' },
  { path: '/marketing', priority: '0.8' },
  { path: '/social-media', priority: '0.8' },
  { path: '/video-editing', priority: '0.8' },
  { path: '/work', priority: '0.9' },
  { path: '/work/living-lines', priority: '0.7' },
  { path: '/work/bandhan-ceramic', priority: '0.7' },
  { path: '/work/om-sri-balaji', priority: '0.7' },
  { path: '/experience', priority: '0.8' },
  { path: '/skills', priority: '0.8' },
  { path: '/contact', priority: '0.8' },
];

const lastmod = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (route) => `  <url>
    <loc>${SITE_URL}${route.path === '/' ? '' : route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
).join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /
Disallow: /api/

Host: ${SITE_URL}
Sitemap: ${SITE_URL}/sitemap.xml
`;

const publicDir = path.join(process.cwd(), 'public');

await mkdir(publicDir, { recursive: true });
await writeFile(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8');
await writeFile(path.join(publicDir, 'robots.txt'), robots, 'utf8');

console.log(`[seo] wrote sitemap.xml and robots.txt for ${SITE_URL}`);
