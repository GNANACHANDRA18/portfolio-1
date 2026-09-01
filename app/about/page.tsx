import Link from 'next/link';
import AboutHero from '@/components/about/AboutHero';
import AboutStory from '@/components/about/AboutStory';
import Intersection from '@/components/about/Intersection';
import Principles from '@/components/about/Principles';
import DoMenu from '@/components/about/DoMenu';
import CreativeReel from '@/components/about/CreativeReel';
import ToolHalfLife from '@/components/about/ToolHalfLife';
import GlassSignature from '@/components/about/GlassSignature';
import WorkingModel from '@/components/about/WorkingModel';
import DigitalIdCard from '@/components/about/DigitalIdCard';
import PlateBackdrop from '@/components/media/PlateBackdrop';
import Constellation from '@/components/system/Constellation';
import ScrollSequence from '@/components/system/ScrollSequence';
import BehindTheWork from '@/components/work/BehindTheWork';
import SectionHead from '@/components/ai/SectionHead';
import AIOrb from '@/components/ai/AIOrb';
import Aurora from '@/components/ai/Aurora';
import FlowStrip from '@/components/FlowStrip';
import MagneticButton from '@/components/MagneticButton';
import Reveal from '@/components/Reveal';
import ChipCloud from '@/components/ChipCloud';
import {
  aboutPhilosophy,
  aiLoop,
  qyverixFlow,
  qyverixResponsibilities,
  roleNodes,
} from '@/data/about';
import { site } from '@/data/site';
import { pageMetadata } from '@/lib/seo';
import Marquee from '@/components/Marquee';
import { routePlate } from '@/data/visuals';

