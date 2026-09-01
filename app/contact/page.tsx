import SectionHead from '@/components/ai/SectionHead';
import Aurora from '@/components/ai/Aurora';
import ContactForm from '@/components/ContactForm';
import ContactOptions from '@/components/contact/ContactOptions';
import PortraitCard from '@/components/PortraitCard';
import SocialCard from '@/components/SocialCard';
import Reveal from '@/components/Reveal';
import { site } from '@/data/site';
import { pageMetadata } from '@/lib/seo';
import PlateBackdrop from '@/components/media/PlateBackdrop';
import { routePlate } from '@/data/visuals';

export const metadata = pageMetadata({
  title: 'Contact',
  description:
    'Start a conversation with Gnana Chandra about a website, software product, AI application, automation, marketing, social media, video or branding project.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      {/* Opening */}
      <section className="ai-noise relative flex min-h-[92svh] items-center overflow-hidden pt-32 pb-16 md:pt-36">
        <PlateBackdrop src={routePlate.contact} treatment="vignette" priority drift duration={36} />
        <Aurora
          blobs={[
            {
              color:
                'radial-gradient(circle, rgba(47,91,255,0.28), rgba(47,91,255,0) 70%)',
              className:
                'left-[-12%] top-[4%] h-[46vw] w-[46vw] min-h-[300px] min-w-[300px]',
              anim: 'aurora-a',
            },
            {
              color:
                'radial-gradient(circle, rgba(124,58,237,0.22), rgba(124,58,237,0) 70%)',
              className:
                'right-[-10%] bottom-[2%] h-[42vw] w-[42vw] min-h-[280px] min-w-[280px]',
              anim: 'aurora-b',
            },
          ]}
        />

        <div className="container-x relative z-10 w-full">
          <p className="mb-9 font-mono text-[10.5px] tracking-[0.26em] text-faint uppercase">
            Contact
          </p>

          <SectionHead
            lines={['WHAT ARE', 'WE BUILDING?']}
            as="h1"
            accentLines={[1]}
            lede="Have a product idea, website, marketing challenge or AI workflow you want to explore?"
            className="mb-14"
          />

          <ContactOptions />
        </div>
      </section>

      {/* Form */}
      <section id="contact-form" className="relative scroll-mt-28 overflow-hidden py-20 md:py-28">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
            <div>
              <p className="mb-8 font-mono text-[11px] tracking-[0.2em] text-faint uppercase">
                Start a conversation
              </p>
              <ContactForm />
            </div>

            <div className="space-y-5">
              <Reveal>
                <PortraitCard priority />
              </Reveal>

              <Reveal delay={0.04}>
                <div className="card-sheen relative overflow-hidden rounded-2xl border border-line bg-surface/70 p-7">
                  <p className="mb-5 font-mono text-[10.5px] tracking-[0.2em] text-faint uppercase">
                    Direct
                  </p>

                  <a
                    href={site.email.href}
                    data-cursor="magnet"
                    className="group flex items-center justify-between gap-4 border-b border-line pb-4"
                  >
                    <span>
                      <span className="block text-[12px] text-faint">Email</span>
                      <span className="mt-1 block font-mono text-[15px] text-fg transition-colors duration-300 group-hover:text-accent">
                        {site.email.display}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
                    >
                      &rarr;
                    </span>
                  </a>

                  <a
                    href={`tel:${site.phone.tel}`}
                    data-cursor="magnet"
                    className="group flex items-center justify-between gap-4 border-b border-line py-4"
                  >
                    <span>
                      <span className="block text-[12px] text-faint">Phone</span>
                      <span className="mt-1 block font-mono text-[15px] text-fg transition-colors duration-300 group-hover:text-accent">
                        {site.phone.display}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
                    >
                      &rarr;
                    </span>
                  </a>

                  <a
                    href={site.phone.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="magnet"
                    className="group flex items-center justify-between gap-4 pt-4"
                  >
                    <span>
                      <span className="block text-[12px] text-faint">
                        WhatsApp
                      </span>
                      <span className="mt-1 block font-mono text-[15px] text-fg transition-colors duration-300 group-hover:text-accent">
                        {site.phone.display}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
                    >
                      &rarr;
                    </span>
                  </a>

                  <p className="mt-6 border-t border-line pt-5 text-[14px] leading-relaxed text-muted">
                    I read every message. If there is a fit, you&rsquo;ll hear
                    back with questions rather than a brochure.
                  </p>
                </div>
              </Reveal>

              <SocialCard />
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="ai-noise relative flex min-h-[70svh] items-center overflow-hidden py-24 md:py-32">
        <Aurora
          blobs={[
            {
              color:
                'radial-gradient(circle, rgba(229,57,155,0.26), rgba(229,57,155,0) 70%)',
              className:
                'left-[26%] top-[10%] h-[44vw] w-[44vw] min-h-[280px] min-w-[280px]',
              anim: 'aurora-c',
            },
          ]}
        />
        <div className="container-x relative text-center">
          <p className="ai-spectrum text-[clamp(2.4rem,10vw,8.5rem)] leading-[0.9] font-medium tracking-[-0.055em]">
            LET&rsquo;S BUILD IT.
          </p>
          <p className="mt-10 font-mono text-[10.5px] tracking-[0.2em] text-faint uppercase">
            {site.name} · {site.role}
          </p>
        </div>
      </section>
    </>
  );
}
