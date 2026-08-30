/** Content for the dark /marketing experience. */

export const heroMorph = ['MARKETING', 'BRAND', 'GROWTH', 'BUSINESS', 'STRATEGY'];

export const ecosystemNodes = [
  'CUSTOMER',
  'PRODUCT',
  'BRAND',
  'MARKETING',
  'SALES',
  'DATA',
  'AI',
  'BUSINESS',
];

export const bigStatements = [
  ['MARKETING', 'GETS ATTENTION.'],
  ['BUSINESS', 'CREATES VALUE.'],
  ['GREAT STRATEGY', 'CONNECTS BOTH.'],
];

export const mindsetAreas = [
  { id: 'customer', label: 'CUSTOMER', question: 'Who are we serving?' },
  { id: 'product', label: 'PRODUCT', question: 'What are we actually offering?' },
  {
    id: 'positioning',
    label: 'POSITIONING',
    question: 'Why should people choose us?',
  },
  { id: 'marketing', label: 'MARKETING', question: 'How do we reach them?' },
  {
    id: 'sales',
    label: 'SALES',
    question: 'How do we convert interest into business?',
  },
  {
    id: 'retention',
    label: 'RETENTION',
    question: 'How do we create lasting relationships?',
  },
];

export type Topic = { label: string; chain: string[] };

/**
 * Conceptual frameworks — how these subjects are structured, not claims of
 * specific expertise or results.
 */
export const businessTopics: Topic[] = [
  {
    label: 'ENTREPRENEURSHIP',
    chain: ['Idea', 'Risk', 'Build', 'Learn', 'Repeat'],
  },
  { label: 'STARTUPS', chain: ['Problem', 'Product', 'Market', 'Distribution', 'Growth'] },
  {
    label: 'BUSINESS STRATEGY',
    chain: ['Where to play', 'How to win', 'What to say no to'],
  },
  {
    label: 'MARKETING STRATEGY',
    chain: ['Audience', 'Message', 'Channel', 'Measure'],
  },
  { label: 'BRAND BUILDING', chain: ['Positioning', 'Identity', 'Experience', 'Trust'] },
  { label: 'GROWTH', chain: ['Acquisition', 'Conversion', 'Retention', 'Expansion'] },
  { label: 'SALES', chain: ['Lead', 'Qualify', 'Value', 'Close'] },
  {
    label: 'CUSTOMER EXPERIENCE',
    chain: ['Expectation', 'Interaction', 'Resolution', 'Loyalty'],
  },
  { label: 'TECHNOLOGY', chain: ['Constraint', 'Capability', 'Leverage'] },
  {
    label: 'ARTIFICIAL INTELLIGENCE',
    chain: ['Context', 'Generation', 'Review', 'Deployment'],
  },
  {
    label: 'DIGITAL PRODUCTS',
    chain: ['Need', 'Interface', 'System', 'Iteration'],
  },
  {
    label: 'BUSINESS DEVELOPMENT',
    chain: ['Relationship', 'Fit', 'Proposal', 'Partnership'],
  },
  {
    label: 'PRODUCT STRATEGY',
    chain: ['Problem', 'Scope', 'Sequence', 'Trade-offs'],
  },
  { label: 'AUTOMATION', chain: ['Map', 'Repetition', 'System', 'Monitor'] },
  { label: 'SOCIAL MEDIA', chain: ['Angle', 'Format', 'Cadence', 'Response'] },
  {
    label: 'CREATIVE STRATEGY',
    chain: ['Insight', 'Concept', 'Execution', 'Consistency'],
  },
];

export const flywheel = [
  'PRODUCT',
  'MARKETING',
  'SALES',
  'CUSTOMER',
  'RETENTION',
  'REFERRAL',
  'GROWTH',
];

export const cmoResponsibilities = [
  'PROPOSALS',
  'PRICING BROCHURES',
  'LINKEDIN CONTENT',
  'DEMO PORTFOLIO SITES',
  'BRAND POSITIONING',
  'CLIENT COMMUNICATION',
  'BUSINESS DEVELOPMENT',
  'CLIENT HANDOFF',
];

export const pitchFlow = [
  { step: 'LEAD', detail: 'Someone raises a hand.' },
  { step: 'DISCOVERY', detail: 'Listening before proposing anything.' },
  {
    step: 'UNDERSTAND THE BUSINESS',
    detail: 'How it makes money, and where it leaks.',
  },
  { step: 'IDENTIFY THE PROBLEM', detail: 'The real one, not the stated one.' },
  { step: 'PROPOSE THE SOLUTION', detail: 'Scope a business can decide on.' },
  { step: 'PRICING', detail: 'Value framed before the number.' },
  { step: 'BUILD', detail: 'The Qyverix team makes it real.' },
  { step: 'DELIVER', detail: 'Shipped, explained, handed over.' },
  { step: 'CLIENT SUCCESS', detail: 'The relationship after delivery.' },
];

