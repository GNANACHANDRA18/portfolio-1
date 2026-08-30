export type ProjectCategory = 'Retail' | 'Commerce' | 'Web' | 'Digital Experience';

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  /** Large editorial statement used on the work page. */
  statement: string[];
  categories: ProjectCategory[];
  industry: string;
  year: string;
  location: string;
  builtBy: string;
  website: string;
  caseStudy: string;
  image: string;
  facts: { label: string; value: string }[];
  features: string[];
  overview: string;
  challenge: string;
  strategy: string;
  experience: string;
  outcome: string;
  contribution: string[];
  cta: string;
};

export const projects: Project[] = [
  {
    slug: 'living-lines',
    name: 'Living Lines',
    tagline: 'Premium Retail Digital Experience',
    summary:
      'Premium tiles, bathware and architectural surfaces — three showrooms, brand catalogue and design-consultation flows.',
    statement: ['PREMIUM SURFACES.', 'THREE SHOWROOMS.'],
    categories: ['Retail', 'Web', 'Digital Experience'],
    industry: 'Retail',
    year: '2026',
    location: 'Visakhapatnam',
    builtBy: 'Qyverix',
    website: 'https://livinglines.in/',
    caseStudy: 'https://qyverix.in/work/livinglines',
    image: 'https://qyverix.in/assets/portfolio/livinglines.webp',
    facts: [
      { label: 'Industry', value: 'Retail' },
      { label: 'Year', value: '2026' },
      { label: 'Location', value: 'Visakhapatnam' },
      { label: 'Built by', value: 'Qyverix' },
    ],
    features: [
      'Product catalogue',
      'Showroom information',
      'Design consultation',
      'Product discovery',
      'Responsive experience',
    ],
    overview:
      'Living Lines is a premium tiles, bathware and architectural surfaces retailer operating three showrooms in Visakhapatnam. The digital experience was built by Qyverix to carry the same considered, material-led feeling customers get in the showrooms into a browser.',
    challenge:
      'Surfaces are a tactile, high-consideration purchase. Customers arrive already deep in a home or project decision, and a catalogue alone does not help them — they need to understand ranges, see finishes in context, know which showroom holds what, and reach a design consultation without friction.',
    strategy:
      'The approach was to treat the website as a pre-showroom visit rather than a brochure: lead with imagery at architectural scale, structure the catalogue the way a designer browses rather than the way a warehouse is organised, and keep the consultation route visible at every depth of the site.',
    experience:
      'Large-format visuals, a calm neutral palette and generous spacing let the products carry the page. Catalogue browsing, showroom detail and consultation enquiry sit close together so a visitor can move from discovery to conversation in a few steps, on any screen size.',
    outcome:
      'The result is a brand-first retail experience that presents the range, the three showrooms and the design-consultation service as one coherent journey. Business performance figures are not published here.',
    contribution: [
      'Client-facing communication and requirement gathering through the engagement',
      'Brand positioning and messaging direction for how the range is presented',
      'Marketing and content input across the catalogue and consultation flows',
      'Coordination between the client and the Qyverix delivery team, through to handoff',
    ],
    cta: 'Visit Living Lines',
  },
  {
    slug: 'bandhan-ceramic',
    name: 'Bandhan Ceramic',
    tagline: 'Commerce · Digital Product Experience',
    summary:
      '5,000+ product catalogue across 13 stores — tile calculator, AR visualiser and architect trade pricing.',
    statement: ['5,000+ PRODUCTS.', 'ONE DIGITAL EXPERIENCE.'],
    categories: ['Commerce', 'Web', 'Digital Experience'],
    industry: 'Commerce',
    year: '2026',
    location: 'Hyderabad',
    builtBy: 'Qyverix',
    website: 'https://bandhanceramic.com/',
    caseStudy: 'https://qyverix.in/work/bandhan',
    image: 'https://qyverix.in/assets/portfolio/bandhan.webp',
    facts: [
      { label: 'Catalogue', value: '5,000+ products' },
      { label: 'Stores', value: '13' },
      { label: 'Year', value: '2026' },
      { label: 'Location', value: 'Hyderabad' },
    ],
    features: [
      'Product catalogue',
      'Tile calculator',
      'AR visualiser',
      'Architect trade pricing',
      'Product discovery',
    ],
    overview:
      'Bandhan Ceramic runs a catalogue of more than 5,000 products across 13 stores in Hyderabad, serving both retail customers and trade buyers. Qyverix built the digital product experience that holds that catalogue together.',
    challenge:
      'Scale was the whole problem. Five thousand products across thirteen locations breaks ordinary catalogue navigation, and two very different audiences — a homeowner choosing a floor and an architect specifying for a project — need different pricing, different depth and different tools from the same inventory.',
    strategy:
      'Separate the audiences without splitting the site: one catalogue, filtered browsing that narrows a large range quickly, and a trade layer that surfaces architect pricing to the people entitled to it. Add practical decision tools instead of more marketing copy.',
    experience:
      'Product discovery is filter-first and fast, so a large catalogue stays navigable. A tile calculator turns room dimensions into a quantity a customer can act on, and an AR visualiser lets a product be previewed in a real space before a store visit.',
    outcome:
      'A commerce experience that makes a very large catalogue usable for retail and trade audiences at the same time, with decision tools built into browsing rather than bolted on. Business performance figures are not published here.',
    contribution: [
      'Client requirements, scoping conversations and expectation setting',
      'Positioning of the trade and retail audiences in the brand and content approach',
      'Marketing and sales-side input on how the catalogue and tools are presented',
      'Ongoing client communication through delivery and handoff',
    ],
    cta: 'Visit Bandhan Ceramic',
  },
  {
    slug: 'om-sri-balaji',
    name: 'Om Sri Balaji Electricals',
    tagline: 'Retail Digital Experience',
    summary:
      'Electricals and sanitaryware since 1962 — authorised brand catalogue, trade pricing and WhatsApp enquiry flows.',
    statement: ['A BUSINESS', 'WITH HISTORY.', 'A DIGITAL FUTURE.'],
    categories: ['Retail', 'Web'],
    industry: 'Retail',
    year: '2026',
    location: 'Ongole',
    builtBy: 'Qyverix',
    website: 'https://omsribalajielectrical.in/',
    caseStudy: 'https://qyverix.in/work/omsribalaji',
    image: 'https://qyverix.in/assets/portfolio/omsribalaji.webp',
    facts: [
      { label: 'Established', value: 'Since 1962' },
      { label: 'Industry', value: 'Retail' },
      { label: 'Year', value: '2026' },
      { label: 'Location', value: 'Ongole' },
    ],
    features: [
      'Brand catalogue',
      'Electrical products',
      'Sanitaryware',
      'Trade pricing',
      'WhatsApp enquiry flows',
    ],
    overview:
      'Om Sri Balaji Electricals has traded in electricals and sanitaryware in Ongole since 1962. Qyverix built a digital experience that carries six decades of local trust into a modern retail website.',
    challenge:
      'A business with this much history has a reputation built entirely offline. The site had to make an established name legible to customers who now start every purchase on a phone, present authorised brands credibly, and keep enquiry as easy as walking into the shop.',
    strategy:
      'Lead with authority — years in trade, authorised brands, range breadth — then remove every step between interest and conversation. Enquiry routes through WhatsApp because that is where this customer base already talks to the business.',
    experience:
      'The catalogue is organised by brand and category across electricals and sanitaryware, with trade pricing surfaced for professional buyers. WhatsApp enquiry flows sit alongside products so a question becomes a conversation immediately, on mobile, without a form.',
    outcome:
      'A retail experience that presents an established local business with the credibility it has earned, and converts interest into direct conversation through the channel its customers already use. Business performance figures are not published here.',
    contribution: [
      'Client communication and requirement capture from first pitch onward',
      'Brand positioning around the heritage of the business and its authorised brands',
      'Marketing input on the enquiry journey and how trade buyers are addressed',
      'Delivery coordination and client handoff',
    ],
    cta: 'Visit Website',
  },
];

export const projectFilters: ('All' | ProjectCategory)[] = [
  'All',
  'Retail',
  'Commerce',
  'Web',
  'Digital Experience',
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
