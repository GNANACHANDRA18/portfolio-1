'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { projectTypes } from '@/data/services';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const fieldClass =
  'w-full rounded-lg border border-line bg-elev/60 px-4 py-3 text-[15px] text-fg placeholder:text-faint transition-colors duration-300 focus:border-accent/60 focus:outline-none';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus('sending');
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Something went wrong. Please try again.');
      }

      form.reset();
      setStatus('sent');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setStatus('error');
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-line bg-surface/50 p-7 md:p-9"
      noValidate
    >
      {/* Honeypot — hidden from people, tempting to bots. */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" required>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            className={fieldClass}
          />
        </Field>

        <Field label="Email" htmlFor="email" required>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={fieldClass}
          />
        </Field>

        <Field label="Company" htmlFor="company">
          <input
            id="company"
            name="company"
            autoComplete="organization"
            placeholder="Company or brand"
            className={fieldClass}
          />
        </Field>

        <Field label="Project type" htmlFor="projectType" required>
          <select
            id="projectType"
            name="projectType"
            required
            defaultValue=""
            className={`${fieldClass} appearance-none`}
          >
            <option value="" disabled>
              Select a project type
            </option>
            {projectTypes.map((type) => (
              <option key={type} value={type} className="bg-elev">
                {type}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Message" htmlFor="message" required>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="What are you trying to build, launch or improve?"
            className={`${fieldClass} resize-y`}
          />
        </Field>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          data-cursor="send"
          disabled={status === 'sending'}
          className="group inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Start a Conversation'}
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
          </span>
        </button>

        <AnimatePresence mode="wait">
          {status === 'sent' && (
            <motion.p
              key="sent"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="status"
              className="text-[14px] text-accent"
            >
              Message received. I&rsquo;ll get back to you.
            </motion.p>
          )}
          {status === 'error' && (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="alert"
              className="text-[14px] text-red-400"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="eyebrow mb-2.5 block">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      {children}
    </div>
  );
}