export const brandLadder = [
  { label: 'POSITIONING', note: 'The claim you can defend.' },
  { label: 'MESSAGE', note: 'That claim, in words people repeat.' },
  { label: 'VISUAL IDENTITY', note: 'The look that makes it recognisable.' },
  { label: 'DIGITAL EXPERIENCE', note: 'Where most people meet the brand.' },
  { label: 'CUSTOMER EXPERIENCE', note: 'What actually happens to them.' },
  { label: 'TRUST', note: 'The compounding result of all of it.' },
];

export const aiBusinessAreas = [
  'RESEARCH',
  'CUSTOMER SUPPORT',
  'MARKETING',
  'CONTENT',
  'SALES',
  'OPERATIONS',
  'ANALYTICS',
  'AUTOMATION',
  'PRODUCT',
];

export const businessSoftwareChain = [
  'BUSINESS PROBLEM',
  'CUSTOMER NEED',
  'STRATEGY',
  'SOFTWARE',
  'DIGITAL EXPERIENCE',
  'BUSINESS OUTCOME',
];

export const contentBranches = [
  'LINKEDIN',
  'INSTAGRAM',
  'VIDEO',
  'WEBSITE',
  'SALES',
  'BRAND',
  'PRESENTATION',
];

export const contentFunnel = [
  'IDEA',
  'CONTENT',
  'DISTRIBUTION',
  'ATTENTION',
  'INTEREST',
  'ACTION',
];

export const clientSuccessChain = [
  'EXPECTATION',
  'COMMUNICATION',
  'EXECUTION',
  'FEEDBACK',
  'DELIVERY',
  'TRUST',
  'LONG-TERM RELATIONSHIP',
];

export type GridTopic = { id: string; label: string; related: string[] };

export const thinkingGrid: GridTopic[] = [
  {
    id: 'customer',
    label: 'CUSTOMER',
    related: ['product', 'market', 'sales', 'brand'],
  },
  {
    id: 'product',
    label: 'PRODUCT',
    related: ['customer', 'technology', 'strategy', 'growth'],
  },
  { id: 'market', label: 'MARKET', related: ['customer', 'brand', 'strategy'] },
  { id: 'brand', label: 'BRAND', related: ['customer', 'market', 'growth'] },
  { id: 'sales', label: 'SALES', related: ['customer', 'growth', 'operations'] },
  {
    id: 'growth',
    label: 'GROWTH',
    related: ['product', 'brand', 'sales', 'strategy'],
  },
  {
    id: 'technology',
    label: 'TECHNOLOGY',
    related: ['product', 'ai', 'operations'],
  },
  { id: 'ai', label: 'AI', related: ['technology', 'operations', 'strategy'] },
  {
    id: 'operations',
    label: 'OPERATIONS',
    related: ['sales', 'technology', 'ai'],
  },
  {
    id: 'strategy',
    label: 'STRATEGY',
    related: ['market', 'growth', 'product', 'ai'],
  },
];

export const strategicFramework = [
  { verb: 'UNDERSTAND.', noun: 'Business.' },
  { verb: 'POSITION.', noun: 'Brand.' },
  { verb: 'BUILD.', noun: 'Product.' },
  { verb: 'COMMUNICATE.', noun: 'Marketing.' },
  { verb: 'CONVERT.', noun: 'Sales.' },
  { verb: 'RETAIN.', noun: 'Customer.' },
  { verb: 'GROW.', noun: 'Business.' },
];

export const triangle = [
  { id: 'ai', label: 'AI', note: 'Speed + Intelligence' },
  { id: 'software', label: 'SOFTWARE', note: 'Execution + Systems' },
  { id: 'business', label: 'BUSINESS', note: 'Value + Growth' },
];

export const marqueeTopics = [
  'BUSINESS',
  'AI',
  'STARTUPS',
  'MARKETING',
  'BRANDING',
  'GROWTH',
  'SALES',
  'PRODUCT',
  'TECHNOLOGY',
  'ENTREPRENEURSHIP',
  'CLIENT SUCCESS',
  'AUTOMATION',
  'STRATEGY',
  'DIGITAL PRODUCTS',
];

export const businessPhilosophy = [
  'BUILD SOMETHING PEOPLE WANT.',
  'MAKE IT EASY TO UNDERSTAND.',
  'MAKE IT EASY TO EXPERIENCE.',
  'MAKE THE BUSINESS BETTER.',
];
