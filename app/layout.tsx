import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import RouteIntro from '@/components/RouteIntro';
import AnimatedCursor from '@/components/AnimatedCursor';
import Loader from '@/components/Loader';
import SurfaceShell from '@/components/SurfaceShell';
import AmbientBackground from '@/components/AmbientBackground';
import { site } from '@/data/site';
import { personJsonLd } from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-jb',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.seo.title,
    template: '%s · Gnana Chandra',
  },
  description: site.seo.description,
  applicationName: site.seo.title,
  authors: [{ name: site.name }],
  creator: site.name,
  keywords: [
    'Gnana Chandra',
    'Gnanachandra',
    'Chebolu Gnanachandra',
    'Chebolu Gnana Chandra',
    'Gnana Chandra portfolio',
    'Gnana Chandra developer',
    'software developer',
    'CMO',
    'AI practitioner',
    'AI workflows',
    'marketing',
    'brand strategy',
    'social media',
    'video editing',
    'Qyverix',
  ],
  alternates: { canonical: '/' },
  // Served from /public rather than the app/ file convention: Next's metadata
  // route loader cannot handle the apostrophe in this project's folder name.
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: ['/icon.svg'],
    apple: [{ url: '/icon.svg' }],
  },
  // Set GOOGLE_SITE_VERIFICATION to the token Search Console gives you.
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
  openGraph: {
    title: site.seo.title,
    description: site.seo.description,
    url: site.url,
    siteName: site.seo.title,
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: site.portrait.src,
        width: site.portrait.width,
        height: site.portrait.height,
        alt: site.portrait.alt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.seo.title,
    description: site.seo.description,
    images: [site.portrait.src],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export const viewport: Viewport = {
  themeColor: '#050505',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="grain antialiased">
        <script
          type="application/ld+json"
          // Static, author-controlled structured data.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-bg"
        >
          Skip to content
        </a>
        <Loader />
        <RouteIntro />
        <AnimatedCursor />
        <SurfaceShell>
          <AmbientBackground />
          <Navbar />
          <main id="main" className="relative z-10 min-h-screen">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </SurfaceShell>
      </body>
    </html>
  );
}
