
import FeaturesSection from "@/components/custom/Features";
import Header from "../components/custom/Header";
import Hero from "../components/custom/Hero";
import AISection from "@/components/custom/AISection";
import SDKSection from "@/components/custom/SdkSection";
import PricingSection from "@/components/custom/Pricing";
import CTASection from "@/components/custom/CTA";
import Footer from "@/components/custom/Footer";

export default function Home() {
  return (
    <div className="">
      <Header/>
     <Hero/>
     <FeaturesSection/>
     <AISection/>
     <SDKSection/>
     <PricingSection/>
     <CTASection/>
     <Footer/>
    </div>
  );
}