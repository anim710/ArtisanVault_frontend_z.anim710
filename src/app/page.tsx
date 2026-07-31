import { HeroSlider } from '@/components/home/HeroSlider';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { HighlightsSection } from '@/components/home/HighlightsSection';
import { StatsSection } from '@/components/home/StatsSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { FAQSection } from '@/components/home/FAQSection';
import { NewsletterCTASection } from '@/components/home/NewsletterCTASection';

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <CategoriesSection />
      <FeaturesSection />
      <HighlightsSection />
      <StatsSection />
      <TestimonialsSection />
      <FAQSection />
      <NewsletterCTASection />
    </>
  );
}
