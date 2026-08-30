import AIHero from '@/components/ai/AIHero';
import SectionHead from '@/components/ai/SectionHead';
import AskTheAI from '@/components/ai/AskTheAI';
import AIConstellation from '@/components/ai/AIConstellation';
import AITransformation from '@/components/ai/AITransformation';
import AISoftware from '@/components/ai/AISoftware';
import AIMarketing from '@/components/ai/AIMarketing';
import AICreativity from '@/components/ai/AICreativity';
import AutomationPlayground from '@/components/ai/AutomationPlayground';
import AIArchitecture from '@/components/ai/AIArchitecture';
import RAGPipeline from '@/components/ai/RAGPipeline';
import AIAgents from '@/components/ai/AIAgents';
import AIToolOrbit from '@/components/ai/AIToolOrbit';
import HumanPlusAI from '@/components/ai/HumanPlusAI';
import AIQuality from '@/components/ai/AIQuality';
import AIProjectLab from '@/components/ai/AIProjectLab';
import AIPhilosophy from '@/components/ai/AIPhilosophy';
import AIFinalCTA from '@/components/ai/AIFinalCTA';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'AI — Think With AI, Build With AI',
  description:
    'How Gnana Chandra works with artificial intelligence in practice: AI-assisted development, research, content, automation, agents, RAG and AI-powered applications — with human judgment in control.',
  path: '/ai',
});

export default function AIPage() {
  return (
    <>
      <AIHero />

      {/* Explore how I use AI */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            eyebrow="Interactive"
            lines={['EXPLORE HOW', 'I USE AI.']}
            accentLines={[1]}
            lede="Pick a kind of work and see how it actually runs — the sequence, the thinking, and where a person takes over."
            className="mb-12"
          />
          <AskTheAI />
        </div>
      </section>

      {/* One AI layer */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            eyebrow="The layer"
            lines={['ONE AI LAYER.', 'MANY POSSIBILITIES.']}
            accentLines={[1]}
            lede="Eight kinds of work, one underlying practice. AI does something different in each — hover a node to see what."
            align="center"
            className="mb-16"
          />
          <AIConstellation />
        </div>
      </section>

      {/* Scroll-driven workflow */}
      <section className="relative pt-24 md:pt-36">
        <div className="container-x">
          <SectionHead
            eyebrow="The workflow"
            lines={['QUESTION IN.', 'JUDGMENT OUT.']}
            accentLines={[1]}
            lede="Six stages, in order. AI is fastest at the start and least trustworthy at the end, so review sits before implementation — never after."
            className="mb-4"
          />
        </div>
      </section>
      <AITransformation />

      <AISoftware />
      <AIMarketing />
      <AICreativity />
      <AutomationPlayground />
      <AIArchitecture />
      <RAGPipeline />
      <AIAgents />
      <AIToolOrbit />
      <HumanPlusAI />
      <AIQuality />
      <AIProjectLab />
      <AIPhilosophy />
      <AIFinalCTA />
    </>
  );
}
