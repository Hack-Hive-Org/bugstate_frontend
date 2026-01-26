import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center  overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 hero-gradient" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent-foreground/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-1 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-primary">AI-Powered Error Tracking</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <span className="text-white">Track, Analyze &</span>
            <br />
            <span className="text-gradient">Resolve Bugs Faster</span>
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Integrate our SDK in minutes. Let AI explain your errors and suggest solutions. 
            Get real-time notifications and manage all your projects in one dashboard.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Button variant="default" size="lg">
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg">
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </div>
          
          <div className="mt-16 flex items-center gap-8 justify-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary-foreground">10K+</p>
              <p className="text-sm text-primary-foreground/60">Developers</p>
            </div>
            <div className="w-px h-12 bg-primary-foreground/20" />
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary-foreground">50M+</p>
              <p className="text-sm text-primary-foreground/60">Errors Tracked</p>
            </div>
            <div className="w-px h-12 bg-primary-foreground/20" />
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary-foreground">99.9%</p>
              <p className="text-sm text-primary-foreground/60">Uptime</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
