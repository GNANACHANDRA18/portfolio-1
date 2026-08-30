import WorkHero from '@/components/work/WorkHero';
import ProjectShowcase from '@/components/work/ProjectShowcase';
import BehindTheWork from '@/components/work/BehindTheWork';
import ProjectIndex from '@/components/work/ProjectIndex';
import SectionHead from '@/components/ai/SectionHead';
import FlowStrip from '@/components/FlowStrip';
import MagneticButton from '@/components/MagneticButton';
import Reveal from '@/components/Reveal';
import { site } from '@/data/site';
import { pageMetadata } from '@/lib/seo';

const QYVERIX_FLOW = [
  'Client',
  'Discovery',
  'Proposal',
  'Design',
  'Development',
  'Launch',
  'Client Success',
];

export const metadata = pageMetadata({
  title: 'Selected Work',
  description:
    'Selected digital experiences built through Qyverix — Living Lines, Bandhan Ceramic and Om Sri Balaji Electricals, across retail and commerce.',
  path: '/work',
});

export default function WorkPage() {
  return (
    <>
      <WorkHero />

      <ProjectShowcase />

      {/* Behind the work */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            eyebrow="Case studies"
            lines={['BEHIND', 'THE WORK.']}
            accentLines={[1]}
            lede="What the brief was, what made it hard, and what the digital experience actually does."
            className="mb-14"
          />
          <BehindTheWork />
        </div>
      </section>

      {/* Qyverix */}
      <section className="relative overflow-hidden bg-elev/60 py-24 md:py-36">
        <div aria-hidden className="ai-grid pointer-events-none absolute inset-0" />
        <div className="container-x relative">
          <SectionHead
            eyebrow="Built at Qyverix"
            lines={['FROM PITCH', 'TO DIGITAL PRODUCT.']}
            accentLines={[1]}
            lede="Every one of these projects moves through the same sequence. I carry the client relationship across all of it."
            className="mb-14"
          />

          <FlowStrip steps={QYVERIX_FLOW} />

          <Reveal className="mt-12">
            <div className="glass inline-flex flex-col gap-1 rounded-2xl p-7">
              <p className="text-[20px] tracking-tight text-fg">
                {site.shortName}
              </p>
              <p className="font-mono text-[11px] tracking-[0.14em] text-accent uppercase">
                CMO · Marketing, Brand &amp; Client Success
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Index */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            eyebrow="Index"
            lines={['EVERY PROJECT,', 'ONE LIST.']}
            accentLines={[1]}
            className="mb-12"
          />
          <ProjectIndex />
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-28 md:py-40">
        <div className="container-x">
          <SectionHead
            lines={['HAVE A PROJECT', 'IN MIND?']}
            accentLines={[1]}
            lede="Let's turn the idea into something people can experience."
            className="mb-12"
          />
          <div className="flex flex-wrap gap-3">
            <MagneticButton href="/contact" variant="solid">
              Start a conversation
            </MagneticButton>
            <MagneticButton href="/about" variant="outline">
              About Gnana
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
