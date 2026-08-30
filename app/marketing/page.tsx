import Image from 'next/image';
import Link from 'next/link';
import NoirHero from '@/components/marketing/NoirHero';
import MindsetAreas from '@/components/marketing/MindsetAreas';
import BusinessTopics from '@/components/marketing/BusinessTopics';
import Flywheel from '@/components/marketing/Flywheel';
import ProposalAssembly from '@/components/marketing/ProposalAssembly';
import ContentEngine from '@/components/marketing/ContentEngine';
import ThinkingGrid from '@/components/marketing/ThinkingGrid';
import TriangleSignature from '@/components/marketing/TriangleSignature';
import TopicsMarquee from '@/components/marketing/TopicsMarquee';
import ScrollSequence from '@/components/system/ScrollSequence';
import SectionHead from '@/components/ai/SectionHead';
import FlowStrip from '@/components/FlowStrip';
import MagneticButton from '@/components/MagneticButton';
import Reveal from '@/components/Reveal';
import {
  aiBusinessAreas,
  brandLadder,
  businessPhilosophy,
  businessSoftwareChain,
  clientSuccessChain,
  cmoResponsibilities,
  contentFunnel,
  pitchFlow,
} from '@/data/business';
import { projects } from '@/data/projects';
import { site } from '@/data/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Marketing, Brand & Business',
  description:
    'Gnana Chandra is CMO at Qyverix, across marketing, brand, client success and business development — how businesses grow, not just how they are marketed.',
  path: '/marketing',
});

