export type Role = {
  id: string;
  org: string;
  title: string;
  summary: string;
  responsibilities: string[];
};

/** No dates are listed — none have been provided. */
export const roles: Role[] = [
  {
    id: 'cmo',
    org: 'Qyverix',
    title: 'CMO · Marketing, Brand & Client Success',
    summary:
      "I own Qyverix's external image and the end-to-end client experience — from the first pitch through to project handoff.",
    responsibilities: [
      'Marketing',
      'Brand',
      'Client Success',
      'Business Development',
      'Proposals',
      'Pricing brochures',
      'LinkedIn content',
      'Sales portfolio websites',
      'Client communication',
      'Project handoff',
    ],
  },
  {
    id: 'developer',
    org: 'Qyverix',
    title: 'Software Developer',
    summary:
      'Working across digital products and websites — building the things clients actually use.',
    responsibilities: [
      'Business and portfolio websites',
      'Web applications and digital products',
      'AI-powered application work',
      'Frontend and backend development',
      'Testing and deployment',
    ],
  },
  {
    id: 'creative',
    org: 'Qyverix',
    title: 'Creative / Video Editor',
    summary:
      'Working across digital content and video for brand, campaign and social output.',
    responsibilities: [
      'Video editing and post-production',
      'Short-form and social content',
      'Brand and promotional video',
      'Creative direction',
      'Content production',
    ],
  },
];

export const processSteps = [
  {
    step: 'Understand',
    detail: 'What the business actually needs, before anything gets built.',
  },
  { step: 'Research', detail: 'Market, competitors, audience, prior art.' },
  { step: 'Build', detail: 'Design and development, shipped in real increments.' },
  { step: 'Automate', detail: 'Systematise whatever repeats.' },
  { step: 'Launch', detail: 'Deploy, hand off, make it live properly.' },
  { step: 'Improve', detail: 'Watch it in the real world and refine.' },
];

export const marketingFlow = [
  'Lead',
  'Pitch',
  'Proposal',
  'Strategy',
  'Development',
  'Delivery',
  'Client Success',
];

export const devFlow = [
  'Idea',
  'Architecture',
  'UI',
  'Development',
  'Testing',
  'Deployment',
];

export const socialFlow = [
  'Research',
  'Strategy',
  'Content',
  'Edit',
  'Publish',
  'Analyze',
  'Improve',
];

export const videoFlow = [
  'Concept',
  'Script',
  'Assets',
  'Edit',
  'Motion',
  'Sound',
  'Export',
];
