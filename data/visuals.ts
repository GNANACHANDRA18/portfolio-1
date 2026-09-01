import type { GlassSlide } from '@/components/media/GlassGallery';

/**
 * The image system.
 *
 * No photograph on this site is decorative stock. Every backdrop is generated
 * by scripts/generate-assets.mjs from a seed, in one of six visual languages,
 * and each language belongs to a kind of page — so /ai reads as a different
 * room from /marketing without either of them borrowing someone else's
 * photography.
 *
 * The slides below are the languages, in the order a visitor meets them.
 */
export const imageSystem: GlassSlide[] = [
  {
    src: 'ai-nebula',
    label: 'Nebula',
    role: 'Artificial intelligence',
    note: 'Five colour fields, blurred past the point of having edges. Depth without a single hard line — the ground the AI work sits on.',
    rim: 'var(--color-ai-violet)',
  },
  {
    src: 'dev-lattice',
    label: 'Lattice',
    role: 'Software development',
    note: 'A wireframe plane receding to a vanishing point, with lit nodes scattered across it. Structure, drawn rather than photographed.',
    rim: 'var(--color-ai-blue)',
  },
  {
    src: 'marketing-strata',
    label: 'Strata',
    role: 'Marketing and brand',
    note: 'Flat editorial bands and a single accent rule. Almost no glow: the business pages stay quiet so the writing carries them.',
    rim: 'var(--color-ai-blue)',
  },
  {
    src: 'social-pulse',
    label: 'Pulse',
    role: 'Social media',
    note: 'Concentric rings leaving a source, crossed by standing waves. One idea, published, spreading outward.',
    rim: 'var(--color-ai-magenta)',
  },
  {
    src: 'video-frames',
    label: 'Frames',
    role: 'Video editing',
    note: 'A filmstrip over three timeline tracks with the playhead parked mid-cut. The editing room, reduced to its geometry.',
    rim: 'var(--color-accent)',
  },
  {
    src: 'home-prism',
    label: 'Prism',
    role: 'Home and about',
    note: 'One white edge splitting into five beams. The whole positioning in a single image: one person, several disciplines.',
    rim: 'var(--color-accent)',
  },
];

/**
 * Which plate backs which route. Kept here so a page never hard-codes an
 * asset key and the languages stay assigned in one place.
 */
export const routePlate = {
  home: 'home-prism',
  homeSystem: 'home-lattice',
  ai: 'ai-nebula',
  aiCore: 'ai-core',
  aiPulse: 'ai-pulse',
  aiPrism: 'ai-prism',
  development: 'dev-lattice',
  developmentStack: 'dev-strata',
  developmentSquare: 'dev-square',
  marketing: 'marketing-strata',
  marketingFlywheel: 'marketing-pulse',
  social: 'social-pulse',
  socialSquare: 'social-square',
  video: 'video-frames',
  videoSquare: 'video-square',
  about: 'about-prism',
  work: 'work-strata',
  contact: 'contact-nebula',
} as const;
