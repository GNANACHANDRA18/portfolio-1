'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navigation, site } from '@/data/site';
import Signal from '@/components/Signal';

const groupLabels: Record<string, string> = {
  main: 'Overview',
  practice: 'Practice',
  profile: 'Profile',
};

/** The compact bar shown on desktop. */
const BAR = [
  { href: '/about', label: 'About' },
  { href: '/ai', label: 'AI' },
  { href: '/development', label: 'Development' },
  { href: '/marketing', label: 'Marketing' },
  { href: '/work', label: 'Work' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const grouped = (['main', 'practice', 'profile'] as const).map((group) => ({
    group,
    items: navigation.filter((item) => item.group === group),
  }));

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[80]"
      >
        <nav
          aria-label="Primary"
          className="container-x flex items-center justify-between gap-6 pt-4 md:pt-5"
        >
          {/* Wordmark */}
          <Link
            href="/"
            data-cursor="magnet"
            aria-label={`${site.shortName} — home`}
            className={`group flex items-center gap-2.5 rounded-full px-3 py-2.5 transition-all duration-500 sm:px-3.5 ${
              scrolled || open
                ? 'glass shadow-[0_10px_36px_-22px_rgba(0,0,0,0.85)]'
                : 'border border-transparent'
            }`}
          >
            <span className="relative grid h-7 w-7 place-items-center overflow-hidden rounded-md border border-line text-[12px] font-semibold tracking-tight transition-colors duration-300 group-hover:border-accent/50">
              <span className="accent-gradient">GC</span>
              {/* The signal runs through the mark on hover. */}
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-linear-to-r from-transparent via-accent to-transparent transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
              />
            </span>
            <span className="font-mono text-[10px] tracking-[0.16em] text-fg uppercase sm:text-[11px] sm:tracking-[0.18em]">
              Gnana Chandra
            </span>
          </Link>

          {/* Floating pill */}
          <div
            className={`hidden items-center gap-0.5 rounded-full px-1.5 py-1.5 transition-all duration-500 lg:flex ${
              scrolled
                ? 'glass shadow-[0_10px_36px_-22px_rgba(0,0,0,0.85)]'
                : 'border border-transparent'
            }`}
          >
            {BAR.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-cursor="magnet"
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={`relative rounded-full px-3.5 py-2 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors duration-300 ${
                  isActive(item.href) ? 'text-fg' : 'text-muted hover:text-fg'
                }`}
              >
                {isActive(item.href) && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full border border-line bg-elev"
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
                {item.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              data-cursor="magnet"
              className={`hidden items-center gap-1.5 rounded-full px-4 py-2.5 font-mono text-[11px] tracking-[0.14em] text-fg uppercase transition-all duration-500 sm:inline-flex ${
                scrolled || open
                  ? 'glass shadow-[0_10px_36px_-22px_rgba(0,0,0,0.85)]'
                  : 'border border-line-strong'
              } hover:border-accent/60`}
            >
              Let&rsquo;s talk
              <span aria-hidden className="text-[10px]">
                ↗
              </span>
            </Link>

            <button
              type="button"
              data-cursor="magnet"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="nav-panel"
              className={`flex items-center gap-2 rounded-full px-3.5 py-2.5 font-mono text-[11px] tracking-[0.14em] text-muted uppercase transition-all duration-500 hover:text-fg ${
                scrolled || open
                  ? 'glass shadow-[0_10px_36px_-22px_rgba(0,0,0,0.85)]'
                  : 'border border-line-strong'
              }`}
            >
              <span aria-hidden className="grid gap-[3px]">
                <span
                  className={`block h-px w-3.5 bg-current transition-transform duration-300 ${open ? 'translate-y-[4px] rotate-45' : ''}`}
                />
                <span
                  className={`block h-px w-3.5 bg-current transition-opacity duration-300 ${open ? 'opacity-0' : ''}`}
                />
                <span
                  className={`block h-px w-3.5 bg-current transition-transform duration-300 ${open ? '-translate-y-[4px] -rotate-45' : ''}`}
                />
              </span>
              {open ? 'Close' : 'Menu'}
            </button>
          </div>
        </nav>

        {/* THE SIGNAL — marks the header edge once the page has moved. */}
        <div
          aria-hidden
          className={`mt-4 transition-opacity duration-700 ${
            scrolled && !open ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Signal speed={9} />
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="nav-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[75] overflow-y-auto overscroll-contain bg-bg/94 backdrop-blur-2xl"
          >
            <div className="container-x flex min-h-full flex-col justify-center pt-24 pb-12">
              <div className="grid gap-10 md:grid-cols-3 md:gap-8">
                {grouped.map((section, gi) => (
                  <div key={section.group}>
                    <p className="eyebrow mb-5">{groupLabels[section.group]}</p>
                    <ul className="space-y-1">
                      {section.items.map((item, i) => (
                        <motion.li
                          key={item.href}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.05 + gi * 0.05 + i * 0.035,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          <Link
                            href={item.href}
                            className="group flex flex-col gap-0.5 rounded-lg px-3 py-2.5 transition-colors duration-300 hover:bg-elev"
                          >
                            <span
                              className={`text-lg tracking-tight md:text-xl ${
                                isActive(item.href) ? 'text-accent' : 'text-fg'
                              }`}
                            >
                              {item.label}
                            </span>
                            <span className="text-[13px] text-faint transition-colors duration-300 group-hover:text-muted">
                              {item.description}
                            </span>
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="hairline mt-10 flex flex-wrap items-center justify-between gap-4 pt-6">
                <p className="text-[13px] text-faint">{site.longRole}</p>
                <div className="flex flex-wrap gap-5">
                  <a
                    href={site.email.href}
                    className="font-mono text-[13px] text-muted transition-colors hover:text-accent"
                  >
                    {site.email.display}
                  </a>
                  <a
                    href={`tel:${site.phone.tel}`}
                    className="font-mono text-[13px] text-muted transition-colors hover:text-accent"
                  >
                    {site.phone.display}
                  </a>
                  <a
                    href={site.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-muted transition-colors hover:text-accent"
                  >
                    {site.instagram.handle}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
