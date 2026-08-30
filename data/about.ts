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

export const toolsColumn = [
  'AI',
  'Code',
  'Software',
  'Design',
  'Automation',
  'Content',
];

export const thinkingColumn = [
  'Problem solving',
  'Curiosity',
  'Communication',
  'Execution',
  'Judgment',
  'Learning',
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
