'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import MagneticButton from '@/components/MagneticButton';
import { projects, type Project } from '@/data/projects';

/**
 * Sticky index that tracks whichever project is currently in view.
 */
function ProjectNav({ active }: { active: number }) {
  return (
    <div className="pointer-events-none sticky top-20 z-40 hidden lg:block">
      <div className="container-x">
        <ol className="glass pointer-events-auto inline-flex items-center gap-1 rounded-full px-2 py-2">
          {projects.map((project, i) => {
            const isActive = i === active;
            return (
              <li key={project.slug}>
                <a
                  href={`#project-${project.slug}`}
                  data-cursor="magnet"
                  className={`relative block rounded-full px-4 py-2 font-mono text-[10.5px] tracking-[0.14em] uppercase transition-colors duration-400 ${
                    isActive ? 'text-fg' : 'text-faint hover:text-muted'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="work-nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-elev"
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                  {String(i + 1).padStart(2, '0')} {project.name}
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function ProjectPanel({
  project,
  index,
  onActive,
}: {
  project: Project;
  index: number;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // Slow vertical drift on the image while the panel passes through.
  const imageY = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1.12, 1.06]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onActive(index);
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [index, onActive]);

  return (
    <section
      ref={ref}
      id={`project-${project.slug}`}
      className="relative scroll-mt-32 py-20 md:py-28"
    >
      <div className="container-x">
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
          <span className="font-mono text-[11px] tracking-[0.22em] text-faint uppercase">
            {String(index + 1).padStart(2, '0')} /{' '}
            {String(projects.length).padStart(2, '0')}
          </span>
          <span className="font-mono text-[11px] tracking-[0.16em] text-faint uppercase">
            {project.industry} · {project.year} · {project.location}
          </span>
        </div>

        {/* Full-width visual */}
        <Link
          href={`/work/${project.slug}`}
          data-cursor="view"
          aria-label={`Open the ${project.name} case study`}
          className="group relative block overflow-hidden rounded-3xl border border-line bg-elev"
        >
          <div className="relative aspect-[16/10] overflow-hidden md:aspect-[16/8]">
            <motion.div
              className="absolute inset-[-8%]"
              style={reduce ? undefined : { y: imageY, scale: imageScale }}
            >
              <Image
                src={project.image}
                alt={`${project.name} — ${project.tagline}`}
                fill
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
              />
            </motion.div>

            {/* Overlay deepens on hover. */}
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-100"
            />
            <div
              aria-hidden
              className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              style={{
                background:
                  'linear-gradient(120deg, rgba(47,91,255,0.28), transparent 55%, rgba(124,58,237,0.24))',
              }}
            />

            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-6 p-6 md:p-10">
              <div className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5">
                <p className="font-mono text-[10.5px] tracking-[0.2em] text-white/80 uppercase">
                  {project.industry} · {project.year} · {project.location}
                </p>
                <p className="mt-3 text-[clamp(1.7rem,5vw,4rem)] leading-[0.96] font-medium tracking-[-0.045em] text-white">
                  {project.name.toUpperCase()}
                </p>
              </div>

              <span
                aria-hidden
                className="glass grid h-12 w-12 shrink-0 place-items-center rounded-full text-white transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                ↗
              </span>
            </div>
          </div>
        </Link>

        {/* Statement + description */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <h2 className="text-[clamp(1.7rem,4.8vw,3.8rem)] leading-[0.98] font-medium tracking-[-0.045em]">
            {project.statement.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.05em]">
                <motion.span
                  className={`block ${
                    i === project.statement.length - 1 ? 'ai-spectrum' : 'text-fg'
                  }`}
                  initial={reduce ? false : { y: '112%' }}
                  whileInView={reduce ? undefined : { y: '0%' }}
                  viewport={{ once: true, margin: '-70px' }}
                  transition={{
                    duration: 1,
                    delay: i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h2>

          <div>
            <p className="text-[16px] leading-relaxed text-muted md:text-[17px]">
              {project.summary}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <MagneticButton href={`/work/${project.slug}`} variant="solid">
                Explore case study
              </MagneticButton>
              <MagneticButton href={project.website} external variant="outline">
                Visit website
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Information strip */}
        <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          {project.facts.map((fact) => (
            <div key={fact.label} className="bg-surface/70 px-5 py-6">
              <dt className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
                {fact.label}
              </dt>
              <dd className="mt-2.5 text-[15px] text-fg">{fact.value}</dd>
            </div>
          ))}
        </dl>

        {/* Ownership */}
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-line bg-surface/60 p-7">
            <p className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
              Qyverix
            </p>
            <p className="mt-4 text-[15.5px] leading-relaxed text-muted">
              {project.name} was designed and built by the Qyverix team. The
              site, its features and its delivery are the output of that team.
            </p>
          </div>

          <div className="rounded-2xl border border-accent/30 bg-accent/[0.05] p-7">
            <p className="font-mono text-[10px] tracking-[0.18em] text-accent uppercase">
              My contribution
            </p>
            <ul className="mt-4 grid gap-2.5">
              {project.contribution.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-muted"
                >
                  <span
                    aria-hidden
                    className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-accent"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ProjectShowcase() {
  const [active, setActive] = useState(0);

  return (
    <>
      <ProjectNav active={active} />
      {projects.map((project, i) => (
        <ProjectPanel
          key={project.slug}
          project={project}
          index={i}
          onActive={setActive}
        />
      ))}
    </>
  );
}
