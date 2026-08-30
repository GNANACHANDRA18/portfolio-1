import type { ConstellationNode } from '@/components/system/Constellation';

/** Content for the home experience, kept out of the animation code. */

export const statementWords = [
  { word: 'AI', from: 'left' as const },
  { word: 'SOFTWARE', from: 'right' as const },
  { word: 'MARKETING', from: 'bottom' as const },
  { word: 'BRAND', from: 'left' as const },
  { word: 'CONTENT', from: 'right' as const },
];

export type Identity = {
  id: string;
  word: string;
  line: string;
  href: string;
  tint: string;
};

export const identities: Identity[] = [
  {
    id: 'build',
    word: 'BUILD',
    line: 'Software, websites and digital products.',
    href: '/development',
    tint: 'var(--color-ai-blue)',
  },
  {
    id: 'think',
    word: 'THINK',
    line: 'AI research, strategy and problem solving.',
    href: '/ai',
    tint: 'var(--color-ai-violet)',
  },
  {
    id: 'create',
    word: 'CREATE',
    line: 'Video, content and creative experiences.',
    href: '/video-editing',
    tint: 'var(--color-ai-magenta)',
  },
  {
    id: 'grow',
    word: 'GROW',
    line: 'Marketing, branding and client success.',
    href: '/marketing',
    tint: 'var(--color-ai-cyan)',
  },
  {
    id: 'automate',
    word: 'AUTOMATE',
    line: 'AI-powered workflows and business systems.',
    href: '/ai',
    tint: 'var(--color-ai-yellow)',
  },
];

export const softwareStages = [
  { label: 'IDEA', note: 'The problem, stated plainly' },
  { label: 'DESIGN', note: 'Structure and interface' },
  { label: 'CODE', note: 'AI-assisted, human-directed' },
  { label: 'TEST', note: 'Against the real requirement' },
  { label: 'DEPLOY', note: 'Shipped and watched' },
];

export const softwareSnippets: Record<string, string[]> = {
  IDEA: ['// a catalogue people can browse fast', 'scope: retail · 5,000 products'],
  DESIGN: ['catalogue/', '  filters/', '  product/[slug]/', 'design tokens → components'],
  CODE: ['export async function search(q: string) {', '  const hits = await index.query(q)', '  return rank(hits)', '}'],
  TEST: ['✓ ranks exact matches first', '✓ handles empty query', '✓ paginates past 100'],
  DEPLOY: ['$ next build', '  ✓ compiled successfully', '$ deploy --prod'],
};

export const qyverixJourney = ['PITCH', 'PROPOSAL', 'BRAND', 'BUILD', 'HANDOFF'];

export const creativeAreas = [
  {
    id: 'video',
    label: 'VIDEO',
    line: 'Video editing.',
    body: 'Short-form, brand and promotional cuts — concept through export.',
    href: '/video-editing',
    tint: 'var(--color-ai-violet)',
  },
  {
    id: 'social',
    label: 'SOCIAL',
    line: 'Social-media content.',
    body: 'Content built as a repeatable system across LinkedIn and Instagram.',
    href: '/social-media',
    tint: 'var(--color-ai-magenta)',
  },
  {
    id: 'brand',
    label: 'BRAND',
    line: 'Marketing and visual communication.',
    body: 'Positioning, proposals and the message everything else hangs off.',
    href: '/marketing',
    tint: 'var(--color-ai-cyan)',
  },
];

export const workflowSteps = [
  { label: 'DISCOVER', note: 'What the business actually needs' },
  { label: 'RESEARCH', note: 'Market, competitors, prior art' },
  { label: 'STRATEGIZE', note: 'Decide what is worth building' },
  { label: 'BUILD', note: 'Ship in real increments' },
  { label: 'CREATE', note: 'The content that carries it' },
  { label: 'LAUNCH', note: 'Deploy, hand off, go live' },
  { label: 'IMPROVE', note: 'Watch it and refine' },
];

export const philosophyLines = [
  'THINK BIG.',
  'BUILD SMART.',
  'USE AI.',
  'MAKE IT MATTER.',
];

/**
 * THE GNANA SYSTEM — the home reading of the signature diagram.
 *
 * About webs the *roles* together; this webs the *domains* they operate on,
 * so the two pages tell the same story from different angles.
 */
export const systemNodes: ConstellationNode[] = [
  {
    id: 'ai',
    label: 'AI',
    body: 'AI as working equipment — assisted development, research, content and automation.',
    chain: ['Context', 'Generate', 'Review', 'Ship'],
  },
  {
    id: 'code',
    label: 'CODE',
    body: 'Websites, web applications and digital products, built to be used rather than demoed.',
    chain: ['Architecture', 'Interface', 'Data', 'Deploy'],
  },
  {
    id: 'business',
    label: 'BUSINESS',
    body: 'What the business actually needs, and what a project has to be worth to be worth doing.',
    chain: ['Problem', 'Strategy', 'Value'],
  },
  {
    id: 'brand',
    label: 'BRAND',
    body: 'Positioning and messaging — how a company reads to the people deciding about it.',
    chain: ['Position', 'Message', 'Consistency'],
  },
  {
    id: 'content',
    label: 'CONTENT',
    body: 'Social, video and written content, produced as a repeatable system rather than one-offs.',
    chain: ['Plan', 'Create', 'Publish'],
  },
  {
    id: 'client',
    label: 'CLIENT',
    body: 'One point of contact from first pitch through to handoff, and after it.',
    chain: ['Pitch', 'Proposal', 'Delivery', 'Handoff'],
  },
];
