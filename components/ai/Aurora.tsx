type Blob = {
  color: string;
  className: string;
  anim: 'aurora-a' | 'aurora-b' | 'aurora-c';
  delay?: string;
};

/**
 * Slow-moving blurred colour fields. Purely decorative, GPU-composited,
 * frozen entirely when reduced motion is requested (handled in CSS).
 */
export default function Aurora({
  blobs,
  className = '',
}: {
  blobs: Blob[];
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {blobs.map((blob, i) => (
        <div
          key={i}
          className={`aurora ${blob.anim} ${blob.className}`}
          style={{
            background: blob.color,
            animationDelay: blob.delay,
          }}
        />
      ))}
    </div>
  );
}
