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

/**
 * Structured data injected once in the root layout.
 *
 * Three linked nodes: the Person (the entity a name search is looking for),
 * the WebSite that represents it, and a ProfilePage wrapper. `alternateName`
 * carries every spelling of the name people actually type, which is what lets
 * a search engine tie "gnanachandra", "gnana chandra" and "chebolu
 * gnanachandra" to the same entity.
 */
const personId = `${site.url}/#person`;
const siteId = `${site.url}/#website`;

export const personJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': personId,
      name: site.name,
      alternateName: [
        'Gnana Chandra',
        'Gnanachandra',
        'Chebolu Gnanachandra',
        'Chebolu Gnana Chandra',
        'Gnana Chandra Chebolu',
      ],
      givenName: 'Gnanachandra',
      familyName: 'Chebolu',
      url: site.url,
      mainEntityOfPage: site.url,
      description: site.seo.description,
      jobTitle: ['Software Developer', 'AI Practitioner', 'CMO'],
      image: `${site.url}${site.portrait.src}`,
      telephone: site.phone.tel,
      email: site.email.display,
      nationality: { '@type': 'Country', name: 'India' },
      address: { '@type': 'PostalAddress', addressCountry: 'IN' },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: site.phone.tel,
        email: site.email.display,
        contactType: 'business',
        areaServed: 'IN',
        availableLanguage: ['en'],
      },
      worksFor: {
        '@type': 'Organization',
        name: site.company.name,
        url: site.company.url,
      },
      sameAs: [site.instagram.url, site.company.url, ...site.profiles],
      knowsAbout: [
        'Software Development',
        'Artificial Intelligence',
        'AI Workflows',
        'Marketing',
        'Brand Strategy',
        'Business Development',
        'Client Success',
        'Social Media',
        'Video Editing',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': siteId,
      url: site.url,
      name: site.seo.title,
      alternateName: ['Gnana Chandra', 'Gnanachandra Portfolio'],
      description: site.seo.description,
      inLanguage: 'en',
      publisher: { '@id': personId },
      about: { '@id': personId },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${site.url}/#profile`,
      url: site.url,
      name: site.seo.title,
      isPartOf: { '@id': siteId },
      about: { '@id': personId },
      mainEntity: { '@id': personId },
    },
  ],
};
