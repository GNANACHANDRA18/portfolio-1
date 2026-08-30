export const site = {
  name: 'Chebolu Gnanachandra',
  shortName: 'Gnana Chandra',
  role: 'Software Developer · CMO · AI Practitioner',
  longRole:
    'Software Developer · CMO · AI Practitioner · Marketing · Brand · Client Success · Video Editor · Social Media Manager',
  positioning: 'SOFTWARE × AI × MARKETING × CREATIVITY',
  statement:
    'I build with technology, think with AI, create with purpose, and grow brands through marketing.',
  intro:
    'I build digital products, brands and AI-powered workflows at the intersection of technology, marketing and creativity.',
  secondary:
    'Software development. Artificial intelligence. Marketing. Social media. Video. Client success.',
  company: {
    name: 'Qyverix',
    url: 'https://qyverix.in',
    role: 'CMO · Marketing, Brand & Client Success',
  },
  instagram: {
    handle: '@gnanachandra.22',
    name: 'Gnana Chandra',
    url: 'https://instagram.com/gnanachandra.22',
  },
  phone: {
    display: '+91 91103 99735',
    tel: '+919110399735',
    whatsapp: 'https://wa.me/919110399735',
  },
  email: {
    display: 'gnanac22@gmail.com',
    href: 'mailto:gnanac22@gmail.com',
  },
  /**
   * Verified profiles only. Each one is a `sameAs` signal tying this site to
   * the same person — add LinkedIn, X or others here once they exist.
   */
  profiles: ['https://github.com/GNANACHANDRA18'],
  portrait: {
    src: '/images/gnana.webp',
    width: 576,
    height: 647,
    alt: 'Portrait of Chebolu Gnanachandra',
  },
  // Set NEXT_PUBLIC_SITE_URL in the deployment environment to the live domain.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gnanachandra.com',
  seo: {
    title:
      'Chebolu Gnanachandra (Gnana Chandra) — Software Developer, AI Practitioner & CMO',
    description:
      'Chebolu Gnana Chandra is a software developer, AI practitioner and CMO working across artificial intelligence, software, business, marketing, branding and creative technology.',
  },
} as const;

export type NavItem = {
  href: string;
  label: string;
  description: string;
  group: 'main' | 'practice' | 'profile';
};

export const navigation: NavItem[] = [
  { href: '/', label: 'Home', description: 'Start here', group: 'main' },
  {
    href: '/about',
    label: 'About',
    description: 'Who I am and how I work',
    group: 'main',
  },
  {
    href: '/work',
    label: 'Work',
    description: 'Selected projects and case studies',
    group: 'main',
  },
  {
    href: '/ai',
    label: 'AI',
    description: 'AI tools, automation and applications',
    group: 'practice',
  },
  {
    href: '/development',
    label: 'Development',
    description: 'Websites, products and web applications',
    group: 'practice',
  },
  {
    href: '/marketing',
    label: 'Marketing',
    description: 'CMO, brand and client success',
    group: 'practice',
  },
  {
    href: '/social-media',
    label: 'Social Media',
    description: 'Content, strategy and digital presence',
    group: 'practice',
  },
  {
    href: '/video-editing',
    label: 'Video Editing',
    description: 'Creative content and post-production',
    group: 'practice',
  },
  {
    href: '/experience',
    label: 'Experience',
    description: 'Roles and responsibilities',
    group: 'profile',
  },
  {
    href: '/skills',
    label: 'Skills',
    description: 'Capability matrix',
    group: 'profile',
  },
  {
    href: '/contact',
    label: 'Contact',
    description: 'Start a conversation',
    group: 'profile',
  },
];

/** Compact primary nav shown in the desktop header. */
export const primaryNav = navigation.filter((item) =>
  ['/about', '/ai', '/development', '/marketing', '/work'].includes(item.href),
);
