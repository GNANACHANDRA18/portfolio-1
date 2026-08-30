import { site } from '@/data/site';
import Reveal from './Reveal';

/** Instagram card — the only social account listed, as provided. */
export default function SocialCard() {
  return (
    <Reveal>
      <a
        href={site.instagram.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card-sheen group flex flex-col gap-8 rounded-2xl border border-line bg-surface/50 p-8 transition-colors duration-500 hover:border-accent/40 md:flex-row md:items-center md:justify-between md:p-10"
      >
        <div className="flex items-center gap-5">
          <span
            aria-hidden
            className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-line bg-elev transition-colors duration-500 group-hover:border-accent/50"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 text-fg transition-colors duration-500 group-hover:text-accent"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
            </svg>
          </span>
          <div>
            <p className="eyebrow mb-2">Instagram</p>
            <p className="text-xl tracking-tight text-fg md:text-2xl">
              {site.instagram.name}
            </p>
            <p className="mt-1 font-mono text-[13px] text-muted">
              {site.instagram.handle}
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-2 self-start rounded-full border border-line px-5 py-2.5 text-sm text-fg transition-colors duration-300 group-hover:border-accent/60 group-hover:bg-accent/10 md:self-auto">
          Follow on Instagram
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </span>
      </a>
    </Reveal>
  );
}
