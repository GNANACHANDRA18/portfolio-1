import Link from 'next/link';
import { navigation } from '@/data/site';

export const metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden pt-40 pb-28">
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 opacity-60"
      />
      <div className="container-x relative">
        <p className="eyebrow mb-6">404</p>
        <h1 className="text-gradient max-w-3xl text-[clamp(2.2rem,6vw,5rem)] leading-[0.98] font-medium tracking-[-0.04em]">
          This page doesn&rsquo;t exist.
        </h1>
        <p className="mt-6 max-w-lg text-lg text-muted">
          The link may be old, or the page may have moved. Everything else is
          still here.
        </p>

        <ul className="mt-12 flex flex-wrap gap-2">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-block rounded-full border border-line px-4 py-2 text-[13.5px] text-muted transition-colors duration-300 hover:border-accent/50 hover:text-fg"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
