'use client';

import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { budgetRanges, projectTypes, timelines } from '@/data/services';

type Status = 'idle' | 'sending' | 'sent' | 'error';
type FieldName = 'name' | 'email' | 'projectType' | 'message';

/**
 * The contact form.
 *
 * Required fields validate on blur and again on submit, so a mistake is
 * caught where it was made rather than at the bottom of the form. Nothing is
 * faked: the success state only appears once the API has actually accepted
 * the submission.
 */

const base =
  'w-full rounded-lg border bg-elev/60 px-4 py-3 text-[15px] text-fg placeholder:text-faint transition-colors duration-300 focus:outline-none';

const fieldClass = `${base} border-line focus:border-accent/60`;
const invalidClass = `${base} border-red-500/60 focus:border-red-500`;
const validClass = `${base} border-accent/35 focus:border-accent/60`;

/** One rule per required field, so blur and submit can never disagree. */
const RULES: Record<FieldName, (value: string) => string> = {
  name: (v) => (v.trim().length < 2 ? 'Please enter your name.' : ''),
  email: (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
      ? ''
      : 'Please enter a valid email address.',
  projectType: (v) => (v ? '' : 'Please choose a project type.'),
  message: (v) =>
    v.trim().length < 10 ? 'Please add a little more detail.' : '',
};

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});

  const validateField = useCallback((name: FieldName, value: string) => {
    const message = RULES[name](value);
    setErrors((prev) => ({ ...prev, [name]: message }));
    return message;
  }, []);

  const onBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const name = e.target.name as FieldName;
    if (!(name in RULES)) return;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, e.target.value);
  };

  /** Clear a field's error as soon as the value becomes valid again. */
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const name = e.target.name as FieldName;
    if (!(name in RULES) || !touched[name]) return;
    validateField(name, e.target.value);
  };

  const stateOf = (name: FieldName) => {
    if (!touched[name]) return fieldClass;
    return errors[name] ? invalidClass : validClass;
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string
    >;

    // Validate everything before touching the network.
    const found: Partial<Record<FieldName, string>> = {};
    (Object.keys(RULES) as FieldName[]).forEach((name) => {
      const message = RULES[name](data[name] ?? '');
      if (message) found[name] = message;
    });

    setTouched({ name: true, email: true, projectType: true, message: true });
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setStatus('error');
      setError('Please check the highlighted fields.');
      form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }

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
      setErrors({});
      setTouched({});
      setStatus('sent');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setStatus('error');
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative rounded-2xl border border-line bg-surface/50 p-7 md:p-9"
      noValidate
    >
      {/* Honeypot — hidden from people, tempting to bots. */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" required error={errors.name}>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            onBlur={onBlur}
            onChange={onChange}
            className={stateOf('name')}
          />
        </Field>

        <Field label="Email" htmlFor="email" required error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            onBlur={onBlur}
            onChange={onChange}
            className={stateOf('email')}
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

        <Field
          label="Project type"
          htmlFor="projectType"
          required
          error={errors.projectType}
        >
          <select
            id="projectType"
            name="projectType"
            required
            defaultValue=""
            aria-invalid={Boolean(errors.projectType)}
            aria-describedby={errors.projectType ? 'projectType-error' : undefined}
            onBlur={onBlur}
            onChange={onChange}
            className={`${stateOf('projectType')} appearance-none`}
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

        <Field label="Budget range" htmlFor="budget" hint="Optional">
          <select
            id="budget"
            name="budget"
            defaultValue=""
            className={`${fieldClass} appearance-none`}
          >
            <option value="">Rather not say</option>
            {budgetRanges.map((range) => (
              <option key={range} value={range} className="bg-elev">
                {range}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Timeline" htmlFor="timeline" hint="Optional">
          <select
            id="timeline"
            name="timeline"
            defaultValue=""
            className={`${fieldClass} appearance-none`}
          >
            <option value="">Rather not say</option>
            {timelines.map((option) => (
              <option key={option} value={option} className="bg-elev">
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Message" htmlFor="message" required error={errors.message}>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="What are you trying to build, launch or improve?"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'message-error' : undefined}
            onBlur={onBlur}
            onChange={onChange}
            className={`${stateOf('message')} resize-y`}
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
          <span
            aria-hidden
            className={`transition-transform duration-300 ${
              status === 'sending' ? '' : 'group-hover:translate-x-1'
            }`}
          >
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
          {status === 'error' && error && (
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
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="eyebrow mb-2.5 block">
        {label}
        {required && <span className="text-accent"> *</span>}
        {hint && <span className="ml-2 text-faint normal-case">{hint}</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${htmlFor}-error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="mt-2 text-[13px] text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
