import type { ConstellationNode } from '@/components/system/Constellation';

export const heroWords = ['WEB', 'SOFTWARE', 'AI', 'SYSTEMS'];

export const systemStack = [
  { id: 'ui', label: 'UI', note: 'What a person actually touches' },
  { id: 'api', label: 'API', note: 'The contract between the two halves' },
  { id: 'logic', label: 'LOGIC', note: 'Rules the business actually runs on' },
  { id: 'data', label: 'DATA', note: 'What has to be true tomorrow' },
  { id: 'system', label: 'SYSTEM', note: 'All of it, working as one thing' },
];

export const buildAreas = [
  {
    id: 'websites',
    label: 'WEBSITES',
    body: 'Modern responsive business and portfolio websites.',
    detail: [
      'Brand-led layouts',
      'Catalogue and content structures',
      'Enquiry and conversion flows',
    ],
    tint: 'var(--color-ai-blue)',
  },
  {
    id: 'apps',
    label: 'WEB APPLICATIONS',
    body: 'Interactive applications and business systems.',
    detail: ['Authenticated areas', 'Dashboards and tools', 'Stateful interfaces'],
    tint: 'var(--color-ai-violet)',
  },
  {
    id: 'commerce',
    label: 'E-COMMERCE',
    body: 'Digital product catalogues and commerce experiences.',
    detail: ['Filtered discovery', 'Trade and retail pricing', 'Product tooling'],
    tint: 'var(--color-ai-cyan)',
  },
  {
    id: 'ai',
    label: 'AI APPLICATIONS',
    body: 'Applications incorporating AI, LLMs and intelligent workflows.',
    detail: ['Context design', 'Tool use', 'Validation and guardrails'],
    tint: 'var(--color-ai-magenta)',
  },
  {
    id: 'systems',
    label: 'BUSINESS SYSTEMS',
    body: 'Technology designed around real business processes.',
    detail: ['Process mapping', 'Automation', 'Handover and documentation'],
    tint: 'var(--color-ai-yellow)',
  },
];

export const devProcess = [
  { step: 'UNDERSTAND', detail: 'Requirements and problem.' },
  { step: 'ARCHITECT', detail: 'System structure and technical approach.' },
  { step: 'DESIGN', detail: 'User experience and interface.' },
  { step: 'BUILD', detail: 'Implementation.' },
  { step: 'TEST', detail: 'Validation and debugging.' },
  { step: 'DEPLOY', detail: 'Turn it into a usable product.' },
  { step: 'IMPROVE', detail: 'Feedback and iteration.' },
];

export const aiDevFlow = [
  'PROMPT',
  'CONTEXT',
  'AI OUTPUT',
  'REVIEW',
  'IMPLEMENT',
  'TEST',
  'REFINE',
];

export const techNodes: ConstellationNode[] = [
  {
    id: 'frontend',
    label: 'FRONTEND',
    body: 'The layer people judge the whole product by.',
    chain: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'TypeScript'],
  },
  {
    id: 'backend',
    label: 'BACKEND',
    body: 'Where the rules live and the data is kept honest.',
    chain: ['APIs', 'Server-side', 'Databases', 'Authentication'],
  },
  {
    id: 'tools',
    label: 'TOOLS',
    body: 'The workbench around the work.',
    chain: ['Git', 'GitHub', 'AI coding assistants', 'Developer tooling'],
  },
  {
    id: 'ai',
    label: 'AI',
    body: 'Inside the build loop rather than beside it.',
    chain: ['LLM APIs', 'AI-assisted development', 'Automation'],
  },
];

export const codeToInterface = [
  { label: 'COMPONENT', note: 'A named, reusable piece' },
  { label: 'LOGIC', note: 'What it decides' },
  { label: 'DATA', note: 'What it knows' },
  { label: 'INTERACTION', note: 'What it responds to' },
  { label: 'USER EXPERIENCE', note: 'What it feels like' },
];

export const apiPipeline = [
  { id: 'client', label: 'CLIENT', note: 'The browser, holding a person’s intent.' },
  { id: 'request', label: 'REQUEST', note: 'A precise question, sent over the wire.' },
  { id: 'api', label: 'API', note: 'The contract — what may be asked, and how.' },
  {
    id: 'logic',
    label: 'BUSINESS LOGIC',
    note: 'The rules that decide what the answer should be.',
  },
  { id: 'database', label: 'DATABASE', note: 'Where the truth is stored.' },
  { id: 'response', label: 'RESPONSE', note: 'Back to the interface, shaped for a person.' },
];

export const dataFlow = ['USER', 'APPLICATION', 'DATABASE', 'RESULT'];

export const responsiveNotes = [
  'Responsive UI',
  'Mobile-first thinking',
  'Performance',
  'Accessibility',
];

export const businessChain = [
  'BUSINESS PROBLEM',
  'USER NEED',
  'TECHNOLOGY',
  'PRODUCT',
  'BUSINESS VALUE',
];

export const engineeringPrinciples = [
  { n: '01', title: 'KEEP IT SIMPLE.' },
  { n: '02', title: 'BUILD FOR PEOPLE.' },
  { n: '03', title: 'AUTOMATE WHAT SHOULD BE AUTOMATED.' },
  { n: '04', title: 'TEST WHAT MATTERS.' },
  { n: '05', title: 'SHIP AND IMPROVE.' },
];

export const exploringTags = [
  'AI APPLICATIONS',
  'LLM WORKFLOWS',
  'AI AUTOMATION',
  'WEB EXPERIENCES',
  'DIGITAL PRODUCTS',
  'DEVELOPER TOOLS',
];

export const debugSteps = [
  'ERROR',
  'INVESTIGATE',
  'REPRODUCE',
  'DEBUG',
  'FIX',
  'TEST',
  'SHIP',
];

export const performanceValues = [
  'PERFORMANCE',
  'RESPONSIVENESS',
  'ACCESSIBILITY',
  'SEO',
  'MAINTAINABILITY',
];

export const projectHighlights: Record<string, string[]> = {
  'living-lines': ['Catalogue', 'Showrooms', 'Design consultation'],
  'bandhan-ceramic': [
    '5,000+ products',
    '13 stores',
    'Tile calculator',
    'AR visualiser',
    'Architect pricing',
  ],
  'om-sri-balaji': ['Product catalogue', 'Trade pricing', 'WhatsApp enquiry'],
};