export const metadata = pageMetadata({
  title: 'About',
  description:
    'Gnana Chandra is a software developer, CMO and AI practitioner working where technology, business, marketing and creativity meet — and how he works.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <AboutHero />

      {/* Identity */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            eyebrow="Identity"
            lines={['ONE PERSON.', 'EIGHT ROLES.']}
            accentLines={[1]}
            lede="They are not separate jobs — each one makes the others work better."
            align="center"
            className="mb-16"
          />
          <Constellation
            core="GNANA"
            coreNote="THE OVERLAP"
            nodes={roleNodes}
            idleHint="Hover a role to see what it actually means."
          />
        </div>

        {/* The same eight roles, moving — full-bleed, outside the container. */}
        <div className="mt-16 border-y border-line py-8">
          <Marquee
            items={roleNodes.map((node) => node.label)}
            label="The roles:"
            speed={38}
          />
        </div>
      </section>

      <AboutStory />
      <Intersection />
      <Principles />

      {/* AI */}
      <section className="ai-noise relative overflow-hidden py-28 md:py-40">
        <Aurora
          blobs={[
            {
              color:
                'radial-gradient(circle, rgba(124,58,237,0.34), rgba(124,58,237,0) 70%)',
              className:
                'right-[-8%] top-[4%] h-[44vw] w-[44vw] min-h-[300px] min-w-[300px]',
              anim: 'aurora-b',
            },
            {
              color:
                'radial-gradient(circle, rgba(47,91,255,0.28), rgba(47,91,255,0) 70%)',
              className:
                'left-[-8%] bottom-[-4%] h-[40vw] w-[40vw] min-h-[280px] min-w-[280px]',
              anim: 'aurora-a',
            },
          ]}
        />

        <div className="container-x relative">
          <div className="grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16">
            <div>
              <SectionHead
                eyebrow="Artificial intelligence"
                lines={['AI CHANGED', 'HOW I WORK.']}
                accentLines={[1]}
                lede="I use AI across development, research, marketing, creative work and workflow design — while keeping human judgment at the centre."
                className="mb-10"
              />

              <FlowStrip steps={aiLoop} />

              <div className="mt-10">
                <MagneticButton href="/ai" variant="solid">
                  Explore my AI approach
                </MagneticButton>
              </div>
            </div>

            <Link
              href="/ai"
              aria-label="Explore the AI approach"
              data-cursor="orb"
              className="relative block aspect-square w-full max-w-[460px] justify-self-center"
            >
              <AIOrb />
            </Link>
          </div>
        </div>
      </section>

      {/* Qyverix */}
      <section className="relative overflow-hidden bg-elev/60 py-24 md:py-36">
        <div aria-hidden className="ai-grid pointer-events-none absolute inset-0" />
        <div className="container-x relative">
          <SectionHead
            eyebrow="Current role / Qyverix"
            lines={['CMO', 'MARKETING, BRAND', '& CLIENT SUCCESS.']}
            accentLines={[2]}
            lede="I own Qyverix's external image and end-to-end client experience."
            className="mb-14"
          />

          <FlowStrip steps={qyverixFlow} />

          <Reveal className="mt-14">
            <p className="max-w-4xl text-[clamp(1.5rem,4.2vw,3.2rem)] leading-[1.08] font-medium tracking-[-0.04em] text-fg">
              Single point of contact
              <br />
              <span className="ai-spectrum">from pitch to handoff.</span>
            </p>
          </Reveal>

          <Reveal className="mt-12">
            <p className="mb-5 font-mono text-[11px] tracking-[0.2em] text-faint uppercase">
              Responsibilities
            </p>
            <ChipCloud items={qyverixResponsibilities} />
          </Reveal>

          <div className="mt-12">
            <MagneticButton href="/marketing" variant="outline">
              Explore my marketing role
            </MagneticButton>
          </div>
        </div>
      </section>

      <DoMenu />

      {/* Build / care — the two halves of the same job, read as one section. */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <PlateBackdrop src={routePlate.developmentStack} drift duration={34} />
        <div className="container-x relative">
          <SectionHead
            eyebrow="Software & marketing"
            lines={['BUILDING IT', 'IS ONLY HALF', 'THE WORK.']}
            accentLines={[2]}
            lede="Websites, digital products and software experiences that solve practical business problems — and then the part most builders skip."
            className="mb-14"
          />

          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
            <div className="bg-surface/70 p-8 md:p-11">
              <p className="mb-7 font-mono text-[10.5px] tracking-[0.2em] text-faint uppercase">
                First half / build
              </p>
              <FlowStrip steps={['IDEA', 'SYSTEM', 'INTERFACE', 'CODE', 'PRODUCT']} />
              <div className="mt-9">
                <MagneticButton href="/development" variant="outline">
                  View development
                </MagneticButton>
              </div>
            </div>

            <div className="bg-surface/70 p-8 md:p-11">
              <p className="mb-7 font-mono text-[10.5px] tracking-[0.2em] text-accent uppercase">
                Second half / care
              </p>
              <Reveal>
                <p className="ai-spectrum text-[clamp(1.5rem,4vw,3rem)] leading-[0.98] font-medium tracking-[-0.05em]">
                  PEOPLE NEED
                  <br />
                  TO CARE.
                </p>
                <p className="mt-7 max-w-md text-[16px] leading-relaxed text-muted">
                  A product nobody understands is indistinguishable from one that
                  was never shipped. Positioning, content and communication are
                  part of the build, not a phase after it.
                </p>
                <div className="mt-9">
                  <MagneticButton href="/marketing" variant="outline">
                    Explore marketing
                  </MagneticButton>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Creative */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            eyebrow="Creative"
            lines={['SOMETIMES THE BEST WAY', 'TO EXPLAIN AN IDEA', 'IS TO SHOW IT.']}
            accentLines={[2]}
            className="mb-14"
          />

          <CreativeReel />
        </div>
      </section>

      {/* Projects */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            eyebrow="Shipped"
            lines={['IDEAS ARE BETTER', 'WHEN THEY SHIP.']}
            accentLines={[1]}
            className="mb-14"
          />
          <BehindTheWork />
          <div className="mt-12">
            <MagneticButton href="/work" variant="outline">
              See selected work
            </MagneticButton>
          </div>
        </div>
      </section>

      <WorkingModel />

      {/* Tools vs thinking */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            lines={['TOOLS CHANGE.', 'THINKING MATTERS.']}
            accentLines={[1]}
            className="mb-14"
          />

          <ToolHalfLife />

          <Reveal className="mt-14">
            <p className="text-[clamp(1.5rem,4.2vw,3.2rem)] leading-[1.06] font-medium tracking-[-0.04em] text-fg">
              Learn the tool.
              <br />
              <span className="ai-spectrum">Understand the why.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Digital ID */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1fr] lg:items-center lg:gap-16">
            <SectionHead
              eyebrow="Profile"
              lines={['THE SHORT', 'VERSION.']}
              accentLines={[1]}
              lede="Everything above, on one card."
            />
            <DigitalIdCard />
          </div>
        </div>
      </section>

      <ScrollSequence lines={aboutPhilosophy} />

      {/* Quote — signed. The plate behind it is what the glass refracts. */}
      <section className="ai-noise relative overflow-hidden py-28 md:py-40">
        <PlateBackdrop src={routePlate.about} treatment="vignette" drift duration={30} />
        <div className="container-x relative">
          <Reveal>
            <blockquote className="max-w-5xl">
              <p className="text-[clamp(1.5rem,4.6vw,3.6rem)] leading-[1.14] font-medium tracking-[-0.04em] text-fg">
                &ldquo;I want to understand how things work, how people
                experience them, and how to make them better.&rdquo;
              </p>
            </blockquote>
          </Reveal>

          <div className="mt-16 md:mt-20">
            <GlassSignature />
          </div>
        </div>
      </section>

      {/* Connect */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="container-x">
          <SectionHead
            lines={['FIND ME ONLINE.']}
            accentLines={[0]}
            className="mb-12"
          />

          {/* Verified profiles only — every row here is a `sameAs` signal. */}
          <ul className="border-t border-line">
            {[
              {
                label: 'Instagram',
                handle: site.instagram.handle,
                href: site.instagram.url,
                note: 'Creative work and process',
              },
              ...site.profiles.map((url) => ({
                label: 'GitHub',
                handle: `@${url.split('/').pop()}`,
                href: url,
                note: 'Code and side projects',
              })),
            ].map((profile) => (
              <li key={profile.href} className="border-b border-line">
                <a
                  href={profile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="follow"
                  className="group flex items-center justify-between gap-6 py-8 transition-colors duration-400"
                >
                  <span>
                    <span className="block font-mono text-[10.5px] tracking-[0.2em] text-faint uppercase">
                      {profile.label}
                    </span>
                    <span className="mt-3 block text-[clamp(1.3rem,3.4vw,2.4rem)] leading-tight font-medium tracking-[-0.035em] text-fg transition-colors duration-400 group-hover:text-accent">
                      {profile.handle}
                    </span>
                  </span>
                  <span className="flex items-center gap-6">
                    <span className="hidden text-[14px] text-muted md:block">
                      {profile.note}
                    </span>
                    <span
                      aria-hidden
                      className="text-[18px] text-faint transition-all duration-400 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
                    >
                      ↗
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="ai-noise relative overflow-hidden py-28 md:py-40">
        <Aurora
          blobs={[
            {
              color:
                'radial-gradient(circle, rgba(47,91,255,0.34), rgba(47,91,255,0) 70%)',
              className:
                'left-[-8%] top-[6%] h-[42vw] w-[42vw] min-h-[280px] min-w-[280px]',
              anim: 'aurora-a',
            },
            {
              color:
                'radial-gradient(circle, rgba(229,57,155,0.28), rgba(229,57,155,0) 70%)',
              className:
                'right-[-6%] bottom-[4%] h-[40vw] w-[40vw] min-h-[260px] min-w-[260px]',
              anim: 'aurora-b',
            },
          ]}
        />

        <div className="container-x relative">
          <p className="mb-8 font-mono text-[11px] tracking-[0.24em] text-faint uppercase">
            Enough about me.
          </p>
          <SectionHead
            lines={['WHAT ARE', 'YOU BUILDING?']}
            accentLines={[1]}
            lede="Let's turn an idea into something real."
            className="mb-12"
          />
          <div className="flex flex-wrap gap-3">
            <MagneticButton href="/contact" variant="solid">
              Start a conversation
            </MagneticButton>
            <MagneticButton href="/work" variant="outline">
              View my work
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
