'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { askPrompts } from '@/data/ai-page';

/**
 * "Explore how I use AI" — an interactive panel of pre-written answers.
 *
 * Nothing here calls a model. Typed input is matched against the preset
 * prompts by keyword; anything else returns a note saying so.
 */
export default function AskTheAI() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [missed, setMissed] = useState(false);

  const current = askPrompts.find((p) => p.id === active) ?? null;

  const select = (id: string) => {
    setActive(id);
    setMissed(false);
    setQuery('');
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) return;

    const hit = askPrompts.find((p) =>
      p.label
        .toLowerCase()
        .split(' ')
        .some((word) => word.length > 3 && q.includes(word)),
    );

    if (hit) {
      setActive(hit.id);
      setMissed(false);
    } else {
      setActive(null);
      setMissed(true);
    }
  };

  return (
    <div className="relative">
      <form
        onSubmit={onSubmit}
        className="glass flex flex-col gap-3 rounded-2xl p-3 sm:flex-row sm:items-center"
      >
        <label htmlFor="ai-ask" className="sr-only">
          What would you use AI for?
        </label>
        <input
          id="ai-ask"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What would you use AI for?"
          className="w-full flex-1 bg-transparent px-4 py-3 text-[16px] text-fg placeholder:text-faint focus:outline-none"
        />
        <button
          type="submit"
          data-cursor="magnet"
          className="rounded-xl bg-fg px-5 py-3 text-sm font-medium text-bg transition-transform duration-300 hover:-translate-y-0.5"
        >
          Explore
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        {askPrompts.map((prompt) => {
          const selected = prompt.id === active;
          return (
            <button
              key={prompt.id}
              type="button"
              data-cursor="magnet"
              onClick={() => select(prompt.id)}
              className={`rounded-full border px-4 py-2 text-[13.5px] transition-all duration-300 ${
                selected
                  ? 'border-ai-violet/50 bg-ai-violet/10 text-ai-violet'
                  : 'border-line bg-elev/70 text-muted hover:-translate-y-0.5 hover:border-line-strong hover:text-fg'
              }`}
            >
              {prompt.label}
            </button>
          );
        })}
      </div>

      <p className="mt-4 font-mono text-[10.5px] tracking-[0.14em] text-faint uppercase">
        Scripted demonstration · no model is called
      </p>

      <AnimatePresence mode="wait">
        {missed && (
          <motion.div
            key="missed"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="mt-6 rounded-2xl border border-line bg-elev/70 p-6"
          >
            <p className="text-[15px] leading-relaxed text-muted">
              This panel only holds pre-written answers — pick one of the
              prompts above to see how that kind of work actually runs.
            </p>
          </motion.div>
        )}

        {current && (
          <motion.div
            key={current.id}
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 overflow-hidden rounded-2xl border border-line bg-elev/70 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 border-b border-line px-6 py-4">
              <span className="font-mono text-[10.5px] tracking-[0.16em] text-faint uppercase">
                You
              </span>
              <span className="text-[15px] text-fg">{current.question}</span>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className="grid h-6 w-6 place-items-center rounded-md bg-linear-to-br from-ai-blue to-ai-violet font-mono text-[9px] tracking-[0.1em] text-white"
                >
                  AI
                </span>
                <span className="font-mono text-[10.5px] tracking-[0.16em] text-faint uppercase">
                  How it runs
                </span>
              </div>

              <ol className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-3">
                {current.flow.map((step, i) => (
                  <motion.li
                    key={step}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.08 + i * 0.08 }}
                    className="flex items-center gap-2"
                  >
                    <span className="rounded-lg border border-line bg-elev px-3 py-1.5 text-[13.5px] text-fg">
                      {step}
                    </span>
                    {i < current.flow.length - 1 && (
                      <span aria-hidden className="text-faint">
                        &rarr;
                      </span>
                    )}
                  </motion.li>
                ))}
              </ol>

              <motion.p
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="mt-7 max-w-2xl text-[15.5px] leading-relaxed text-muted"
              >
                {current.answer}
              </motion.p>

              <motion.div
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="mt-7 border-t border-line pt-6"
              >
                <p className="mb-3 font-mono text-[10.5px] tracking-[0.16em] text-faint uppercase">
                  Skills involved
                </p>
                <ul className="flex flex-wrap gap-2">
                  {current.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-line bg-elev px-3.5 py-1.5 text-[13px] text-muted"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
