import Footer from "@/components/ui/footer";
import HeroSection from "@/components/ui/hero-section";
import ServicesSection from "@/components/ui/services-section";
import FeaturesSection from "@/components/ui/features-section";
import CTASection from "@/components/ui/cta-section";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
}
