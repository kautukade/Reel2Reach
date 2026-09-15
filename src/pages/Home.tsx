import Hero from '../components/home/Hero';
import {
  ServicesSection,
  MarqueeSection,
  ProcessSection,
  PortfolioPreview,
  PackagesPreview,
  AddonsSection,
  InstagramSection,
  MetricsSection,
  CTABanner,
} from '../components/home/Sections';
import { CinematicStorySection, ReelShowcaseSection } from '../components/home/MotionShowcase';

export default function Home() {
  return (
    <>
      <Hero />
      <ReelShowcaseSection />
      <MarqueeSection />
      <ServicesSection />
      <CinematicStorySection />
      <PortfolioPreview />
      <MetricsSection />
      <ProcessSection />
      <CTABanner />
      <PackagesPreview />
      <AddonsSection />
      <InstagramSection />
    </>
  );
}
