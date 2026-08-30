import Reveal from './Reveal';

/** Compact bordered list used for capability and feature enumerations. */
export default function BulletGrid({
  items,
  columns = 3,
  numbered = false,
}: {
  items: string[];
  columns?: 2 | 3 | 4;
  numbered?: boolean;
}) {
  const cols =
    columns === 2
      ? 'sm:grid-cols-2'
      : columns === 4
        ? 'sm:grid-cols-2 lg:grid-cols-4'
        : 'sm:grid-cols-2 lg:grid-cols-3';

  return (
    <ul className={`grid gap-px overflow-hidden rounded-xl border border-line bg-line ${cols}`}>
      {items.map((item, i) => (
        <Reveal
          as="li"
          key={item}
          delay={Math.min(i * 0.035, 0.3)}
          y={12}
          className="group flex items-center gap-3 bg-surface/60 px-5 py-4 transition-colors duration-400 hover:bg-elev"
        >
          {numbered ? (
            <span className="font-mono text-[10.5px] tracking-[0.16em] text-faint">
              {String(i + 1).padStart(2, '0')}
            </span>
          ) : (
            <span
              aria-hidden
              className="h-1 w-1 shrink-0 rounded-full bg-faint transition-colors duration-400 group-hover:bg-accent"
            />
          )}
          <span className="text-[14.5px] text-muted transition-colors duration-400 group-hover:text-fg">
            {item}
          </span>
        </Reveal>
      ))}
    </ul>
  );
}
