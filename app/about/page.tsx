import Link from 'next/link';
import AboutHero from '@/components/about/AboutHero';
import AboutStory from '@/components/about/AboutStory';
import Intersection from '@/components/about/Intersection';
import Principles from '@/components/about/Principles';
import DoMenu from '@/components/about/DoMenu';
import WorkingModel from '@/components/about/WorkingModel';
import DigitalIdCard from '@/components/about/DigitalIdCard';
import Constellation from '@/components/system/Constellation';
import ScrollSequence from '@/components/system/ScrollSequence';
import BehindTheWork from '@/components/work/BehindTheWork';
import SectionHead from '@/components/ai/SectionHead';
import AIOrb from '@/components/ai/AIOrb';
import Aurora from '@/components/ai/Aurora';
import FlowStrip from '@/components/FlowStrip';
import MagneticButton from '@/components/MagneticButton';
import Reveal from '@/components/Reveal';
import {
  aboutPhilosophy,
  aiLoop,
  qyverixFlow,
  qyverixResponsibilities,
  roleNodes,
  thinkingColumn,
  toolsColumn,
} from '@/data/about';
import { site } from '@/data/site';
import { pageMetadata } from '@/lib/seo';

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
            <ul className="flex flex-wrap gap-2">
              {qyverixResponsibilities.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-line bg-surface/70 px-4 py-2 text-[13.5px] text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-12">
            <MagneticButton href="/marketing" variant="outline">
              Explore my marketing role
            </MagneticButton>
          </div>
        </div>
      </section>

      <DoMenu />

      {/* Software */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <SectionHead
              eyebrow="Software"
              lines={['I LIKE', 'BUILDING THINGS.']}
              accentLines={[1]}
              lede="Websites, digital products and software experiences that solve practical business problems."
            />
            <div className="lg:pt-6">
              <FlowStrip
                steps={['IDEA', 'SYSTEM', 'INTERFACE', 'CODE', 'PRODUCT']}
              />
              <div className="mt-9">
                <MagneticButton href="/development" variant="outline">
                  View development
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketing */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            lines={['BUILDING IT', 'IS ONLY HALF', 'THE WORK.']}
            className="mb-10"
          />
          <Reveal>
            <p className="ai-spectrum text-[clamp(1.7rem,5.4vw,4.4rem)] leading-[0.98] font-medium tracking-[-0.05em]">
              PEOPLE NEED
              <br />
              TO CARE.
            </p>
            <p className="mt-8 max-w-xl text-[16px] leading-relaxed text-muted md:text-[17px]">
              That&rsquo;s where marketing, positioning, content and
              communication become part of the product story.
            </p>
            <div className="mt-10">
              <MagneticButton href="/marketing" variant="outline">
                Explore marketing
              </MagneticButton>
            </div>
          </Reveal>
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

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                label: 'VIDEO',
                href: '/video-editing',
                items: ['Video editing', 'Short-form', 'Brand film'],
              },
              {
                label: 'SOCIAL',
                href: '/social-media',
                items: ['Social media', 'Content creation', 'Digital presence'],
              },
              {
                label: 'VISUAL',
                href: '/marketing',
                items: ['Visual communication', 'Creative direction', 'Brand'],
              },
            ].map((panel, i) => (
              <Reveal key={panel.label} delay={i * 0.08}>
                <Link
                  href={panel.href}
                  data-cursor="explore"
                  className="glass group block h-full rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-1.5"
                >
                  <span className="font-mono text-[11px] tracking-[0.2em] text-faint uppercase">
                    {panel.label}
                  </span>
                  <ul className="mt-8 space-y-2">
                    {panel.items.map((item) => (
                      <li key={item} className="text-[15px] text-muted">
                        {item}
                      </li>
                    ))}
                  </ul>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-12">
            <MagneticButton href="/video-editing" variant="solid">
              Explore creative work
            </MagneticButton>
          </div>
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

          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
            <div className="bg-surface/70 p-8 md:p-10">
              <p className="mb-6 font-mono text-[10.5px] tracking-[0.2em] text-faint uppercase">
                Tools
              </p>
              <ul className="space-y-3">
                {toolsColumn.map((item) => (
                  <li
                    key={item}
                    className="border-b border-line pb-3 text-[16px] text-muted last:border-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-surface/70 p-8 md:p-10">
              <p className="mb-6 font-mono text-[10.5px] tracking-[0.2em] text-accent uppercase">
                What matters
              </p>
              <ul className="space-y-3">
                {thinkingColumn.map((item) => (
                  <li
                    key={item}
                    className="border-b border-line pb-3 text-[16px] text-fg last:border-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

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

      {/* Quote */}
      <section className="relative overflow-hidden py-28 md:py-40">
        <div className="container-x">
          <Reveal>
            <blockquote className="max-w-5xl">
              <p className="text-[clamp(1.5rem,4.6vw,3.6rem)] leading-[1.14] font-medium tracking-[-0.04em] text-fg">
                &ldquo;I want to understand how things work, how people
                experience them, and how to make them better.&rdquo;
              </p>
              <footer className="mt-10 font-mono text-[11px] tracking-[0.2em] text-faint uppercase">
                — Gnana Chandra
              </footer>
            </blockquote>
          </Reveal>
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

          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="follow"
            className="group flex items-center justify-between gap-6 border-t border-b border-line py-8 transition-colors duration-400 hover:border-accent/40"
          >
            <span>
              <span className="block font-mono text-[10.5px] tracking-[0.2em] text-faint uppercase">
                Instagram
              </span>
              <span className="mt-3 block text-[clamp(1.3rem,3.4vw,2.4rem)] leading-tight font-medium tracking-[-0.035em] text-fg">
                {site.instagram.handle}
              </span>
            </span>
            <span
              aria-hidden
              className="text-[18px] text-faint transition-all duration-400 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
            >
              ↗
            </span>
          </a>

          <p className="mt-6 font-mono text-[10.5px] tracking-[0.16em] text-faint uppercase">
            Other verified profiles will be listed here as they are added.
          </p>
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
