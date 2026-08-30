import AIScrollProgress from '@/components/ai/AIScrollProgress';

/**
 * /ai runs on its own surface. `.ai` re-declares the colour tokens for
 * everything inside it — a cooler, deeper room than the rest of the site —
 * so the shared utilities keep working while the accent shifts to blue-violet.
 *
 * The entry transition and custom cursor are mounted once in the root layout.
 */
export default function AILayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AIScrollProgress />
      {children}
    </div>
  );
}
