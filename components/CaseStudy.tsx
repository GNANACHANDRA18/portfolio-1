'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import SectionHead from './ai/SectionHead';
import GlassPanel from './media/GlassPanel';
import { img } from '@/lib/media';
import Aurora from './ai/Aurora';
import MagneticButton from './MagneticButton';
import Reveal from './Reveal';
import { projects, type Project } from '@/data/projects';
import FactStrip from '@/components/FactStrip';

type Labels = {
  strategy: string;
  experience: string;
};

/** A full-bleed plate that drifts as it passes through the viewport.
 *  `src` is a key into the media manifest, not a URL. */
function Plate({
  src,
  alt,
  priority = false,
  ratio = 'aspect-[16/9]',
}: {
  src: string;
  alt: string;
  priority?: boolean;
  ratio?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1.1, 1.06]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-3xl border border-line bg-elev ${ratio}`}
    >
      <motion.div
        className="absolute inset-[-8%]"
        style={reduce ? undefined : { y, scale }}
      >
        <Image
          {...img(src)}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 1280px) 100vw, 1200px"
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}

/** One narrative beat: a large index, a heading and a paragraph. */
function Beat({
  index,
  eyebrow,
  title,
  body,
}: {
  index: string;
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <section className="relative overflow-hidden border-t border-line py-20 md:py-28">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:gap-16">
          <Reveal>
            <span className="block font-mono text-[clamp(2rem,5vw,3.6rem)] leading-none tracking-[-0.04em] text-line-strong">
              {index}
            </span>
          </Reveal>

          <div>
            <Reveal>
              <p className="mb-5 font-mono text-[10.5px] tracking-[0.22em] text-faint uppercase">
                {eyebrow}
              </p>
              <h2 className="max-w-3xl text-[clamp(1.5rem,3.6vw,2.8rem)] leading-[1.06] font-medium tracking-[-0.04em] text-fg">
                {title}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-7 max-w-2xl text-[16.5px] leading-relaxed text-muted md:text-[18px]">
                {body}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Shared case-study layout. Section labels vary per project. */
export default function CaseStudy({
  project,
  labels,
}: {
  project: Project;
  labels: Labels;
}) {
  const others = projects.filter((p) => p.slug !== project.slug);
  const domain = project.website.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <>
      {/* Masthead */}
      <section className="ai-noise relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
        <Aurora
          blobs={[
            {
              color:
                'radial-gradient(circle, rgba(47,91,255,0.26), rgba(47,91,255,0) 70%)',
              className:
                'left-[-12%] top-[-4%] h-[44vw] w-[44vw] min-h-[300px] min-w-[300px]',
              anim: 'aurora-a',
            },
            {
              color:
                'radial-gradient(circle, rgba(124,58,237,0.2), rgba(124,58,237,0) 70%)',
              className:
                'right-[-10%] top-[10%] h-[38vw] w-[38vw] min-h-[260px] min-w-[260px]',
              anim: 'aurora-b',
            },
          ]}
        />

        <div className="container-x relative">
          <p className="mb-8 font-mono text-[10.5px] tracking-[0.24em] text-faint uppercase">
            Case study · {project.builtBy}
          </p>

          <SectionHead
            as="h1"
            lines={[project.name.toUpperCase()]}
            accentLines={[0]}
          />

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted md:text-xl">
              {project.summary}
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <FactStrip facts={project.facts} className="mt-14" />
          </Reveal>
        </div>
      </section>

      {/* Opening plate */}
      <section className="relative overflow-hidden pb-20 md:pb-28">
        <div className="container-x">
          <Reveal>
            <Plate
              src={project.media.card}
              alt={`${project.name} — ${project.tagline}`}
              priority
            />
          </Reveal>

          <Reveal className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono text-[10.5px] tracking-[0.16em] text-faint uppercase">
              {project.industry} · {project.year} · {project.location}
            </span>
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="magnet"
              className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-muted uppercase transition-colors duration-300 hover:text-accent"
            >
              {domain}
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      <Beat
        index="01"
        eyebrow="Overview"
        title="What this is."
        body={project.overview}
      />

      <Beat
        index="02"
        eyebrow="The challenge"
        title="What made it hard."
        body={project.challenge}
      />

      <Beat
        index="03"
        eyebrow={labels.strategy}
        title="The approach taken."
        body={project.strategy}
      />

      {/* Mid plate */}
      <section className="relative overflow-hidden border-t border-line py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <Plate
              src={project.media.plate}
              alt={`${project.name} — showroom detail`}
              ratio="aspect-[21/9]"
            />
          </Reveal>
        </div>
      </section>

      <Beat
        index="04"
        eyebrow={labels.experience}
        title="How it works in use."
        body={project.experience}
      />

      {/* Features */}
      <section className="relative overflow-hidden border-t border-line py-20 md:py-28">
        <div className="container-x">
          <SectionHead
            eyebrow="Features"
            lines={['WHAT THE EXPERIENCE', 'INCLUDES.']}
            accentLines={[1]}
            className="mb-12"
          />

          <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
            <ul className="grid gap-px self-start overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {project.features.map((feature, i) => (
                <Reveal
                  as="li"
                  key={feature}
                  delay={Math.min(i * 0.05, 0.3)}
                  className="group flex items-baseline gap-4 bg-surface/70 px-6 py-7 transition-colors duration-400 hover:bg-elev"
                >
                  <span className="font-mono text-[10px] tracking-[0.16em] text-faint">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[15.5px] text-muted transition-colors duration-400 group-hover:text-fg">
                    {feature}
                  </span>
                </Reveal>
              ))}
            </ul>

            {/* The square crop, under glass — the third and last framing of
                this project's photography on the page. */}
            <Reveal delay={0.12}>
              <GlassPanel density="thin" className="relative h-full min-h-[280px]">
                <Image
                  {...img(project.media.square)}
                  alt={`${project.name} — detail`}
                  data-glass-bg
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover opacity-[0.82]"
                />
                <div
                  aria-hidden
                  data-glass-bg
                  className="absolute inset-0 bg-linear-to-t from-bg/85 via-bg/10 to-transparent"
                />
                <div className="relative flex h-full flex-col justify-end p-7">
                  <p className="font-mono text-[10px] tracking-[0.18em] text-white/60 uppercase">
                    {project.builtBy} · {project.year}
                  </p>
                  <p className="mt-2 text-[17px] leading-snug font-medium tracking-[-0.03em] text-white">
                    {project.tagline}
                  </p>
                </div>
              </GlassPanel>
            </Reveal>
          </div>
        </div>
      </section>

      <Beat
        index="05"
        eyebrow="Outcome"
        title="Where it landed."
        body={project.outcome}
      />

      {/* Ownership */}
      <section className="relative overflow-hidden border-t border-line py-20 md:py-28">
        <div className="container-x">
          <SectionHead
            eyebrow="My contribution"
            lines={['WHO DID WHAT.']}
            accentLines={[0]}
            className="mb-12"
          />

          <div className="grid gap-5 lg:grid-cols-2">
            <Reveal
              as="article"
              className="rounded-3xl border border-line bg-surface/60 p-8 md:p-10"
            >
              <p className="font-mono text-[10.5px] tracking-[0.2em] text-faint uppercase">
                The project
              </p>
              <h3 className="mt-5 text-[clamp(1.2rem,2.6vw,1.8rem)] leading-tight font-medium tracking-[-0.035em] text-fg">
                A {project.builtBy} project
              </h3>
              <p className="mt-5 text-[15px] leading-relaxed text-muted">
                {project.name} was designed and built by {project.builtBy} as a
                team. The site, its features and its delivery are the output of
                that team rather than of any one person.
              </p>
            </Reveal>

            <Reveal
              delay={0.07}
              as="article"
              className="rounded-3xl border border-accent/30 bg-accent/[0.05] p-8 md:p-10"
            >
              <p className="font-mono text-[10.5px] tracking-[0.2em] text-accent uppercase">
                My role
              </p>
              <h3 className="mt-5 text-[clamp(1.2rem,2.6vw,1.8rem)] leading-tight font-medium tracking-[-0.035em] text-fg">
                Marketing, brand and client success
              </h3>
              <ul className="mt-6 space-y-3">
                {project.contribution.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[14.5px] leading-relaxed text-muted"
                  >
                    <span
                      aria-hidden
                      className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-accent"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal className="mt-6">
            <p className="font-mono text-[10px] leading-relaxed tracking-[0.16em] text-faint uppercase">
              Individual authorship of specific design or engineering
              deliverables is not claimed · business performance metrics are not
              published
            </p>
          </Reveal>

          <div className="mt-12 flex flex-wrap gap-3">
            <MagneticButton href={project.website} external variant="solid">
              {project.cta}
            </MagneticButton>
            <MagneticButton href={project.caseStudy} external variant="outline">
              {project.builtBy} case study
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Next projects */}
      <section className="relative overflow-hidden border-t border-line py-20 md:py-28">
        <div className="container-x">
          <SectionHead
            eyebrow="More work"
            lines={['OTHER PROJECTS.']}
            accentLines={[0]}
            className="mb-12"
          />

          <ul className="border-t border-line">
            {others.map((other, i) => (
              <Reveal
                as="li"
                key={other.slug}
                delay={i * 0.07}
                className="border-b border-line"
              >
                <Link
                  href={`/work/${other.slug}`}
                  data-cursor="view"
                  className="group grid grid-cols-[1fr_auto] items-center gap-6 py-7"
                >
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] tracking-[0.16em] text-faint uppercase">
                      {other.industry} · {other.year}
                    </span>
                    <span className="mt-2.5 block truncate text-[clamp(1.2rem,3.2vw,2.4rem)] leading-tight font-medium tracking-[-0.04em] text-muted transition-colors duration-400 group-hover:text-fg">
                      {other.name.toUpperCase()}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="text-[15px] text-faint transition-all duration-400 group-hover:translate-x-1 group-hover:text-accent"
                  >
                    &rarr;
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>

          <div className="mt-12">
            <MagneticButton href="/work" variant="outline">
              All work
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
