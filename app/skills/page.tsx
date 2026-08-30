import Constellation, {
  type ConstellationNode,
} from '@/components/system/Constellation';
import SectionHead from '@/components/ai/SectionHead';
import Aurora from '@/components/ai/Aurora';
import SkillCard from '@/components/SkillCard';
import MagneticButton from '@/components/MagneticButton';
import Reveal from '@/components/Reveal';
import { skillGroups, techStack } from '@/data/skills';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Skills & Capabilities',
  description:
    'Capability map for Gnana Chandra across artificial intelligence, software development, marketing, creative production and business — described, never scored.',
  path: '/skills',
});

/** The capability map is derived from the same data the cards use. */
const nodes: ConstellationNode[] = skillGroups.map((group) => ({
  id: group.id,
  label: group.title.toUpperCase(),
  body: group.blurb,
  chain: group.skills.slice(0, 4),
}));

export default function SkillsPage() {
  const total = skillGroups.reduce((n, g) => n + g.skills.length, 0);

  return (
    <>
      <section className="ai-noise relative flex min-h-[76svh] items-center overflow-hidden pt-32 pb-16 md:pt-36">
        <Aurora
          blobs={[
            {
              color:
                'radial-gradient(circle, rgba(6,182,212,0.26), rgba(6,182,212,0) 70%)',
              className:
                'left-[-12%] top-[2%] h-[46vw] w-[46vw] min-h-[300px] min-w-[300px]',
              anim: 'aurora-a',
            },
            {
              color:
                'radial-gradient(circle, rgba(124,58,237,0.24), rgba(124,58,237,0) 70%)',
              className:
                'right-[-10%] bottom-[0%] h-[42vw] w-[42vw] min-h-[280px] min-w-[280px]',
              anim: 'aurora-b',
            },
          ]}
        />

        <div className="container-x relative w-full">
          <p className="mb-9 font-mono text-[10.5px] tracking-[0.26em] text-faint uppercase">
            Capability
          </p>
          <SectionHead
            lines={['WHAT I CAN', 'ACTUALLY DO.']}
            as="h1"
            accentLines={[1]}
            lede="Described rather than scored. A percentage on a skill bar is a number somebody invented — these are the areas the work actually happens in."
          />

          <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-line pt-7 sm:grid-cols-4">
            {[
              { label: 'Areas', value: String(total) },
              { label: 'Disciplines', value: String(skillGroups.length) },
              { label: 'Primary', value: 'AI × Software × Marketing' },
              { label: 'Source', value: 'data/skills.ts' },
            ].map((item) => (
              <div key={item.label}>
                <dt className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
                  {item.label}
                </dt>
                <dd className="mt-2 text-[14.5px] text-fg">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Capability map */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            eyebrow="The map"
            lines={['ONE PRACTICE,', 'FIVE BRANCHES.']}
            accentLines={[1]}
            align="center"
            className="mb-16"
          />
          <Constellation
            core="GNANA"
            coreNote="CAPABILITY"
            nodes={nodes}
            tint="var(--color-ai-cyan)"
            idleHint="Hover a branch to see what sits inside it."
          />
        </div>
      </section>

      {/* Detail */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            eyebrow="In detail"
            lines={['EVERY AREA,', 'IN FULL.']}
            accentLines={[1]}
            className="mb-12"
          />
          <div className="grid gap-5 lg:grid-cols-2">
            {skillGroups.map((group, i) => (
              <SkillCard
                key={group.id}
                group={group}
                index={i}
                defaultOpen={i === 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            eyebrow="Technology"
            lines={['TOOLS AND STACK.']}
            accentLines={[0]}
            className="mb-12"
          />
          <div className="grid gap-5 md:grid-cols-3">
            {techStack.map((group, i) => (
              <Reveal
                key={group.title}
                delay={i * 0.07}
                as="article"
                className="rounded-2xl border border-line bg-surface/60 p-7 md:p-8"
              >
                <h3 className="font-mono text-[11px] tracking-[0.16em] text-fg uppercase">
                  {group.title}
                </h3>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line bg-elev px-3.5 py-1.5 text-[13px] text-muted transition-colors duration-300 hover:border-accent/40 hover:text-fg"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Honesty */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="container-x">
          <Reveal className="max-w-3xl rounded-2xl border border-line bg-surface/60 p-8 md:p-10">
            <p className="mb-4 font-mono text-[10.5px] tracking-[0.2em] text-faint uppercase">
              A note on honesty
            </p>
            <p className="text-[16px] leading-relaxed text-muted md:text-[17px]">
              I&rsquo;m an AI practitioner and AI-powered developer — I build
              with these tools every day. I am not an AI researcher or a machine
              learning scientist, and nothing here claims a certification,
              partnership or qualification I do not hold.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            lines={['NEED SEVERAL', 'OF THESE AT ONCE?']}
            accentLines={[1]}
            lede="That combination is the whole proposition."
            className="mb-12"
          />
          <div className="flex flex-wrap gap-3">
            <MagneticButton href="/contact" variant="solid">
              Start a conversation
            </MagneticButton>
            <MagneticButton href="/work" variant="outline">
              See the work
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
