import Image from 'next/image';
import { img } from '@/lib/media';
import SectionHead from '@/components/ai/SectionHead';
import Aurora from '@/components/ai/Aurora';
import FlowStrip from '@/components/FlowStrip';
import BulletGrid from '@/components/BulletGrid';
import PostAnatomy from '@/components/social/PostAnatomy';
import CadenceGrid from '@/components/social/CadenceGrid';
import ReelWall from '@/components/ReelWall';
import MagneticButton from '@/components/MagneticButton';
import Reveal from '@/components/Reveal';
import { socialCapabilities } from '@/data/services';
import { socialFlow } from '@/data/experience';
import { site } from '@/data/site';
import { pageMetadata } from '@/lib/seo';
import PlateBackdrop from '@/components/media/PlateBackdrop';
import { routePlate } from '@/data/visuals';

export const metadata = pageMetadata({
  title: 'Social Media & Digital Presence',
  description:
    'Social media management, content planning, content strategy and brand communication across LinkedIn and Instagram by Gnana Chandra.',
  path: '/social-media',
});

export default function SocialMediaPage() {
  return (
    <>
      <section className="ai-noise relative flex min-h-[82svh] items-center overflow-hidden pt-32 pb-16 md:pt-36">
        <PlateBackdrop src={routePlate.social} treatment="vignette" priority drift duration={30} />
        <Aurora
          blobs={[
            {
              color:
                'radial-gradient(circle, rgba(229,57,155,0.26), rgba(229,57,155,0) 70%)',
              className:
                'right-[-10%] top-[6%] h-[44vw] w-[44vw] min-h-[300px] min-w-[300px]',
              anim: 'aurora-b',
            },
            {
              color:
                'radial-gradient(circle, rgba(255,197,61,0.2), rgba(255,197,61,0) 70%)',
              className:
                'left-[-8%] bottom-[4%] h-[38vw] w-[38vw] min-h-[260px] min-w-[260px]',
              anim: 'aurora-a',
            },
          ]}
        />

        <div className="container-x relative z-10 w-full">
          <p className="mb-9 font-mono text-[10.5px] tracking-[0.26em] text-faint uppercase">
            Social
          </p>
          <SectionHead
            lines={['PRESENCE IS', 'A SYSTEM.']}
            as="h1"
            accentLines={[1]}
            lede="Content that has a job: making a brand legible to people who have never heard of it, on the platforms where they already are."
          />
        </div>
      </section>

      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            eyebrow="Capabilities"
            lines={['MANAGING PRESENCE,', 'NOT JUST POSTING.']}
            accentLines={[1]}
            className="mb-12"
          />
          <BulletGrid items={socialCapabilities} columns={3} />
        </div>
      </section>

      <section className="relative overflow-hidden bg-elev/60 py-24 md:py-36">
        <div aria-hidden className="ai-grid pointer-events-none absolute inset-0" />
        <div className="container-x relative">
          <SectionHead
            eyebrow="Content workflow"
            lines={['RESEARCH TO', 'IMPROVEMENT.']}
            accentLines={[1]}
            lede="The last two steps are the ones most people skip — and the reason their content plateaus."
            className="mb-14"
          />
          <FlowStrip steps={socialFlow} />
        </div>
      </section>

      {/* The system, shown twice: one post taken apart, then a month of them. */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            eyebrow="Anatomy"
            lines={['A POST IS', 'FIVE DECISIONS.']}
            accentLines={[1]}
            lede="Nothing here is written on instinct — every part of a post is there for a stated reason."
            className="mb-14"
          />
          <PostAnatomy />
        </div>
      </section>

      <section className="relative overflow-hidden bg-elev/60 py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            eyebrow="Cadence"
            lines={['SLOTS FIRST.', 'IDEAS SECOND.']}
            accentLines={[1]}
            lede="A calendar that repeats is what keeps content going in a week where nothing feels inspiring."
            className="mb-14"
          />
          <CadenceGrid />
        </div>
      </section>

      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            eyebrow="Platforms"
            lines={['WHERE THE WORK', 'HAPPENS.']}
            accentLines={[1]}
            className="mb-12"
          />

          <div className="grid gap-5 md:grid-cols-2">
            <Reveal as="article" className="glass rounded-3xl p-8 md:p-9">
              <p className="font-mono text-[11px] tracking-[0.2em] text-faint uppercase">
                LinkedIn
              </p>
              <h3 className="mt-6 text-[clamp(1.3rem,3vw,2rem)] leading-tight font-medium tracking-[-0.035em] text-fg">
                Company voice and business development
              </h3>
              <p className="mt-4 text-[14.5px] leading-relaxed text-muted">
                As CMO at {site.company.name} I develop the LinkedIn content —
                the positioning, the proof, and the posts that make the company
                credible to a prospect before a call ever happens.
              </p>
            </Reveal>

            <Reveal
              delay={0.07}
              as="article"
              className="glass rounded-3xl p-8 md:p-9"
            >
              <p className="font-mono text-[11px] tracking-[0.2em] text-faint uppercase">
                Instagram
              </p>
              <h3 className="mt-6 text-[clamp(1.3rem,3vw,2rem)] leading-tight font-medium tracking-[-0.035em] text-fg">
                Personal presence and creative output
              </h3>
              <p className="mt-4 text-[14.5px] leading-relaxed text-muted">
                Short-form, creative and visual work under my own name — where
                the video and content side of the practice is most visible.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Published reels — the content work itself, not a description of it. */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            eyebrow="Published"
            lines={['THE CONTENT', 'ITSELF.']}
            accentLines={[1]}
            lede="Reels published on Instagram, embedded from the original posts — the caption, the view count and the account stay where they belong."
            className="mb-14"
          />
          <ReelWall />
          <div className="mt-10">
            <MagneticButton href={site.instagram.url} external variant="outline">
              See every reel on Instagram
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Editorial social card */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <div className="grid gap-14 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:gap-20">
            <div>
              <SectionHead
                lines={['FOLLOW THE', 'JOURNEY.']}
                accentLines={[1]}
              />
              <p className="mt-10 text-[20px] tracking-tight text-fg">
                {site.instagram.name}
              </p>
              <p className="mt-1.5 font-mono text-[14px] text-muted">
                {site.instagram.handle}
              </p>
              <div className="mt-10">
                <MagneticButton href={site.instagram.url} external variant="solid">
                  Follow the journey
                </MagneticButton>
              </div>
              <p className="mt-8 font-mono text-[10px] tracking-[0.16em] text-faint uppercase">
                Only verified profiles are listed here
              </p>
            </div>

            <Reveal>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="follow"
                aria-label={`Open ${site.instagram.handle} on Instagram`}
                className="group relative mx-auto block w-full max-w-[380px]"
              >
                <span
                  aria-hidden
                  className="absolute -inset-[3px] rounded-[30px] bg-linear-to-tr from-ai-yellow via-ai-magenta to-ai-violet opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span className="relative block overflow-hidden rounded-[27px] border-[3px] border-bg bg-elev">
                  <span className="relative block aspect-[576/647]">
                    <Image
                      {...img('portrait')}
                      alt={site.portrait.alt}
                      fill
                      sizes="(max-width: 1024px) 88vw, 380px"
                      className="object-cover object-top transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent"
                    />
                  </span>
                  <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-5">
                    <span className="font-mono text-[11px] tracking-[0.14em] text-white">
                      {site.instagram.handle}
                    </span>
                    <span className="glass grid h-9 w-9 place-items-center rounded-full text-white">
                      ↗
                    </span>
                  </span>
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            lines={['NEED A CONTENT SYSTEM,', 'NOT A CONTENT PERSON?']}
            accentLines={[1]}
            lede="Strategy, planning and production built to repeat every week without falling over."
            className="mb-12"
          />
          <div className="flex flex-wrap gap-3">
            <MagneticButton href="/contact" variant="solid">
              Start a conversation
            </MagneticButton>
            <MagneticButton href="/marketing" variant="outline">
              See the marketing role
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
