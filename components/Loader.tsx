'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const STEPS = ['GNANA', 'CHEBOLU GNANACHANDRA', 'SOFTWARE × AI × MARKETING'];

/**
 * Short opening sequence. Runs once per browser session — a reload inside the
 * same tab skips it, so it never becomes a toll on repeat visits.
 */
export default function Loader() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(true);
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce) return;

    let seen = false;
    try {
      seen = sessionStorage.getItem('gc-intro') === '1';
    } catch {
      // Private mode or blocked storage — just play it.
    }
    if (seen) return;

    setDone(false);
    try {
      sessionStorage.setItem('gc-intro', '1');
    } catch {
      /* ignore */
    }

    const start = performance.now();
    const DURATION = 1400;
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      // Ease out so the counter decelerates into 100.
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      setStep(t < 0.34 ? 0 : t < 0.68 ? 1 : 2);
      if (t < 1) raf = requestAnimationFrame(tick);
      else window.setTimeout(() => setDone(true), 260);
    };

    raf = requestAnimationFrame(tick);
    document.body.style.overflow = 'hidden';

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = '';
    };
  }, [reduce]);

  useEffect(() => {
    if (done) document.body.style.overflow = '';
  }, [done]);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          aria-hidden
          className="fixed inset-0 z-[99] grid place-items-center bg-[#050505]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative w-full px-6 text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={step}
                initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={
                  step === 0
                    ? 'ai-spectrum text-[clamp(3rem,13vw,9rem)] leading-none font-medium tracking-[-0.055em]'
                    : step === 1
                      ? 'text-[clamp(1.1rem,3.6vw,2.4rem)] leading-none font-medium tracking-[-0.03em] text-fg'
                      : 'font-mono text-[clamp(0.7rem,1.9vw,1rem)] tracking-[0.26em] text-muted uppercase'
                }
              >
                {STEPS[step]}
              </motion.p>
            </AnimatePresence>

            <div className="mx-auto mt-14 w-full max-w-xs">
              <div className="h-px w-full bg-line">
                <motion.div
                  className="h-px bg-linear-to-r from-ai-blue via-ai-violet to-ai-cyan"
                  style={{ width: `${count}%` }}
                />
              </div>
              <p className="mt-4 font-mono text-[11px] tracking-[0.2em] text-faint tabular-nums">
                {String(count).padStart(3, '0')}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
