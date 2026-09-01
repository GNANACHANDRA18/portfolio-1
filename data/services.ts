export type Service = {
  href: string;
  index: string;
  title: string;
  blurb: string;
  tags: string[];
};

/** The five practice areas, surfaced on the home page. */
export const services: Service[] = [
  {
    href: '/ai',
    index: '01',
    title: 'Artificial Intelligence',
    blurb:
      'AI as a practical instrument — assisted development, research, content, automation and AI-powered applications.',
    tags: ['AI workflows', 'LLM applications', 'Automation'],
  },
  {
    href: '/development',
    index: '02',
    title: 'Software Development',
    blurb:
      'Business websites, web applications, digital products and client-facing platforms, built to ship.',
    tags: ['Next.js', 'TypeScript', 'APIs'],
  },
  {
    href: '/marketing',
    index: '03',
    title: 'Marketing & CMO',
    blurb:
      "Brand positioning, proposals, pricing and client success — owning a company's external image end to end.",
    tags: ['Brand', 'Proposals', 'Client success'],
  },
  {
    href: '/social-media',
    index: '04',
    title: 'Social Media',
    blurb:
      'Content strategy, planning and production across LinkedIn and Instagram, built as a repeatable system.',
    tags: ['Strategy', 'Content', 'LinkedIn'],
  },
  {
    href: '/video-editing',
    index: '05',
    title: 'Video Editing',
    blurb:
      'Editing and creative content for social, campaigns and brand storytelling — concept through export.',
    tags: ['Short-form', 'Motion', 'Brand video'],
  },
];



export const socialCapabilities = [
  'Social media management',
  'Content planning',
  'Content creation',
  'Brand communication',
  'LinkedIn content',
  'Instagram content',
  'Digital presence',
  'Audience engagement',
  'Content strategy',
];

export const videoWork = [
  'Social media videos',
  'Promotional videos',
  'Brand videos',
  'Short-form content',
  'Reels',
  'Marketing videos',
];

export const disciplines = [
  'Software development',
  'Artificial intelligence',
  'Marketing',
  'Branding',
  'Social media',
  'Video editing',
  'Client success',
  'Business development',
];

export const projectTypes = [
  'Website',
  'Software',
  'AI Application',
  'Marketing',
  'Social Media',
  'Video Editing',
  'Branding',
  'Other',
];

/** Optional qualifiers on the contact form. Free-form ranges, not a price list. */
export const budgetRanges = [
  'Not sure yet',
  'Under 50k',
  '50k - 1.5L',
  '1.5L - 5L',
  '5L+',
];

export const timelines = [
  'Not sure yet',
  'As soon as possible',
  '2-4 weeks',
  '1-3 months',
  '3 months or more',
];
