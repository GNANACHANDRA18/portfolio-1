'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const OPTIONS = [
  { id: 'website', label: 'WEBSITE', tint: 'var(--color-ai-blue)' },
  { id: 'software', label: 'SOFTWARE', tint: 'var(--color-ai-violet)' },
  { id: 'ai', label: 'AI', tint: 'var(--color-ai-cyan)' },
  { id: 'automation', label: 'AUTOMATION', tint: 'var(--color-ai-magenta)' },
  { id: 'marketing', label: 'MARKETING', tint: 'var(--color-ai-yellow)' },
  { id: 'creative', label: 'CREATIVE', tint: 'var(--color-ai-pink)' },
];

/**
 * The options a conversation usually starts from. Hovering one tints the
 * section; selecting one scrolls to the form and pre-fills the project type.
 */
export default function ContactOptions() {
  const [hot, setHot] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const current = OPTIONS.find((o) => o.id === hot);

  const choose = (label: string) => {
    const select = document.getElementById(
      'projectType',
    ) as HTMLSelectElement | null;
    if (select) {
      // Map the display label onto the form's own vocabulary.
      const match = Array.from(select.options).find((opt) =>
        opt.value.toUpperCase().startsWith(label.slice(0, 4)),
      );
      if (match) select.value = match.value;
    }
    document
      .getElementById('contact-form')
      ?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <div className="relative">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-x-8 -inset-y-16"
        animate={{
          background: current
            ? `radial-gradient(62% 58% at 50% 50%, color-mix(in oklab, ${current.tint} 14%, transparent), transparent 72%)`
            : 'transparent',
        }}
        transition={{ duration: 0.6 }}
      />

      <ul
        className="relative flex flex-wrap gap-3"
        onMouseLeave={() => setHot(null)}
      >
        {OPTIONS.map((option, i) => (
          <motion.li
            key={option.id}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <button
              type="button"
              data-cursor="orb"
              onMouseEnter={() => setHot(option.id)}
              onFocus={() => setHot(option.id)}
              onClick={() => choose(option.label)}
              className="group relative overflow-hidden rounded-full border border-line bg-surface/70 px-6 py-3.5 font-mono text-[11.5px] tracking-[0.16em] text-muted uppercase backdrop-blur-md transition-all duration-400 hover:-translate-y-1 hover:text-fg"
              style={
                hot === option.id
                  ? {
                      borderColor: `color-mix(in oklab, ${option.tint} 55%, transparent)`,
                    }
                  : undefined
              }
            >
              <span
                aria-hidden
                className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(120deg, color-mix(in oklab, ${option.tint} 18%, transparent), transparent 70%)`,
                }}
              />
              {option.label}
            </button>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
