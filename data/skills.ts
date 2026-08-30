export type SkillGroup = {
  id: string;
  title: string;
  blurb: string;
  skills: string[];
};

/**
 * Deliberately no numeric proficiency scores — capability is described,
 * not invented as a percentage.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    blurb: 'AI as a working tool across building, research, content and delivery.',
    skills: [
      'AI-assisted development',
      'LLM applications',
      'AI tools',
      'AI workflows',
      'AI automation',
      'AI research',
      'AI content creation',
      'AI-powered applications',
    ],
  },
  {
    id: 'software',
    title: 'Software',
    blurb: 'Building and shipping digital products for real businesses.',
    skills: [
      'Web development',
      'Software development',
      'Frontend',
      'Backend',
      'APIs',
      'Databases',
      'Responsive design',
    ],
  },
  {
    id: 'marketing',
    title: 'Marketing',
    blurb: 'Turning a product into something the market notices.',
    skills: [
      'Digital marketing',
      'Brand strategy',
      'Content strategy',
      'LinkedIn',
      'Social media',
      'Business development',
    ],
  },
  {
    id: 'creative',
    title: 'Creative',
    blurb: 'Video, content and visual direction for digital communication.',
    skills: [
      'Video editing',
      'Content creation',
      'Creative direction',
      'Visual communication',
    ],
  },
  {
    id: 'business',
    title: 'Business',
    blurb: 'Owning the client relationship from first pitch to handoff.',
    skills: [
      'Client success',
      'Proposals',
      'Pricing',
      'Sales support',
      'Client communication',
      'Project handoff',
    ],
  },
];

export type TechGroup = { title: string; items: string[] };

export const techStack: TechGroup[] = [
  {
    title: 'Frontend',
    items: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'TypeScript'],
  },
  {
    title: 'Backend',
    items: [
      'APIs',
      'Server-side development',
      'Database systems',
      'Authentication',
    ],
  },
  {
    title: 'Development Tools',
    items: ['Git', 'GitHub', 'AI coding assistants', 'Developer tooling'],
  },
];
