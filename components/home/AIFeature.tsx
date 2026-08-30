'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import AIOrb from '@/components/ai/AIOrb';
import Aurora from '@/components/ai/Aurora';
import Magnetic from '@/components/ai/Magnetic';

export default function AIFeature() {
  const reduce = useReducedMotion();

  return (
    <section className="ai-noise relative overflow-hidden py-28 md:py-40">
      <Aurora
        blobs={[
          {
            color:
              'radial-gradient(circle, rgba(124,58,237,0.4), rgba(124,58,237,0) 70%)',
            className:
              'right-[-6%] top-[2%] h-[48vw] w-[48vw] min-h-[320px] min-w-[320px]',
            anim: 'aurora-b',
          },
          {
            color:
              'radial-gradient(circle, rgba(47,91,255,0.32), rgba(47,91,255,0) 70%)',
            className:
              'left-[-10%] bottom-[-8%] h-[44vw] w-[44vw] min-h-[300px] min-w-[300px]',
            anim: 'aurora-a',
          },
          {
            color:
              'radial-gradient(circle, rgba(229,57,155,0.24), rgba(229,57,155,0) 70%)',
            className:
              'left-[42%] top-[36%] h-[30vw] w-[30vw] min-h-[220px] min-w-[220px]',
            anim: 'aurora-c',
          },
        ]}
      />

      <div className="container-x relative">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-7 font-mono text-[11px] tracking-[0.24em] text-faint uppercase"
            >
              Artificial Intelligence
            </motion.p>

            <h2 className="text-[clamp(2rem,6.6vw,5.4rem)] leading-[0.94] font-medium tracking-[-0.05em]">
              <span className="sr-only">
                I don&rsquo;t just use AI. I build with it.
              </span>
              {["I DON'T JUST USE AI.", 'I BUILD WITH IT.'].map((line, i) => (
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

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-8 max-w-lg text-[17px] leading-relaxed text-muted md:text-xl"
            >
              AI-assisted development, research, automation, marketing and
              creative workflows.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-11"
            >
              <Magnetic>
                <Link
                  href="/ai"
                  data-cursor="magnet"
                  className="group inline-flex items-center gap-2 rounded-full bg-fg px-7 py-4 font-mono text-[11.5px] tracking-[0.16em] text-bg uppercase transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Enter AI lab
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    ↗
                  </span>
                </Link>
              </Magnetic>
            </motion.div>
          </div>

          {/* Orb — the whole thing is the link into /ai. */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.94 }}
            whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/ai"
              aria-label="Enter the AI lab"
              data-cursor="orb"
              className="group relative block aspect-square w-full max-w-[540px] justify-self-center"
            >
              <AIOrb />
              <span className="absolute inset-x-0 bottom-2 text-center font-mono text-[10.5px] tracking-[0.2em] text-faint uppercase transition-colors duration-400 group-hover:text-fg">
                Click to enter
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
