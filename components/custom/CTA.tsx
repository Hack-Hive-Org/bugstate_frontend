import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 hero-gradient">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
            Ready to squash bugs smarter?
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who trust bugstate to catch, analyze, and resolve errors faster than ever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" size="lg">
              Start Free Today
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg">
              Schedule a Demo
            </Button>
          </div>
          <p className="mt-6 text-sm text-primary-foreground/60">
            No credit card required. Free forever plan available.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
