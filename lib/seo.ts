import type { Metadata } from 'next';
import { site } from '@/data/site';

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

/** Builds unique, canonical-tagged metadata for a single page. */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: PageMetaInput): Metadata {
  const url = `${site.url}${path === '/' ? '' : path}`;
  const shareImage = image ?? `${site.url}${site.portrait.src}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.seo.title,
      type: 'website',
      locale: 'en_IN',
      images: [{ url: shareImage, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [shareImage],
    },
  };
}

/** Person structured data, injected once in the root layout. */
export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  description: site.seo.description,
  jobTitle: ['Software Developer', 'CMO', 'AI Practitioner'],
  image: `${site.url}${site.portrait.src}`,
  telephone: site.phone.tel,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: site.phone.tel,
    contactType: 'business',
    areaServed: 'IN',
    availableLanguage: ['en'],
  },
  worksFor: {
    '@type': 'Organization',
    name: site.company.name,
    url: site.company.url,
  },
  sameAs: [site.instagram.url],
  knowsAbout: [
    'Software Development',
    'Artificial Intelligence',
    'AI Workflows',
    'Marketing',
    'Brand Strategy',
    'Social Media',
    'Video Editing',
    'Client Success',
  ],
};
