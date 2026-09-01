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
 *
 * Routes that carry real photography also list it, so the client work is
 * indexable as images rather than only as page text. Only photographs are
 * listed — the generated plates are backdrops, and asking a crawler to index
 * a blurred colour field helps nobody.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gnanachandra-portfolio.vercel.app'
).replace(/\/$/, '');

/**
 * Case-study photography, by route. `asset` is the source-image stem, which
 * is not the route slug — the files came from the client's own library and
 * kept its naming. Captions double as the image title.
 */
const PROJECT_IMAGES = {
  'living-lines': {
    asset: 'livinglines',
    title: 'Living Lines — premium tiles, bathware and architectural surfaces',
  },
  'bandhan-ceramic': {
    asset: 'bandhan',
    title: 'Bandhan Ceramic — showroom and product catalogue',
  },
  'om-sri-balaji': {
    asset: 'omsribalaji',
    title: 'Om Sri Balaji Electricals — electricals and sanitaryware since 1962',
  },
};

const projectImages = (slug) => {
  const project = PROJECT_IMAGES[slug];
  return ['card', 'plate', 'square'].map((variant) => ({
    loc: `/images/work/${project.asset}-${variant}.webp`,
    title: project.title,
  }));
};

const ROUTES = [
  { path: '/', priority: '1.0' },
  { path: '/about', priority: '0.8' },
  { path: '/ai', priority: '0.9' },
  { path: '/development', priority: '0.8' },
  { path: '/marketing', priority: '0.8' },
  { path: '/social-media', priority: '0.8' },
  { path: '/video-editing', priority: '0.8' },
  {
    path: '/work',
    priority: '0.9',
    images: Object.keys(PROJECT_IMAGES).flatMap((slug) => projectImages(slug).slice(0, 1)),
  },
  { path: '/work/living-lines', priority: '0.7', images: projectImages('living-lines') },
  {
    path: '/work/bandhan-ceramic',
    priority: '0.7',
    images: projectImages('bandhan-ceramic'),
  },
  { path: '/work/om-sri-balaji', priority: '0.7', images: projectImages('om-sri-balaji') },
  { path: '/experience', priority: '0.8' },
  { path: '/skills', priority: '0.8' },
  { path: '/contact', priority: '0.8' },
];

const lastmod = new Date().toISOString().slice(0, 10);

const escape = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const imageTags = (images = []) =>
  images
    .map(
      (image) => `
    <image:image>
      <image:loc>${SITE_URL}${image.loc}</image:loc>
      <image:title>${escape(image.title)}</image:title>
    </image:image>`,
    )
    .join('');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${ROUTES.map(
  (route) => `  <url>
    <loc>${SITE_URL}${route.path === '/' ? '' : route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${route.priority}</priority>${imageTags(route.images)}
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

const imageCount = ROUTES.reduce((total, route) => total + (route.images?.length ?? 0), 0);

console.log(
  `[seo] wrote sitemap.xml (${ROUTES.length} urls, ${imageCount} images) and robots.txt for ${SITE_URL}`,
);
