import HomeHero from '@/components/home/HomeHero';
import EditorialStatement from '@/components/home/EditorialStatement';
import IdentitySwitcher from '@/components/home/IdentitySwitcher';
import GnanaSystem from '@/components/home/GnanaSystem';
import AIFeature from '@/components/home/AIFeature';
import SoftwareShowcase from '@/components/home/SoftwareShowcase';
import QyverixSection from '@/components/home/QyverixSection';
import WorkPanels from '@/components/home/WorkPanels';
import CreativeTrio from '@/components/home/CreativeTrio';
import WorkflowTimeline from '@/components/home/WorkflowTimeline';
import SocialPresence from '@/components/home/SocialPresence';
import PhilosophySequence from '@/components/home/PhilosophySequence';
import HomeFinalCTA from '@/components/home/HomeFinalCTA';

/**
 * Home runs the default `.lux` surface — near-black with the warm gold
 * accent. SurfaceShell applies the tokens and hands the surface to the custom
 * pointer mounted in the root layout.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <EditorialStatement />
      <IdentitySwitcher />
      <GnanaSystem />
      <AIFeature />
      <SoftwareShowcase />
      <QyverixSection />
      <WorkPanels />
      <CreativeTrio />
      <WorkflowTimeline />
      <SocialPresence />
      <PhilosophySequence />
      <HomeFinalCTA />
    </>
  );
}
