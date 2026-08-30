import { notFound } from 'next/navigation';
import CaseStudy from '@/components/CaseStudy';
import SectionHead from '@/components/ai/SectionHead';
import MagneticButton from '@/components/MagneticButton';
import { getProject } from '@/data/projects';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

const project = getProject('living-lines');

export const metadata = pageMetadata({
  title: 'Living Lines — Premium Retail Digital Experience',
  description:
    'Case study: Living Lines, a premium tiles and bathware retailer in Visakhapatnam — three showrooms, brand catalogue and design-consultation flows.',
  path: '/work/living-lines',
  image: project?.image,
});

export default function LivingLinesPage() {
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
              { name: 'Living Lines', path: '/work/living-lines' },
            ]),
          ),
        }}
      />

      <CaseStudy
        project={project}
        labels={{
          strategy: 'The digital experience',
          experience: 'Product discovery & consultation',
        }}
      />

      <section className="relative overflow-hidden border-t border-line py-24 md:py-32">
        <div className="container-x">
          <SectionHead
            lines={["BUILDING FOR A", "PREMIUM RETAIL BRAND?"]}
            accentLines={[1]}
            lede="Catalogue, showroom presence and a consultation route that actually converts."
            className="mb-12"
          />
          <div className="flex flex-wrap gap-3">
            <MagneticButton href={project.website} external variant="solid">
              Visit Living Lines
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
