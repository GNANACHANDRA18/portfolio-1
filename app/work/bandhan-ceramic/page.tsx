import { notFound } from 'next/navigation';
import CaseStudy from '@/components/CaseStudy';
import SectionHead from '@/components/ai/SectionHead';
import MagneticButton from '@/components/MagneticButton';
import { getProject } from '@/data/projects';
import { pageMetadata } from '@/lib/seo';

const project = getProject('bandhan-ceramic');

export const metadata = pageMetadata({
  title: 'Bandhan Ceramic — Commerce Digital Product Experience',
  description:
    'Case study: Bandhan Ceramic, a 5,000+ product catalogue across 13 stores in Hyderabad — tile calculator, AR visualiser and architect trade pricing, built by Qyverix.',
  path: '/work/bandhan-ceramic',
  image: project?.image,
});

export default function BandhanCeramicPage() {
  if (!project) notFound();

  return (
    <>
      <CaseStudy
        project={project}
        labels={{
          strategy: 'Strategy',
          experience: 'The experience',
        }}
      />

      <section className="relative overflow-hidden border-t border-line py-24 md:py-32">
        <div className="container-x">
          <SectionHead
            lines={["LARGE CATALOGUE,", "TWO AUDIENCES?"]}
            accentLines={[1]}
            lede="Filtered discovery, trade pricing and decision tools built into browsing rather than bolted on."
            className="mb-12"
          />
          <div className="flex flex-wrap gap-3">
            <MagneticButton href={project.website} external variant="solid">
              Visit Bandhan Ceramic
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