export default function MarketingPage() {
  return (
    <>
      <NoirHero />

      {/* Big statement */}
      <ScrollSequence
        lines={[
          'MARKETING GETS ATTENTION.',
          'BUSINESS CREATES VALUE.',
          'GREAT STRATEGY CONNECTS BOTH.',
        ]}
      />

      {/* Mindset */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            eyebrow="Business mindset"
            lines={['I LIKE UNDERSTANDING', 'HOW BUSINESSES WORK.']}
            accentLines={[1]}
            lede="Six questions sit under every project. Marketing is only one of them."
            className="mb-14"
          />
          <MindsetAreas />
        </div>
      </section>

      {/* Topics */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            eyebrow="Interests"
            lines={['THINGS I LIKE', 'TO THINK ABOUT.']}
            accentLines={[1]}
            className="mb-14"
          />
          <BusinessTopics />
        </div>
      </section>

      {/* Flywheel */}
      <section className="relative overflow-hidden border-t border-line py-24 md:py-36">
        <div aria-hidden className="noir-grid pointer-events-none absolute inset-0" />
        <div className="container-x relative">
          <Flywheel />
        </div>
      </section>

      {/* CMO at Qyverix */}
      <section className="noir-grain relative overflow-hidden py-28 md:py-40">
        <div className="container-x relative">
          <p className="mb-9 font-mono text-[10.5px] tracking-[0.26em] text-faint uppercase">
            Qyverix
          </p>

          <SectionHead
            lines={['CMO', 'MARKETING.', 'BRAND.', 'CLIENT SUCCESS.']}
            accentLines={[3]}
            lede="I own Qyverix's external image and end-to-end client experience."
            className="mb-14"
          />

          <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {cmoResponsibilities.map((item, i) => (
              <Reveal
                as="li"
                key={item}
                delay={Math.min(i * 0.04, 0.3)}
                className="group bg-surface/60 px-6 py-8 transition-colors duration-400 hover:bg-elev"
              >
                <span className="block font-mono text-[10px] tracking-[0.16em] text-faint">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="mt-4 block font-mono text-[11px] tracking-[0.14em] text-muted uppercase transition-colors duration-400 group-hover:text-fg">
                  {item}
                </span>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-16">
            <p className="text-[clamp(1.6rem,5.4vw,4.4rem)] leading-[1.02] font-medium tracking-[-0.05em] text-fg">
              Single point of contact
              <br />
              <span className="ai-spectrum">from pitch to handoff.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pitch → business */}
      <section className="relative overflow-hidden border-t border-line py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            eyebrow="The process"
            lines={['FROM CONVERSATION', 'TO BUSINESS.']}
            accentLines={[1]}
            className="mb-14"
          />
          <FlowStrip steps={pitchFlow} />
        </div>
      </section>

      {/* Proposal */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
            <SectionHead
              eyebrow="Proposals"
              lines={['MAKE THE VALUE', 'CLEAR.']}
              accentLines={[1]}
              lede="Brief, scope, pricing, timeline and deliverables — assembled into something a business can actually decide on."
            />
            <ProposalAssembly />
          </div>
        </div>
      </section>

      {/* Brand */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            eyebrow="Brand"
            lines={['A BRAND IS MORE', 'THAN A LOGO.']}
            accentLines={[1]}
            className="mb-14"
          />

          <ol className="relative border-l border-line pl-8 md:pl-12">
            {brandLadder.map((rung, i) => (
              <Reveal
                as="li"
                key={rung.label}
                delay={i * 0.06}
                className="relative pb-9 last:pb-0"
              >
                <span
                  aria-hidden
                  className="absolute top-2 -left-[calc(2rem+4.5px)] h-2 w-2 rounded-full bg-accent md:-left-[calc(3rem+4.5px)]"
                />
                <p className="font-mono text-[12px] tracking-[0.16em] text-fg uppercase">
                  {rung.label}
                </p>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
                  {rung.note}
                </p>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-14">
            <p className="text-[clamp(1.5rem,4.6vw,3.6rem)] leading-none font-medium tracking-[-0.05em]">
              <span className="text-fg">BRAND</span>
              <span className="mx-4 text-faint">=</span>
              <span className="ai-spectrum">EXPERIENCE.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* AI × business */}
      <section className="noir-grain relative overflow-hidden border-t border-line py-28 md:py-40">
        <div aria-hidden className="noir-grid pointer-events-none absolute inset-0" />
        <div className="container-x relative">
          <SectionHead
            eyebrow="AI × business"
            lines={['AI IS BECOMING', 'A BUSINESS LAYER.']}
            accentLines={[1]}
            lede="Not a department. A layer that runs underneath most of what a company already does."
            className="mb-14"
          />

          <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {aiBusinessAreas.map((area, i) => (
              <Reveal
                as="li"
                key={area}
                delay={Math.min(i * 0.04, 0.3)}
                className="group flex items-center justify-between gap-4 bg-surface/60 px-6 py-7 transition-colors duration-400 hover:bg-elev"
              >
                <span className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase transition-colors duration-400 group-hover:text-fg">
                  {area}
                </span>
                <span className="font-mono text-[9.5px] tracking-[0.16em] text-accent uppercase opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                  + AI
                </span>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-14">
            <p className="text-[clamp(1.4rem,4.6vw,3.6rem)] leading-[1.05] font-medium tracking-[-0.05em] text-fg">
              AI <span className="text-faint">×</span> BUSINESS
              <br />
              <span className="ai-spectrum">= NEW WORKFLOWS</span>
            </p>
          </Reveal>

          <div className="mt-12">
            <MagneticButton href="/ai" variant="solid" arrow="→">
              Explore AI
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Business + software */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            lines={['I CAN THINK ABOUT', 'THE BUSINESS', 'AND THE PRODUCT.']}
            accentLines={[2]}
            className="mb-14"
          />
          <FlowStrip steps={businessSoftwareChain} />
          <Reveal className="mt-12">
            <p className="max-w-2xl text-[16px] leading-relaxed text-muted md:text-[18px]">
              Working across software and marketing gives me a broader view of
              how digital products fit into a business.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Content */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
            <div>
              <SectionHead
                eyebrow="Content"
                lines={['CONTENT IS', 'A BUSINESS ASSET.']}
                accentLines={[1]}
                lede="One position, expressed properly everywhere it has to live — then measured by what it moves."
                className="mb-10"
              />
              <FlowStrip steps={contentFunnel} />
            </div>
            <ContentEngine />
          </div>
        </div>
      </section>

      {/* Client success */}
      <section className="relative overflow-hidden border-t border-line py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            eyebrow="Client success"
            lines={["THE SALE ISN'T", 'THE END.']}
            accentLines={[1]}
            lede="Great client experience turns a completed project into a relationship."
            className="mb-14"
          />
          <FlowStrip steps={clientSuccessChain} />
        </div>
      </section>

      {/* Real projects */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            eyebrow="Qyverix projects"
            lines={['BUSINESS MEETS', 'DIGITAL EXPERIENCE.']}
            accentLines={[1]}
            className="mb-14"
          />

          <div className="grid gap-4 md:grid-cols-3">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.07}>
                <Link
                  href={`/work/${project.slug}`}
                  data-cursor="view"
                  className="group block overflow-hidden rounded-3xl border border-line bg-surface/60"
                >
                  <span className="relative block aspect-[16/11] overflow-hidden bg-elev">
                    <Image
                      src={project.image}
                      alt={`${project.name} — ${project.tagline}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover opacity-85 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:opacity-100"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"
                    />
                    <span className="absolute inset-x-0 bottom-0 p-5">
                      <span className="block font-mono text-[10px] tracking-[0.16em] text-white/70 uppercase">
                        {project.industry} · {project.year} · {project.location}
                      </span>
                      <span className="mt-1.5 block text-[19px] leading-tight font-medium tracking-[-0.03em] text-white">
                        {project.name}
                      </span>
                    </span>
                  </span>

                  <span className="block border-t border-line px-5 py-4">
                    <span className="block font-mono text-[9.5px] tracking-[0.16em] text-faint uppercase">
                      Qyverix project
                    </span>
                    <span className="mt-2 block font-mono text-[9.5px] tracking-[0.16em] text-accent uppercase">
                      My role · marketing, brand, client success
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-6">
            <p className="font-mono text-[10px] tracking-[0.16em] text-faint uppercase">
              Built by the Qyverix team · individual authorship of design or
              engineering deliverables is not claimed
            </p>
          </Reveal>
        </div>
      </section>

      {/* Thinking grid */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            eyebrow="How it connects"
            lines={['NOTHING HERE', 'STANDS ALONE.']}
            accentLines={[1]}
            className="mb-14"
          />
          <ThinkingGrid />
        </div>
      </section>

      {/* Signature */}
      <section className="noir-grain relative overflow-hidden border-t border-line py-28 md:py-40">
        <div className="container-x relative">
          <TriangleSignature />
        </div>
      </section>

      {/* Marquee */}
      <section className="relative overflow-hidden border-y border-line py-16 md:py-24">
        <div className="mb-8 container-x">
          <p className="font-mono text-[10.5px] tracking-[0.26em] text-faint uppercase">
            Topics I explore
          </p>
        </div>
        <TopicsMarquee />
      </section>

      {/* Philosophy */}
      <ScrollSequence lines={businessPhilosophy} />

      {/* Final CTA */}
      <section className="noir-grain relative flex min-h-[92svh] items-center overflow-hidden border-t border-line bg-bg py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 50% at 50% 60%, rgba(59,107,255,0.12), transparent 70%)',
          }}
        />

        <div className="container-x relative">
          <p className="mb-10 font-mono text-[10.5px] tracking-[0.26em] text-faint uppercase">
            Let&rsquo;s build
          </p>

          <h2 className="text-[clamp(2.2rem,9vw,7.5rem)] leading-[0.9] font-medium tracking-[-0.055em]">
            {['AN IDEA.', 'A PRODUCT.', 'A BRAND.', 'A BUSINESS.'].map(
              (line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.05em]">
                  <span
                    className={i === 3 ? 'ai-spectrum block' : 'block text-fg'}
                  >
                    {line}
                  </span>
                </span>
              ),
            )}
          </h2>

          <p className="mt-12 max-w-xl text-[17px] leading-relaxed text-muted md:text-xl">
            If you&rsquo;re building something ambitious, I&rsquo;d love to
            understand it.
          </p>

          <div className="mt-12 flex flex-wrap gap-3">
            <MagneticButton
              href="/contact"
              variant="solid"
              cursor="label"
              cursorLabel="Let's talk"
            >
              Start a conversation
            </MagneticButton>
            <MagneticButton href="/work" variant="outline">
              View my work
            </MagneticButton>
          </div>

          <p className="mt-16 font-mono text-[10.5px] tracking-[0.18em] text-faint uppercase">
            {site.name} · CMO · Software Developer · AI Practitioner ·
            Business &amp; Growth
          </p>
        </div>
      </section>
    </>
  );
}
