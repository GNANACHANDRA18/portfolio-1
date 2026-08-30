'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { marketingFlow, marketingObjects } from '@/data/ai-page';
import SectionHead from './SectionHead';

/** Desktop scatter positions, in percent of the plot area. */
const SPOTS = [
  { x: 8, y: 14 },
  { x: 62, y: 6 },
  { x: 34, y: 40 },
  { x: 4, y: 66 },
  { x: 68, y: 58 },
  { x: 40, y: 84 },
];

const EDGES: [number, number][] = [
  [0, 2],
  [1, 2],
  [2, 4],
  [2, 3],
  [3, 5],
  [4, 5],
];

export default function AIMarketing() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <SectionHead
            eyebrow="AI × Marketing"
            lines={['AI ×', 'MARKETING']}
            accentLines={[1]}
          />

          <div className="lg:pt-8">
            <motion.blockquote
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="border-l-2 border-ai-magenta/40 pl-6 text-[clamp(1.4rem,3.2vw,2.4rem)] leading-[1.28] tracking-[-0.03em] text-fg"
            >
              Strategy gives AI direction.
              <br />
              <span className="text-muted">AI gives execution speed.</span>
            </motion.blockquote>

            <motion.p
              initial={reduce ? false : { opacity: 0 }}
              whileInView={reduce ? undefined : { opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-8 max-w-lg text-[16px] leading-relaxed text-muted"
            >
              A campaign is not one artefact. It is a proposal, a positioning
              line, a content plan, a set of posts and the analysis that comes
              back — and they only work when they say the same thing.
            </motion.p>
          </div>
        </div>

        {/* Floating marketing objects that wire themselves together */}
        <div className="relative mt-16 md:mt-24">
          {/* Desktop scatter */}
          <div className="relative hidden aspect-[16/10] w-full md:block">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
              aria-hidden
            >
              {EDGES.map(([a, b], i) => (
                <motion.line
                  key={`${a}-${b}`}
                  x1={SPOTS[a].x + 11}
                  y1={SPOTS[a].y + 8}
                  x2={SPOTS[b].x + 11}
                  y2={SPOTS[b].y + 8}
                  stroke="rgba(229,57,155,0.28)"
                  strokeWidth="0.25"
                  vectorEffect="non-scaling-stroke"
                  initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                  whileInView={reduce ? undefined : { pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{
                    duration: 1,
                    delay: 0.3 + i * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              ))}
            </svg>

            {marketingObjects.map((obj, i) => (
              <motion.article
                key={obj.id}
                data-cursor="orb"
                className="glass absolute w-[22%] min-w-[170px] rounded-2xl p-5"
                style={{ left: `${SPOTS[i].x}%`, top: `${SPOTS[i].y}%` }}
                initial={reduce ? false : { opacity: 0, y: 24, scale: 0.94 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={reduce ? undefined : { y: -6, scale: 1.03 }}
              >
                <p className="font-mono text-[10px] tracking-[0.16em] text-ai-magenta uppercase">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <p className="mt-3 text-[15px] tracking-tight text-fg">
                  {obj.label}
                </p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">
                  {obj.hint}
                </p>
              </motion.article>
            ))}
          </div>

          {/* Mobile stack */}
          <ul className="grid gap-3 sm:grid-cols-2 md:hidden">
            {marketingObjects.map((obj, i) => (
              <motion.li
                key={obj.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="glass rounded-2xl p-5"
              >
                <p className="font-mono text-[10px] tracking-[0.16em] text-ai-magenta uppercase">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <p className="mt-3 text-[15px] tracking-tight text-fg">
                  {obj.label}
                </p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">
                  {obj.hint}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Workflow */}
        <div className="mt-16 md:mt-24">
          <p className="mb-7 font-mono text-[11px] tracking-[0.22em] text-faint uppercase">
            The loop
          </p>
          <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-6">
            {marketingFlow.map((step, i) => (
              <motion.li
                key={step}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group relative rounded-xl border border-line bg-elev/70 px-4 py-5 transition-colors duration-400 hover:border-ai-magenta/40"
              >
                <span className="font-mono text-[10px] tracking-[0.16em] text-faint">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="mt-2.5 text-[14.5px] tracking-tight text-fg">
                  {step}
                </p>
                {i < marketingFlow.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute top-1/2 -right-1.5 hidden h-1.5 w-1.5 rotate-45 border-t border-r border-line-strong lg:block"
                  />
                )}
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
