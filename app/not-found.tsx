import { navigation } from '@/data/site';
import ChipCloud from '@/components/ChipCloud';

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

        <ChipCloud
          className="mt-12"
          items={navigation.map((item) => ({ label: item.label, href: item.href }))}
        />
      </div>
    </section>
  );
}
