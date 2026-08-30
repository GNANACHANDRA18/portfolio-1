'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

/** Routes that announce themselves with a word before the page arrives. */
const WORDS: { match: (p: string) => boolean; word: string; tint: string }[] = [
  { match: (p) => p.startsWith('/ai'), word: 'AI', tint: '#8b5cf6' },
  { match: (p) => p.startsWith('/work'), word: 'WORK', tint: '#3b6bff' },
  { match: (p) => p.startsWith('/about'), word: 'GNANA', tint: '#22d3ee' },
  { match: (p) => p.startsWith('/development'), word: 'BUILD', tint: '#22d3ee' },
  { match: (p) => p.startsWith('/marketing'), word: 'GROW', tint: '#e5399b' },
  { match: (p) => p.startsWith('/contact'), word: 'TALK', tint: '#e9b872' },
];

export default function RouteIntro() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [active, setActive] = useState<(typeof WORDS)[number] | null>(null);
  const seen = useRef(new Set<string>());

  useEffect(() => {
    if (reduce) return;

    const hit = WORDS.find((w) => w.match(pathname));
    // Play once per route per session so back-navigation stays instant.
    if (!hit || seen.current.has(pathname)) return;

    seen.current.add(pathname);
    setActive(hit);
    const id = window.setTimeout(() => setActive(null), 900);
    return () => window.clearTimeout(id);
  }, [pathname, reduce]);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={pathname}
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[92] grid place-items-center"
          style={{ background: '#050505' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(58% 52% at 50% 50%, ${active.tint}26, transparent 70%)`,
            }}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1.65, opacity: [0, 1, 0.15] }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          />

          <motion.span
            className="ai-spectrum font-mono text-[clamp(2.6rem,12vw,9rem)] tracking-[0.14em]"
            initial={{ opacity: 0, scale: 0.84, filter: 'blur(14px)' }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.84, 1, 1.03, 2.3],
              filter: ['blur(14px)', 'blur(0px)', 'blur(0px)', 'blur(16px)'],
            }}
            transition={{
              duration: 0.9,
              times: [0, 0.3, 0.6, 1],
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {active.word}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
