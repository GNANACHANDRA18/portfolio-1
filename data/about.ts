import type { ConstellationNode } from '@/components/system/Constellation';

export const roleNodes: ConstellationNode[] = [
  {
    id: 'developer',
    label: 'DEVELOPER',
    body: 'I turn ideas and business requirements into usable digital experiences.',
    chain: ['Idea', 'System', 'Interface', 'Product'],
  },
  {
    id: 'cmo',
    label: 'CMO',
    body: 'I work across marketing, brand positioning, business development and client experience.',
    chain: ['Pitch', 'Proposal', 'Brand', 'Handoff'],
  },
  {
    id: 'ai',
    label: 'AI PRACTITIONER',
    body: 'I use AI to accelerate development, research, creativity and business workflows.',
    chain: ['Research', 'Build', 'Review', 'Ship'],
  },
  {
    id: 'marketer',
    label: 'MARKETER',
    body: 'I make what gets built legible to the people it was built for.',
    chain: ['Position', 'Content', 'Distribute'],
  },
  {
    id: 'creator',
    label: 'CREATOR',
    body: 'I work across video, content and digital communication.',
    chain: ['Concept', 'Edit', 'Publish'],
  },
  {
    id: 'video',
    label: 'VIDEO EDITOR',
    body: 'Short-form, brand and promotional video — concept through export.',
    chain: ['Script', 'Cut', 'Motion', 'Sound'],
  },
  {
    id: 'social',
    label: 'SOCIAL MEDIA',
    body: 'Content planning and digital presence built as a repeatable system.',
    chain: ['Plan', 'Create', 'Analyse'],
  },
  {
    id: 'client',
    label: 'CLIENT SUCCESS',
    body: 'I keep communication clear from the first conversation through delivery.',
    chain: ['Brief', 'Update', 'Deliver'],
  },
];

export const storyBeats = [
  { word: 'TECHNOLOGY', note: 'How things actually work' },
  { word: 'SOFTWARE', note: 'Turning that into something usable' },
  { word: 'AI', note: 'Moving faster, exploring more' },
  { word: 'MARKETING', note: 'Why anyone should care' },
  { word: 'BUSINESS', note: 'What the work is really for' },
  { word: 'CREATIVITY', note: 'Making it worth noticing' },
];

export const intersectionCircles = [
  { id: 'technology', label: 'TECHNOLOGY', tint: 'var(--color-ai-blue)' },
  { id: 'ai', label: 'AI', tint: 'var(--color-ai-violet)' },
  { id: 'business', label: 'BUSINESS', tint: 'var(--color-ai-cyan)' },
  { id: 'creativity', label: 'CREATIVITY', tint: 'var(--color-ai-magenta)' },
];

export const intersectionOutputs = [
  'Software Development',
  'Marketing',
  'AI Workflows',
  'Brand',
  'Client Success',
  'Content',
  'Video',
];

export const principles = [
  {
    n: '01',
    title: 'UNDERSTAND FIRST.',
    body: 'Before building anything, understand the actual problem.',
  },
  {
    n: '02',
    title: 'USE THE RIGHT TOOL.',
    body: 'Technology and AI are valuable when they solve something meaningful.',
  },
  {
    n: '03',
    title: 'MAKE IT CLEAR.',
    body: 'Good products and good marketing both depend on clarity.',
  },
  {
    n: '04',
    title: 'SHIP.',
    body: 'Ideas become valuable when they become usable.',
  },
  {
    n: '05',
    title: 'KEEP IMPROVING.',
    body: 'Launch is the beginning of feedback, not the end of the work.',
  },
];

export const doMenu = [
  {
    n: '01',
    label: 'SOFTWARE',
    href: '/development',
    body: 'Websites, web applications and digital products built to ship.',
    tint: 'var(--color-ai-blue)',
  },
  {
    n: '02',
    label: 'AI',
    href: '/ai',
    body: 'AI-assisted development, research, automation and applications.',
    tint: 'var(--color-ai-violet)',
  },
  {
    n: '03',
    label: 'MARKETING',
    href: '/marketing',
    body: 'Brand positioning, proposals, pricing and business development.',
    tint: 'var(--color-ai-cyan)',
  },
  {
    n: '04',
    label: 'SOCIAL',
    href: '/social-media',
    body: 'Content strategy and digital presence across LinkedIn and Instagram.',
    tint: 'var(--color-ai-magenta)',
  },
  {
    n: '05',
    label: 'VIDEO',
    href: '/video-editing',
    body: 'Editing and creative content for social, campaigns and brand.',
    tint: 'var(--color-ai-yellow)',
  },
  {
    n: '06',
    label: 'CLIENT SUCCESS',
    href: '/marketing',
    body: 'Owning the client relationship from first pitch through to handoff.',
    tint: 'var(--color-ai-pink)',
  },
];

