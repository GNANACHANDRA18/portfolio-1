import Link from 'next/link';
import DevHero from '@/components/dev/DevHero';
import SystemStack from '@/components/dev/SystemStack';
import BuildAreas from '@/components/dev/BuildAreas';
import CodeToInterface from '@/components/dev/CodeToInterface';
import DebugPlayground from '@/components/dev/DebugPlayground';
import DeviceShowcase from '@/components/dev/DeviceShowcase';
import Constellation from '@/components/system/Constellation';
import PipelineDiagram from '@/components/system/PipelineDiagram';
import BigStatements from '@/components/system/BigStatements';
import ScrollSequence from '@/components/system/ScrollSequence';
import SectionHead from '@/components/ai/SectionHead';
import Aurora from '@/components/ai/Aurora';
import FlowStrip from '@/components/FlowStrip';
import MagneticButton from '@/components/MagneticButton';
import Reveal from '@/components/Reveal';
import {
  aiDevFlow,
  apiPipeline,
  businessChain,
  dataFlow,
  devProcess,
  engineeringPrinciples,
  exploringTags,
  performanceValues,
  projectHighlights,
  responsiveNotes,
  techNodes,
} from '@/data/development';
import { projects } from '@/data/projects';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Software Development',
  description:
    'Gnana Chandra builds websites, web applications, e-commerce experiences, AI applications and business systems — from idea to shipped product.',
  path: '/development',
});

