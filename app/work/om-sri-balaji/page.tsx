import { notFound } from 'next/navigation';
import CaseStudy from '@/components/CaseStudy';
import SectionHead from '@/components/ai/SectionHead';
import MagneticButton from '@/components/MagneticButton';
import { getProject } from '@/data/projects';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

const project = getProject('om-sri-balaji');

export const metadata = pageMetadata({
  title: 'Om Sri Balaji Electricals — Retail Digital Experience',
  description:
    'Case study: Om Sri Balaji Electricals, trading in Ongole since 1962 — authorised brand catalogue, trade pricing and WhatsApp enquiry flows.',
  path: '/work/om-sri-balaji',
  image: project?.image,
});

export default function OmSriBalajiPage() {
  if (!project) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        // Static, author-controlled structured data.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Work', path: '/work' },
              { name: 'Om Sri Balaji Electricals', path: '/work/om-sri-balaji' },
            ]),
          ),
        }}
      />

      <CaseStudy
        project={project}
        labels={{
          strategy: 'Digital strategy',
          experience: 'The website',
        }}
      />

      <section className="relative overflow-hidden border-t border-line py-24 md:py-32">
        <div className="container-x">
          <SectionHead
            lines={["ESTABLISHED BUSINESS,", "NO DIGITAL PRESENCE?"]}
            accentLines={[1]}
            lede="Six decades of trust is an asset. It just has to be legible on a phone."
            className="mb-12"
          />
          <div className="flex flex-wrap gap-3">
            <MagneticButton href={project.website} external variant="solid">
              Visit Website
            </MagneticButton>
            <MagneticButton href="/contact" variant="outline">
              Start a conversation
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