export const workingModel = [
  'DISCOVER',
  'RESEARCH',
  'STRATEGIZE',
  'BUILD',
  'CREATE',
  'DELIVER',
  'LEARN',
];



export const aboutPhilosophy = ['LEARN.', 'BUILD.', 'CREATE.', 'IMPROVE.', 'REPEAT.'];

export const qyverixResponsibilities = [
  'Proposals',
  'Pricing brochures',
  'LinkedIn content',
  'Demo portfolio sites for sales',
  'Marketing',
  'Brand positioning',
  'Client communication',
  'Client success',
  'Business development',
];

export const qyverixFlow = [
  'PITCH',
  'PROPOSAL',
  'POSITIONING',
  'CLIENT',
  'BUILD',
  'HANDOFF',
];

export const aiLoop = ['RESEARCH', 'THINK', 'BUILD', 'VERIFY', 'IMPROVE'];

/**
 * The creative reel.
 *
 * Three static cards of bullet points is the least creative way to claim
 * creative work, so each discipline gets a frame instead: its own plate from
 * the generated image system, its own tint, and one sentence that could only
 * be said about that discipline.
 */
export const creativeReel = [
  {
    id: 'video',
    label: 'VIDEO',
    href: '/video-editing',
    plate: 'video-frames',
    tint: 'var(--color-accent)',
    meta: 'Concept → export',
    line: 'A cut is an argument about where attention goes.',
    body: 'Editing, short-form and brand film — built to survive the first three seconds and still land at the end.',
    items: ['Video editing', 'Short-form', 'Brand film'],
  },
  {
    id: 'social',
    label: 'SOCIAL',
    href: '/social-media',
    plate: 'social-pulse',
    tint: 'var(--color-ai-magenta)',
    meta: 'One idea, published',
    line: 'Reach is a system, not a lucky post.',
    body: 'Content built as a repeatable engine: formats that can run weekly, on a calendar, without waiting for inspiration.',
    items: ['Social media', 'Content creation', 'Digital presence'],
  },
  {
    id: 'visual',
    label: 'VISUAL',
    href: '/marketing',
    plate: 'marketing-strata',
    tint: 'var(--color-ai-blue)',
    meta: 'Look, then read',
    line: 'People judge the design before they read the sentence.',
    body: 'Creative direction and visual language for brands, decks and proposals — so the work looks like what it claims to be.',
    items: ['Visual communication', 'Creative direction', 'Brand'],
  },
] as const;

/**
 * Tools have a shelf life; thinking does not. The two lists below are read as
 * one sentence — which is why each side carries the reason it belongs there
 * rather than sitting as a bare noun.
 */
export const toolShelf = [
  { label: 'AI', note: 'New frontier model every few months.' },
  { label: 'Code', note: 'Frameworks rewrite themselves each cycle.' },
  { label: 'Software', note: 'Today\u2019s standard, tomorrow\u2019s migration.' },
  { label: 'Design', note: 'Trends age faster than the work does.' },
  { label: 'Automation', note: 'Every platform ships a new way to do it.' },
  { label: 'Content', note: 'Formats change with the feed.' },
];

export const thinkingStack = [
  { label: 'Problem solving', note: 'Transfers to every tool on the left.' },
  { label: 'Curiosity', note: 'The reason the left column keeps updating.' },
  { label: 'Communication', note: 'Decides whether good work gets used.' },
  { label: 'Execution', note: 'Turns an opinion into something shipped.' },
  { label: 'Judgment', note: 'Knowing which tool not to reach for.' },
  { label: 'Learning', note: 'Compounds instead of expiring.' },
];
