import { ImageResponse } from 'next/og';
import { site } from '@/data/site';
import { projects } from '@/data/projects';

/**
 * Share cards.
 *
 * Every route gets its own 1200×630 card rather than falling back to a
 * portrait crop, which is what a link to this site used to show whatever page
 * it pointed at. Cards are drawn entirely from gradients and type — no raster
 * input — so they render identically on every deploy target and never depend
 * on an image being reachable.
 *
 * These are served from /og/[key] as ordinary route handlers rather than
 * through Next's `opengraph-image` file convention: that convention's loader
 * cannot parse the apostrophe in this project's directory name, the same
 * limitation that keeps the favicon in /public.
 *
 * The accent is the only thing that changes between sections, which is the
 * rule the site itself follows: gold by default, blue-violet for the AI and
 * business rooms.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

export type OgAccent = 'gold' | 'blue' | 'violet' | 'magenta';

const ACCENT: Record<OgAccent, { hex: string; glow: string; second: string }> = {
  gold: { hex: '#e9b872', glow: 'rgba(233,184,114,0.30)', second: 'rgba(185,138,69,0.20)' },
  blue: { hex: '#3b6bff', glow: 'rgba(59,107,255,0.34)', second: 'rgba(139,92,246,0.24)' },
  violet: { hex: '#8b5cf6', glow: 'rgba(139,92,246,0.34)', second: 'rgba(59,107,255,0.22)' },
  magenta: { hex: '#e5399b', glow: 'rgba(229,57,155,0.30)', second: 'rgba(34,211,238,0.20)' },
};

export function ogImage({
  title,
  eyebrow,
  accent = 'gold',
}: {
  title: string;
  eyebrow: string;
  accent?: OgAccent;
}) {
  const tone = ACCENT[accent];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#050505',
          padding: '72px 80px',
          position: 'relative',
        }}
      >
        {/* Two colour fields, the same underpainting the generated plates use. */}
        <div
          style={{
            position: 'absolute',
            top: -240,
            left: -160,
            width: 900,
            height: 900,
            background: `radial-gradient(circle, ${tone.glow} 0%, rgba(5,5,5,0) 66%)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -300,
            right: -200,
            width: 860,
            height: 860,
            background: `radial-gradient(circle, ${tone.second} 0%, rgba(5,5,5,0) 68%)`,
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              letterSpacing: 5,
              textTransform: 'uppercase',
              color: '#8a8a8a',
            }}
          >
            {eyebrow}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ display: 'flex', width: 10, height: 10, borderRadius: 999, background: tone.hex }} />
            <div style={{ display: 'flex', fontSize: 22, letterSpacing: 4, color: '#8a8a8a' }}>
              GNANA CHANDRA
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: title.length > 46 ? 66 : 84,
              lineHeight: 1.02,
              letterSpacing: -3,
              color: '#f5f5f0',
              maxWidth: 980,
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <div style={{ display: 'flex', height: 1, width: '100%', background: '#242424' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', fontSize: 30, color: '#f5f5f0', letterSpacing: -0.6 }}>
                {site.name}
              </div>
              <div style={{ display: 'flex', fontSize: 22, color: '#8a8a8a', letterSpacing: -0.2 }}>
                {site.role}
              </div>
            </div>
            <div style={{ display: 'flex', fontSize: 22, letterSpacing: 3, color: tone.hex }}>
              {site.url.replace(/^https?:\/\//, '')}
            </div>
          </div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}


/** One card per route. The key is also the URL segment: /og/<key>. */
export const ogCards: Record<string, { title: string; eyebrow: string; accent: OgAccent }> = {
  home: {
    title: 'Software × AI × Marketing × Creativity',
    eyebrow: 'Portfolio',
    accent: 'gold',
  },
  about: { title: 'Who I am, and how I work.', eyebrow: 'About', accent: 'gold' },
  work: { title: 'Selected projects and case studies.', eyebrow: 'Work', accent: 'gold' },
  ai: {
    title: 'Think with AI. Build with AI.',
    eyebrow: 'Artificial intelligence',
    accent: 'violet',
  },
  development: {
    title: 'Websites, products and web applications.',
    eyebrow: 'Development',
    accent: 'blue',
  },
  marketing: {
    title: 'Brand, proposals and client success.',
    eyebrow: 'Marketing · CMO',
    accent: 'blue',
  },
  'social-media': {
    title: 'Content built as a repeatable system.',
    eyebrow: 'Social media',
    accent: 'magenta',
  },
  'video-editing': { title: 'Concept through export.', eyebrow: 'Video editing', accent: 'gold' },
  experience: { title: 'Roles and responsibilities.', eyebrow: 'Experience', accent: 'gold' },
  skills: { title: 'The capability matrix.', eyebrow: 'Skills', accent: 'blue' },
  contact: { title: 'Start a conversation.', eyebrow: 'Contact', accent: 'gold' },
  ...Object.fromEntries(
    projects.map((project) => [
      `work-${project.slug}`,
      {
        title: project.name,
        eyebrow: `Case study · ${project.industry}`,
        accent: 'gold' as OgAccent,
      },
    ]),
  ),
};

/**
 * Maps a route path to its card key, so a page never has to name its own
 * share image. Unknown paths fall back to the home card rather than to
 * nothing — a link with no preview reads as a broken link.
 */
export function ogKey(path: string) {
  const slug = path.replace(/^\/+|\/+$/g, '').replace(/\//g, '-');
  if (!slug) return 'home';
  return slug in ogCards ? slug : 'home';
}
