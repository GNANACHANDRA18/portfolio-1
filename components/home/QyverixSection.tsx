'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import Magnetic from '@/components/ai/Magnetic';
import { qyverixJourney } from '@/data/home';
import { site } from '@/data/site';

export default function QyverixSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-elev/60 py-28 md:py-40">
      <div aria-hidden className="ai-grid pointer-events-none absolute inset-0" />

      <div className="container-x relative">
        <p className="mb-7 font-mono text-[11px] tracking-[0.24em] text-faint uppercase">
          02 / Qyverix
        </p>

        <div className="grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <h2 className="text-[clamp(2rem,6.4vw,5.2rem)] leading-[0.94] font-medium tracking-[-0.05em]">
            <span className="sr-only">
              Building the brand behind the product.
            </span>
            {['BUILDING THE', 'BRAND BEHIND', 'THE PRODUCT.'].map((line, i) => (
              <span
                key={line}
                aria-hidden
                className="block overflow-hidden pb-[0.05em]"
              >
                <motion.span
                  className={`block ${i === 2 ? 'ai-spectrum' : 'text-fg'}`}
                  initial={reduce ? false : { y: '112%' }}
                  whileInView={reduce ? undefined : { y: '0%' }}
                  viewport={{ once: true, margin: '-70px' }}
                  transition={{
                    duration: 1,
                    delay: i * 0.09,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 22 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="glass self-start rounded-2xl p-7 md:p-8"
          >
            <p className="text-[22px] tracking-tight text-fg md:text-2xl">
              {site.shortName}
            </p>
            <p className="mt-2 font-mono text-[11px] tracking-[0.14em] text-accent uppercase">
              CMO · Marketing, Brand &amp; Client Success
            </p>
            <p className="mt-6 text-[15.5px] leading-relaxed text-muted">
              I own Qyverix&rsquo;s external image and end-to-end client
              experience.
            </p>
            <a
              href={site.company.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="magnet"
              className="group mt-7 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-fg uppercase"
            >
              qyverix.in
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </a>
          </motion.div>
        </div>

        {/* Journey */}
        <ol className="mt-20 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {qyverixJourney.map((step, i) => (
            <motion.li
              key={step}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.6,
                delay: i * 0.09,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative rounded-2xl border border-line bg-elev/70 px-5 py-7 transition-colors duration-400 hover:border-accent/40"
            >
              <span className="font-mono text-[10px] tracking-[0.18em] text-faint">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="mt-4 font-mono text-[13px] tracking-[0.16em] text-fg uppercase">
                {step}
              </p>

              {i < qyverixJourney.length - 1 && (
                <span
                  aria-hidden
                  className="absolute top-1/2 -right-[7px] hidden h-3 w-3 -translate-y-1/2 rotate-45 border-t border-r border-line-strong bg-elev/60 lg:block"
                />
              )}
            </motion.li>
          ))}
        </ol>

        {/* Highlight */}
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 26 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 max-w-4xl text-[clamp(1.6rem,4.6vw,3.6rem)] leading-[1.06] font-medium tracking-[-0.04em] text-fg"
        >
          Single point of contact
          <br />
          <span className="ai-spectrum">from pitch to handoff.</span>
        </motion.p>

        <div className="mt-11">
          <Magnetic>
            <Link
              href="/marketing"
              data-cursor="magnet"
              className="group inline-flex items-center gap-2 rounded-full bg-fg px-7 py-4 font-mono text-[11.5px] tracking-[0.16em] text-bg uppercase transition-transform duration-300 hover:-translate-y-0.5"
            >
              Explore marketing
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
