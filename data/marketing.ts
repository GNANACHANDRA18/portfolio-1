import type { ConstellationNode } from '@/components/system/Constellation';

export const heroMorph = ['MARKETING', 'BRAND', 'CLIENT', 'GROWTH'];

export const cmoNodes: ConstellationNode[] = [
  {
    id: 'marketing',
    label: 'MARKETING',
    body: 'Positioning, content and campaigns that make the company legible.',
    chain: ['Research', 'Position', 'Create', 'Distribute'],
  },
  {
    id: 'brand',
    label: 'BRAND',
    body: 'Not only how it looks — how the business is experienced at every touchpoint.',
    chain: ['Voice', 'System', 'Consistency'],
  },
  {
    id: 'client',
    label: 'CLIENT SUCCESS',
    body: 'Clear communication from first conversation through delivery and handoff.',
    chain: ['Expectations', 'Updates', 'Handoff'],
  },
  {
    id: 'bizdev',
    label: 'BUSINESS DEV',
    body: 'Turning conversations into structured, scoped opportunities.',
    chain: ['Lead', 'Pitch', 'Proposal', 'Close'],
  },
  {
    id: 'content',
    label: 'CONTENT',
    body: 'One idea expressed properly in every format it needs to live in.',
    chain: ['Angle', 'Draft', 'Design', 'Publish'],
  },
  {
    id: 'products',
    label: 'DIGITAL PRODUCTS',
    body: 'Demo sites and digital experiences built as sales tools.',
    chain: ['Brief', 'Build', 'Demo'],
  },
];

export const clientJourney = [
  { step: 'LEAD', detail: 'Someone raises a hand.' },
  { step: 'DISCOVERY', detail: 'What the business actually needs.' },
  { step: 'PITCH', detail: 'The idea, made concrete.' },
  { step: 'PROPOSAL', detail: 'Scope, deliverables, timeline.' },
  { step: 'PRICING', detail: 'Value made easy to understand.' },
  { step: 'STRATEGY', detail: 'How it will be positioned.' },
  { step: 'BUILD', detail: 'The team makes it real.' },
  { step: 'REVIEW', detail: 'Client feedback, tightly held.' },
  { step: 'HANDOFF', detail: 'Everything transferred properly.' },
  { step: 'CLIENT SUCCESS', detail: 'The relationship after delivery.' },
];

export const proposalParts = [
  'PROJECT BRIEF',
  'PROPOSAL',
  'SCOPE',
  'PRICING',
  'TIMELINE',
  'DELIVERABLES',
];

export const pricingParts = [
  { label: 'SERVICE', note: 'What is being delivered' },
  { label: 'SCOPE', note: 'Where it starts and stops' },
  { label: 'VALUE', note: 'What it changes for the business' },
  { label: 'PRICING', note: 'Structured, not improvised' },
  { label: 'NEXT STEP', note: 'One obvious action' },
];

export const brandTouchpoints = [
  'Logo',
  'Typography',
  'Color',
  'Website',
  'Social',
  'Proposal',
  'Presentation',
  'Communication',
];

export const contentFormats = [
  'LINKEDIN',
  'INSTAGRAM',
  'VIDEO',
  'WEBSITE',
  'PRESENTATION',
  'SALES MATERIAL',
];





export const createdArtefacts = [
  {
    label: 'PROPOSALS',
    note: 'Scope, deliverables and timeline in a form a client can decide on.',
  },
  {
    label: 'PRICING BROCHURES',
    note: 'Value laid out so the number is never the first thing read.',
  },
  {
    label: 'LINKEDIN CONTENT',
    note: 'The company voice, published consistently.',
  },
  {
    label: 'DEMO WEBSITES',
    note: 'Working digital experiences built to sell the idea.',
  },
  { label: 'BRAND MATERIAL', note: 'The system everything else is built from.' },
  { label: 'SALES ASSETS', note: 'What the conversation needs in the room.' },
  {
    label: 'CLIENT EXPERIENCES',
    note: 'The whole journey, from first hello to handoff.',
  },
];

export const cmoMindset = [
  { n: '01', title: 'UNDERSTAND THE BUSINESS.' },
  { n: '02', title: 'UNDERSTAND THE CUSTOMER.' },
  { n: '03', title: 'MAKE THE VALUE CLEAR.' },
  { n: '04', title: 'BUILD THE EXPERIENCE.' },
  { n: '05', title: 'DELIVER THE PROMISE.' },
];

export const marketingLab = [
  {
    id: 'campaign',
    label: 'CAMPAIGN',
    flow: ['Objective', 'Audience', 'Message', 'Channels', 'Review'],
  },
  {
    id: 'content',
    label: 'CONTENT',
    flow: ['Angle', 'Draft', 'Design', 'Publish', 'Learn'],
  },
  {
    id: 'brand',
    label: 'BRAND',
    flow: ['Audit', 'Position', 'System', 'Rollout'],
  },
  {
    id: 'proposal',
    label: 'PROPOSAL',
    flow: ['Brief', 'Scope', 'Pricing', 'Send', 'Follow-up'],
  },
  {
    id: 'sales',
    label: 'SALES',
    flow: ['Lead', 'Qualify', 'Pitch', 'Close'],
  },
  {
    id: 'client',
    label: 'CLIENT',
    flow: ['Onboard', 'Communicate', 'Deliver', 'Handoff'],
  },
];

export const attentionMetrics = [
  { label: 'CLARITY', note: 'Can someone explain it back to you?' },
  { label: 'ENGAGEMENT', note: 'Does the right audience respond at all?' },
  { label: 'CONVERSION', note: 'Does interest become a conversation?' },
  { label: 'CLIENT EXPERIENCE', note: 'How the work felt to receive.' },
  { label: 'BRAND CONSISTENCY', note: 'Does every touchpoint agree?' },
  { label: 'BUSINESS VALUE', note: 'Did it move something that matters?' },
];