export default function DevelopmentPage() {
  return (
    <>
      <DevHero />

      {/* The stack */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
            <SectionHead
              eyebrow="The system"
              lines={["I DON'T JUST", 'WRITE CODE.', 'I BUILD SYSTEMS.']}
              accentLines={[2]}
              lede="Interface, contract, rules, data. Getting the layers right is what keeps a product maintainable after launch."
            />
            <SystemStack />
          </div>
        </div>
      </section>

      {/* What I build */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            eyebrow="What I build"
            lines={['I BUILD DIGITAL', 'PRODUCTS.']}
            accentLines={[1]}
            className="mb-12"
          />
          <BuildAreas />
        </div>
      </section>

      {/* Process */}
      <section className="relative overflow-hidden bg-elev/60 py-24 md:py-36">
        <div aria-hidden className="ai-grid pointer-events-none absolute inset-0" />
        <div className="container-x relative">
          <SectionHead
            eyebrow="Process"
            lines={['HOW AN IDEA', 'BECOMES SOFTWARE.']}
            accentLines={[1]}
            lede="Seven stages. The first two decide whether the other five are worth doing."
            className="mb-14"
          />
          <FlowStrip steps={devProcess} />
        </div>
      </section>

      {/* AI-assisted */}
      <section className="ai-noise relative overflow-hidden py-28 md:py-40">
        <Aurora
          blobs={[
            {
              color:
                'radial-gradient(circle, rgba(124,58,237,0.3), rgba(124,58,237,0) 70%)',
              className:
                'right-[-8%] top-[4%] h-[42vw] w-[42vw] min-h-[280px] min-w-[280px]',
              anim: 'aurora-b',
            },
          ]}
        />
        <div className="container-x relative">
          <SectionHead
            eyebrow="AI + engineering"
            lines={['CODE FASTER.', 'THINK DEEPER.']}
            accentLines={[1]}
            lede="I use AI throughout the development process to accelerate research, implementation, debugging, documentation and experimentation."
            className="mb-14"
          />

          <FlowStrip steps={aiDevFlow} />

          <Reveal className="mt-12">
            <p className="max-w-2xl rounded-2xl border border-accent/30 bg-accent/[0.05] p-7 text-[16px] leading-relaxed text-fg md:text-[17px]">
              AI accelerates development.{' '}
              <span className="text-accent">
                Human judgment validates the result.
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Tech constellation */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            eyebrow="Stack"
            lines={['THE TECHNOLOGY', 'I WORK IN.']}
            accentLines={[1]}
            lede="Kept small and current. No proficiency scores — the data lives in one file so it stays easy to update."
            align="center"
            className="mb-16"
          />
          <Constellation
            core="GNANA"
            coreNote="THE STACK"
            nodes={techNodes}
            tint="var(--color-ai-blue)"
            idleHint="Hover a layer to see what sits inside it."
          />
        </div>
      </section>

      <CodeToInterface />

      {/* API */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            eyebrow="Systems"
            lines={['SYSTEMS TALK', 'TO EACH OTHER.']}
            accentLines={[1]}
            className="mb-14"
          />
          <PipelineDiagram steps={apiPipeline} initial={2} />
        </div>
      </section>

      {/* Data */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
            <SectionHead
              eyebrow="Data"
              lines={['DATA IS PART', 'OF THE PRODUCT.']}
              accentLines={[1]}
              lede="How information is modelled decides what the product can do a year later."
            />

            <div>
              <FlowStrip steps={dataFlow} />
              <Reveal className="mt-6">
                <div className="overflow-hidden rounded-2xl border border-line">
                  <div className="grid grid-cols-3 gap-px bg-line font-mono text-[10px] tracking-[0.14em] text-faint uppercase">
                    {['id', 'field', 'value'].map((h) => (
                      <span key={h} className="bg-elev/70 px-4 py-2.5">
                        {h}
                      </span>
                    ))}
                  </div>
                  {[
                    ['01', 'slug', 'matte-oak-600'],
                    ['02', 'category', 'surfaces'],
                    ['03', 'availability', 'in stock'],
                  ].map((row) => (
                    <div
                      key={row[0]}
                      className="grid grid-cols-3 gap-px border-t border-line bg-line text-[13px] text-muted"
                    >
                      {row.map((cell) => (
                        <span key={cell} className="bg-surface px-4 py-3">
                          {cell}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
                <p className="mt-3 font-mono text-[10px] tracking-[0.16em] text-faint uppercase">
                  Illustrative structure · not production data
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            eyebrow="Responsive"
            lines={['EVERY SCREEN', 'IS THE SCREEN.']}
            accentLines={[1]}
            className="mb-14"
          />
          <DeviceShowcase />
          <ul className="mt-10 flex flex-wrap gap-2">
            {responsiveNotes.map((note) => (
              <li
                key={note}
                className="rounded-full border border-line bg-surface/70 px-4 py-2 text-[13.5px] text-muted"
              >
                {note}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Development + business */}
      <section className="relative overflow-hidden bg-elev/60 py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            lines={["I DON'T BUILD", 'TECHNOLOGY', 'IN ISOLATION.']}
            accentLines={[2]}
            className="mb-14"
          />
          <FlowStrip steps={businessChain} />
          <Reveal className="mt-12">
            <p className="max-w-2xl text-[16px] leading-relaxed text-muted md:text-[18px]">
              Working across development and marketing helps me understand both
              what needs to be built and why it needs to exist.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Real projects */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            eyebrow="Shipped"
            lines={['REAL PROJECTS.', 'REAL BUSINESSES.']}
            accentLines={[1]}
            lede="Built by the Qyverix team. My contribution is set out on each case study."
            className="mb-14"
          />

          <div className="grid gap-4 md:grid-cols-3">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.07}>
                <Link
                  href={`/work/${project.slug}`}
                  data-cursor="view"
                  className="glass group flex h-full flex-col rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-1.5"
                >
                  <span className="font-mono text-[10px] tracking-[0.16em] text-faint uppercase">
                    {project.industry} · {project.year}
                  </span>
                  <span className="mt-5 block text-[20px] leading-tight font-medium tracking-[-0.03em] text-fg">
                    {project.name}
                  </span>
                  <ul className="mt-6 flex flex-1 flex-wrap content-start gap-2">
                    {projectHighlights[project.slug].map((h) => (
                      <li
                        key={h}
                        className="rounded-full border border-line bg-surface px-3 py-1 text-[12.5px] text-muted"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-7 font-mono text-[10px] tracking-[0.16em] text-faint uppercase">
                    Qyverix project
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="relative overflow-hidden pt-24 md:pt-32">
        <div className="container-x">
          <SectionHead
            eyebrow="Principles"
            lines={['HOW I BUILD.']}
            accentLines={[0]}
            className="mb-16"
          />
        </div>
        <BigStatements items={engineeringPrinciples} />
      </section>

      {/* Lab */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            eyebrow="Lab"
            lines={['CURRENTLY', 'EXPLORING.']}
            accentLines={[1]}
            lede="Areas I am actively learning and experimenting in — not a list of finished projects."
            className="mb-12"
          />
          <ul className="flex flex-wrap gap-3">
            {exploringTags.map((tag, i) => (
              <Reveal as="li" key={tag} delay={i * 0.05}>
                <span className="glass inline-block rounded-full px-5 py-3 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                  {tag}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Debugging */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            eyebrow="Debugging"
            lines={['SOMETHING BROKE.']}
            accentLines={[0]}
            lede="Most engineering time is spent here. Step through it."
            className="mb-12"
          />
          <DebugPlayground />
        </div>
      </section>

      {/* Performance */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            lines={['FAST IS A FEATURE.']}
            accentLines={[0]}
            className="mb-12"
          />
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {performanceValues.map((value) => (
              <li
                key={value}
                className="bg-surface/70 px-5 py-8 font-mono text-[11px] tracking-[0.14em] text-muted uppercase"
              >
                {value}
              </li>
            ))}
          </ul>
          <p className="mt-4 font-mono text-[10px] tracking-[0.16em] text-faint uppercase">
            Things I optimise for · no scores published here
          </p>
        </div>
      </section>

      {/* AI architecture */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            eyebrow="AI architecture"
            lines={['WHEN SOFTWARE', 'MEETS AI.']}
            accentLines={[1]}
            lede="The model is one component in a system, not the system. Most of the engineering sits around it."
            className="mb-12"
          />
          <FlowStrip
            steps={[
              'USER',
              'APPLICATION',
              'AI / LLM',
              'TOOLS · DATA · KNOWLEDGE',
              'VALIDATION',
              'RESULT',
            ]}
          />
          <div className="mt-12">
            <MagneticButton href="/ai" variant="solid" arrow="→">
              Explore AI
            </MagneticButton>
          </div>
        </div>
      </section>

      <ScrollSequence lines={['THINK IT.', 'BUILD IT.', 'SHIP IT.', 'IMPROVE IT.']} />

      {/* CTA */}
      <section className="ai-noise relative overflow-hidden py-28 md:py-40">
        <Aurora
          blobs={[
            {
              color:
                'radial-gradient(circle, rgba(47,91,255,0.32), rgba(47,91,255,0) 70%)',
              className:
                'left-[-8%] top-[6%] h-[42vw] w-[42vw] min-h-[280px] min-w-[280px]',
              anim: 'aurora-a',
            },
            {
              color:
                'radial-gradient(circle, rgba(6,182,212,0.26), rgba(6,182,212,0) 70%)',
              className:
                'right-[-6%] bottom-[4%] h-[38vw] w-[38vw] min-h-[260px] min-w-[260px]',
              anim: 'aurora-c',
            },
          ]}
        />
        <div className="container-x relative">
          <SectionHead
            lines={['HAVE A PRODUCT', 'IN MIND?']}
            accentLines={[1]}
            lede="Let's turn the idea into a working digital experience."
            className="mb-12"
          />
          <div className="flex flex-wrap gap-3">
            <MagneticButton href="/contact" variant="solid">
              Start a project
            </MagneticButton>
            <MagneticButton href="/work" variant="outline">
              View my work
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
