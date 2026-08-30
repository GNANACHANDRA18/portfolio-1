import SectionHead from '@/components/ai/SectionHead';
import Aurora from '@/components/ai/Aurora';
import EditTimeline from '@/components/video/EditTimeline';
import VideoGallery from '@/components/VideoGallery';
import BulletGrid from '@/components/BulletGrid';
import MagneticButton from '@/components/MagneticButton';
import Reveal from '@/components/Reveal';
import { videoWork } from '@/data/services';
import { site } from '@/data/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Video Editing & Creative Content',
  description:
    'Video editing and creative content by Gnana Chandra — social media video, promotional and brand films, short-form content and reels.',
  path: '/video-editing',
});

export default function VideoEditingPage() {
  return (
    <>
      <section className="ai-noise relative flex min-h-[86svh] items-center overflow-hidden pt-32 pb-16 md:pt-36">
        <Aurora
          blobs={[
            {
              color:
                'radial-gradient(circle, rgba(124,58,237,0.28), rgba(124,58,237,0) 70%)',
              className:
                'left-[-12%] top-[2%] h-[46vw] w-[46vw] min-h-[300px] min-w-[300px]',
              anim: 'aurora-a',
            },
            {
              color:
                'radial-gradient(circle, rgba(255,197,61,0.2), rgba(255,197,61,0) 70%)',
              className:
                'right-[-10%] bottom-[2%] h-[40vw] w-[40vw] min-h-[280px] min-w-[280px]',
              anim: 'aurora-b',
            },
          ]}
        />

        <div className="container-x relative w-full">
          <p className="mb-9 font-mono text-[10.5px] tracking-[0.26em] text-faint uppercase">
            Creative
          </p>
          <SectionHead
            lines={['THE CUT IS', 'THE CRAFT.']}
            as="h1"
            accentLines={[1]}
            lede="I create and edit video content for digital communication, social media and brand storytelling."
          />
        </div>
      </section>

      <EditTimeline />

      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            eyebrow="Formats"
            lines={['WHAT I CUT.']}
            accentLines={[0]}
            lede="Different lengths, different platforms, same discipline: hold attention or lose it in the first two seconds."
            className="mb-12"
          />
          <BulletGrid items={videoWork} columns={3} />
        </div>
      </section>

      <section className="relative overflow-hidden bg-elev/60 py-24 md:py-36">
        <div aria-hidden className="ai-grid pointer-events-none absolute inset-0" />
        <div className="container-x relative">
          <SectionHead
            eyebrow="Reel"
            lines={['SELECTED', 'VIDEO WORK.']}
            accentLines={[1]}
            lede="This gallery is built to fill as pieces are published. Nothing here is placeholder work dressed up as a finished edit."
            className="mb-12"
          />
          <VideoGallery />

          <Reveal className="mt-8">
            <p className="text-[13px] leading-relaxed text-faint">
              Adding a piece takes one entry in{' '}
              <code className="rounded border border-line bg-surface px-1.5 py-0.5 font-mono text-[12px] text-muted">
                data/videos.ts
              </code>{' '}
              — a title, category and either a hosted embed URL or a video file.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            eyebrow="How AI fits"
            lines={['FASTER TO THE CONCEPT.', 'STILL HAND-CUT.']}
            accentLines={[1]}
            className="mb-12"
          />

          <div className="grid gap-5 md:grid-cols-2">
            <Reveal className="rounded-3xl border border-line bg-surface/60 p-8">
              <h3 className="text-[18px] leading-snug tracking-tight text-fg">
                Where AI helps
              </h3>
              <p className="mt-4 text-[14.5px] leading-relaxed text-muted">
                Concepting, scripting, hook variations and visual references —
                the exploratory front half, where volume of options genuinely
                improves the outcome.
              </p>
            </Reveal>

            <Reveal
              delay={0.07}
              className="rounded-3xl border border-accent/30 bg-accent/[0.05] p-8"
            >
              <h3 className="text-[18px] leading-snug tracking-tight text-fg">
                Where it does not
              </h3>
              <p className="mt-4 text-[14.5px] leading-relaxed text-muted">
                Timing, rhythm and the decision to cut a frame earlier. That is
                taste, and it stays on the timeline with a human on it.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            lines={['VIDEO WORTH', 'MAKING?']}
            accentLines={[1]}
            lede="Short-form, brand film, promotional or a campaign that needs a consistent creative hand."
            className="mb-12"
          />
          <div className="flex flex-wrap gap-3">
            <MagneticButton href="/contact" variant="solid">
              Start a conversation
            </MagneticButton>
            <MagneticButton href={site.instagram.url} external variant="outline">
              See creative work
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
