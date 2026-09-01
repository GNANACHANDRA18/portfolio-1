'use client';

import Image from 'next/image';
import { img } from '@/lib/media';
import { motion, useReducedMotion } from 'framer-motion';
import { site } from '@/data/site';

export default function SocialPresence() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
          <div>
            <h2 className="text-[clamp(2rem,6.2vw,5rem)] leading-[0.95] font-medium tracking-[-0.05em]">
              <span className="sr-only">Follow the journey.</span>
              {['FOLLOW THE', 'JOURNEY.'].map((line, i) => (
                <span
                  key={line}
                  aria-hidden
                  className="block overflow-hidden pb-[0.05em]"
                >
                  <motion.span
                    className={`block ${i === 1 ? 'ai-spectrum' : 'text-fg'}`}
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
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-10"
            >
              <p className="text-[20px] tracking-tight text-fg">
                {site.instagram.name}
              </p>
              <p className="mt-1.5 font-mono text-[14px] text-muted">
                {site.instagram.handle}
              </p>

              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="magnet"
                className="group mt-9 inline-flex items-center gap-2 rounded-full bg-fg px-7 py-4 font-mono text-[11.5px] tracking-[0.16em] text-bg uppercase transition-transform duration-300 hover:-translate-y-0.5"
              >
                Follow
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </a>
            </motion.div>
          </div>

          {/* Instagram-style frame around the portrait rather than a stock icon. */}
          <motion.a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="orb"
            aria-label={`Open ${site.instagram.handle} on Instagram`}
            initial={reduce ? false : { opacity: 0, y: 26, scale: 0.96 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="group relative mx-auto w-full max-w-[380px]"
          >
            {/* Gradient ring */}
            <span
              aria-hidden
              className="absolute -inset-[3px] rounded-[30px] bg-linear-to-tr from-ai-yellow via-ai-magenta to-ai-violet opacity-80 transition-opacity duration-500 group-hover:opacity-100"
            />

            <span className="relative block overflow-hidden rounded-[27px] border-[3px] border-bg bg-elev">
              <span className="relative block aspect-[576/647]">
                <Image
                  {...img('portrait')}
                  alt={site.portrait.alt}
                  fill
                  sizes="(max-width: 1024px) 88vw, 380px"
                  className="object-cover object-top transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent"
                />
              </span>

              <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-5">
                <span className="font-mono text-[11px] tracking-[0.14em] text-white">
                  {site.instagram.handle}
                </span>
                <span className="glass grid h-9 w-9 place-items-center rounded-full">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden
                    className="h-4 w-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                    <circle cx="12" cy="12" r="3.8" />
                    <circle
                      cx="17.2"
                      cy="6.8"
                      r="1"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>
                </span>
              </span>
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
