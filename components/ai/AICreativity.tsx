'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { creativeWorlds } from '@/data/ai-page';
import SectionHead from './SectionHead';

/** Distinct hover visual per world. */
function WorldVisual({ id, active }: { id: string; active: boolean }) {
  const reduce = useReducedMotion();

  if (id === 'video') {
    return (
      <div className="flex h-24 items-end gap-1.5">
        {Array.from({ length: 22 }, (_, i) => (
          <motion.span
            key={i}
            className="flex-1 rounded-full bg-ai-violet/45"
            initial={false}
            animate={{
              height: active && !reduce ? `${18 + ((i * 37) % 70)}%` : '14%',
            }}
            transition={{
              duration: 0.5,
              delay: active ? i * 0.018 : 0,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}
        <motion.span
          aria-hidden
          className="absolute bottom-0 h-24 w-px bg-ai-violet"
          initial={false}
          animate={{ left: active ? ['4%', '92%'] : '4%', opacity: active ? 1 : 0 }}
          transition={
            active && !reduce
              ? { duration: 2.6, repeat: Infinity, ease: 'linear' }
              : { duration: 0.3 }
          }
        />
      </div>
    );
  }

  if (id === 'visual') {
    return (
      <div className="grid h-24 grid-cols-4 grid-rows-2 gap-1.5">
        {Array.from({ length: 8 }, (_, i) => (
          <motion.span
            key={i}
            className="rounded-md bg-ai-cyan/35"
            initial={false}
            animate={{
              opacity: active ? [0.3, 1, 0.55][i % 3] : 0.28,
              scale: active && !reduce ? [1, 1.06, 1] : 1,
            }}
            transition={{
              duration: 1.6,
              delay: (i % 4) * 0.09,
              repeat: active && !reduce ? Infinity : 0,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="relative h-24">
      {Array.from({ length: 3 }, (_, i) => (
        <motion.span
          key={i}
          className="absolute left-0 h-12 w-3/4 rounded-lg border border-line bg-elev/70"
          initial={false}
          animate={{
            y: active ? i * 16 : i * 5,
            x: active ? i * 22 : i * 6,
            opacity: active ? 1 : 0.4,
            rotate: active ? (i - 1) * 2.5 : 0,
          }}
          transition={{
            duration: 0.55,
            delay: active ? i * 0.07 : 0,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}
    </div>
  );
}

export default function AICreativity() {
  const [active, setActive] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const current = creativeWorlds.find((w) => w.id === active);

  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      {/* Background responds to whichever world is hovered. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        animate={{
          background: current
            ? `radial-gradient(70% 60% at 50% 40%, color-mix(in oklab, ${current.tint} 14%, transparent), transparent 72%)`
            : 'radial-gradient(70% 60% at 50% 40%, rgba(124,58,237,0.05), transparent 72%)',
        }}
        transition={{ duration: 0.7 }}
      />

      <div className="container-x relative">
        <SectionHead
          eyebrow="AI × Creativity"
          lines={['AI ×', 'CREATIVITY']}
          accentLines={[1]}
          lede="Three places creative work happens. AI shortens the path to an idea; none of them ship without a person deciding it is good."
          className="mb-14"
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {creativeWorlds.map((world, i) => {
            const isActive = active === world.id;
            return (
              <motion.article
                key={world.id}
                data-cursor="orb"
                onMouseEnter={() => setActive(world.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(world.id)}
                onBlur={() => setActive(null)}
                tabIndex={0}
                initial={reduce ? false : { opacity: 0, y: 26 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="glass group relative overflow-hidden rounded-3xl p-7 md:p-8"
                style={{
                  borderColor: isActive
                    ? `color-mix(in oklab, ${world.tint} 45%, transparent)`
                    : undefined,
                }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-600 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(90% 70% at 50% 0%, color-mix(in oklab, ${world.tint} 12%, transparent), transparent 70%)`,
                  }}
                />

                <div className="relative">
                  <p
                    className="font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-500"
                    style={{ color: isActive ? world.tint : undefined }}
                  >
                    {world.label}
                  </p>

                  <h3 className="mt-6 text-[26px] leading-tight tracking-[-0.03em] text-fg md:text-[30px]">
                    {world.headline}
                  </h3>

                  <p className="mt-4 min-h-[72px] text-[14.5px] leading-relaxed text-muted">
                    {world.body}
                  </p>

                  <div className="relative mt-8">
                    <WorldVisual id={world.id} active={isActive} />
                  </div>

                  <ul className="mt-8 flex flex-wrap gap-2">
                    {world.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-line bg-elev/70 px-3 py-1 text-[12.5px] text-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
