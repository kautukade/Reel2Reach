import Hero from '../components/home/Hero';
import { ServicesSection, MarqueeSection, EditorialSection, ProcessSection, PortfolioPreview, PackagesPreview, AddonsSection, InstagramSection, MetricsSection, CTABanner } from '../components/home/Sections';

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeSection />
      <ServicesSection />
      <EditorialSection />
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
