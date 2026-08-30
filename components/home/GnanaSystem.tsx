'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Constellation from '@/components/system/Constellation';
import Signal from '@/components/Signal';
import { systemNodes } from '@/data/home';

/**
 * THE GNANA SYSTEM.
 *
 * The six domains the work actually runs across, webbed together rather than
 * listed — the point being that they are one practice, not six services. The
 * same diagram carries the roles on About and the capabilities on Skills, so
 * it reads as a signature rather than a one-off.
 */
export default function GnanaSystem() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      <Signal speed={13} className="absolute inset-x-0 top-0" />

      <div
        aria-hidden
        className="glow-accent pointer-events-none absolute top-1/2 left-1/2 h-[70vw] w-[70vw] max-h-[820px] max-w-[820px] -translate-x-1/2 -translate-y-1/2 opacity-40"
      />

      <div className="container-x relative">
        <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-5 flex items-center gap-2.5">
              <Signal.Dot />
              The system
            </p>
            <motion.h2
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-[16ch] text-[clamp(2rem,6.4vw,5rem)] leading-[0.92] font-medium tracking-[-0.05em]"
            >
              SIX DOMAINS.
              <br />
              <span className="lux-spectrum">ONE PRACTICE.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-sm text-[15.5px] leading-relaxed text-muted md:text-right md:text-[17px]"
          >
            None of these sit on their own. A brand decision changes what gets
            built; what gets built changes what there is to say.
          </motion.p>
        </div>

        <Constellation
          core="GNANA"
          coreNote="THE SYSTEM"
          nodes={systemNodes}
          tint="var(--color-accent)"
          idleHint="Hover a domain to see what it covers."
        />
      </div>
    </section>
  );
}
