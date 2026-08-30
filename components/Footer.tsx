'use client';

import Link from 'next/link';
import { site } from '@/data/site';
import Signal from '@/components/Signal';

const LINKS = [
  { href: '/about', label: 'About' },
  { href: '/ai', label: 'AI' },
  { href: '/development', label: 'Development' },
  { href: '/marketing', label: 'Marketing' },
  { href: '/work', label: 'Work' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 overflow-hidden">
      <Signal speed={11} />

      <div className="container-x py-20 md:py-28">
        {/* Wordmark */}
        <p className="text-[clamp(1.9rem,7.4vw,6.4rem)] leading-[0.9] font-medium tracking-[-0.055em] text-fg">
          CHEBOLU
          <br />
          <span className="text-gradient">GNANACHANDRA</span>
        </p>

        <p className="mt-7 font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
          Software × AI × Business × Marketing × Creativity
        </p>
        <p className="mt-2 font-mono text-[11px] tracking-[0.16em] text-faint uppercase">
          Software Developer · AI Practitioner · CMO · Creative Technologist
        </p>

        <div className="mt-16 flex flex-col gap-10 border-t border-line pt-8 md:flex-row md:items-start md:justify-between">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-7 gap-y-3">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    data-cursor="magnet"
                    className="group inline-flex items-center gap-1.5 font-mono text-[11.5px] tracking-[0.16em] text-muted uppercase transition-colors duration-300 hover:text-fg"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="magnet"
                  className="group inline-flex items-center gap-1.5 font-mono text-[11.5px] tracking-[0.16em] text-muted uppercase transition-colors duration-300 hover:text-fg"
                >
                  Instagram
                  <span
                    aria-hidden
                    className="text-[10px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    ↗
                  </span>
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex flex-col gap-2 md:items-end">
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[13px] text-fg transition-colors duration-300 hover:text-accent"
            >
              {site.instagram.handle}
            </a>
            <a
              href={`tel:${site.phone.tel}`}
              className="font-mono text-[13px] text-muted transition-colors duration-300 hover:text-accent"
            >
              {site.phone.display}
            </a>
            <a
              href={site.company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[13px] text-muted transition-colors duration-300 hover:text-accent"
            >
              {site.company.name}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[10.5px] tracking-[0.18em] text-faint uppercase">
            © {year} Gnana Chandra
          </p>
          {/* Hover swaps the line for the version that says what it really is. */}
          <p className="group relative font-mono text-[10.5px] tracking-[0.18em] text-faint uppercase">
            <span className="transition-opacity duration-500 group-hover:opacity-0">
              Built with curiosity. Powered by technology.
            </span>
            <span
              aria-hidden
              className="absolute inset-0 flex items-center justify-end text-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:justify-end"
            >
              Built with curiosity + AI + code
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
