import SectionHead from '@/components/ai/SectionHead';
import Aurora from '@/components/ai/Aurora';
import ParallelRoles from '@/components/experience/ParallelRoles';
import ProcessRail from '@/components/ProcessRail';
import FactStrip from '@/components/FactStrip';
import Marquee from '@/components/Marquee';
import MagneticButton from '@/components/MagneticButton';
import Reveal from '@/components/Reveal';
import { processSteps, roles } from '@/data/experience';
import { site } from '@/data/site';
import { pageMetadata } from '@/lib/seo';
import PlateBackdrop from '@/components/media/PlateBackdrop';
import { routePlate } from '@/data/visuals';

export const metadata = pageMetadata({
  title: 'Experience',
  description:
    'Experience of Gnana Chandra — CMO for marketing, brand and client success at Qyverix, software developer, and creative video editor.',
  path: '/experience',
});

export default function ExperiencePage() {
  return (
    <>
      <section className="ai-noise relative flex min-h-[78svh] items-center overflow-hidden pt-32 pb-16 md:pt-36">
        <PlateBackdrop src={routePlate.marketingFlywheel} treatment="backdrop" priority />
        <Aurora
          blobs={[
            {
              color:
                'radial-gradient(circle, rgba(47,91,255,0.26), rgba(47,91,255,0) 70%)',
              className:
                'left-[-12%] top-[4%] h-[46vw] w-[46vw] min-h-[300px] min-w-[300px]',
              anim: 'aurora-a',
            },
            {
              color:
                'radial-gradient(circle, rgba(229,57,155,0.22), rgba(229,57,155,0) 70%)',
              className:
                'right-[-10%] bottom-[2%] h-[40vw] w-[40vw] min-h-[280px] min-w-[280px]',
              anim: 'aurora-b',
            },
          ]}
        />

        <div className="container-x relative z-10 w-full">
          <p className="mb-9 font-mono text-[10.5px] tracking-[0.26em] text-faint uppercase">
            Experience
          </p>
          <SectionHead
            lines={['THREE ROLES.', 'RUNNING IN', 'PARALLEL.']}
            as="h1"
            accentLines={[2]}
            lede="Not a sequence of jobs — three responsibilities held at the same time, which is the point."
          />

          <FactStrip
            className="mt-14"
            facts={[
              { label: 'Roles held', value: String(roles.length) },
              {
                label: 'Responsibilities',
                value: String(
                  roles.reduce((n, role) => n + role.responsibilities.length, 0),
                ),
              },
              { label: 'Company', value: site.company.name },
              { label: 'Running', value: 'In parallel' },
            ]}
          />
        </div>
      </section>

      <section className="relative overflow-hidden pb-24 md:pb-36">
        <div className="container-x">
          <ParallelRoles roles={roles} />
        </div>
      </section>

      {/* How the work actually runs — the method under all three lanes. */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            eyebrow="Method"
            lines={['HOW A PIECE', 'OF WORK RUNS.']}
            accentLines={[1]}
            lede="The same six steps whichever lane the work arrives in."
            className="mb-16"
          />
          <ProcessRail steps={processSteps} />
        </div>
      </section>

      <section className="relative overflow-hidden bg-elev/60 py-24 md:py-36">
        <div aria-hidden className="ai-grid pointer-events-none absolute inset-0" />
        <div className="container-x relative">
          <SectionHead
            eyebrow="Why it overlaps"
            lines={['ONE PERSON ACROSS', 'THE WHOLE DELIVERY.']}
            accentLines={[1]}
            className="mb-10"
          />
          <Reveal className="max-w-3xl">
            <p className="text-[17px] leading-relaxed text-muted md:text-[19px]">
              Marketing decisions change what gets built. What gets built
              changes what can honestly be marketed. Holding both — plus the
              creative output around them — means fewer translation layers
              between what a client asked for and what they receive.
            </p>
            <p className="mt-6 font-mono text-[10.5px] tracking-[0.16em] text-faint uppercase">
              Roles are listed without dates, as none have been published here.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-line py-14">
        <Marquee
          items={roles.flatMap((role) => role.responsibilities)}
          label="Everything these roles cover:"
          speed={52}
        />
      </section>

      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            lines={['WANT THE', 'CAPABILITY DETAIL?']}
            accentLines={[1]}
            lede={`The capability map breaks this down across AI, software, marketing, creative and business. Currently ${site.company.role} at ${site.company.name}.`}
            className="mb-12"
          />
          <div className="flex flex-wrap gap-3">
            <MagneticButton href="/skills" variant="solid">
              View capabilities
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
