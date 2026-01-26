import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, MessageSquare, Lightbulb, Zap } from "lucide-react";

const AISection = () => {
  return (
    <section className="py-24 hero-gradient overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-primary/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-primary font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            AI-Powered
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Let AI explain and solve your errors
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto">
            Our advanced AI analyzes each error, explains what went wrong in plain English, 
            and provides actionable solutions. No more hours spent on Stack Overflow.
          </p>
          
          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="glass-card rounded-xl p-6 text-left animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-primary-foreground mb-2">Plain English Explanations</h4>
              <p className="text-primary-foreground/70 text-sm">Understand complex errors without diving into documentation</p>
            </div>
            
            <div className="glass-card rounded-xl p-6 text-left animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-primary-foreground mb-2">Smart Solutions</h4>
              <p className="text-primary-foreground/70 text-sm">Get code suggestions and fixes tailored to your codebase</p>
            </div>
            
            <div className="glass-card rounded-xl p-6 text-left animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-primary-foreground mb-2">Instant Analysis</h4>
              <p className="text-primary-foreground/70 text-sm">Get AI-powered insights within seconds of error detection</p>
            </div>
          </div>
          
          {/* Stats Card */}
          <div className="inline-flex items-center gap-4 p-4 rounded-xl bg-primary/10 border border-primary/20 mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <span className="text-3xl font-bold text-primary">10</span>
            <div className="text-left">
              <p className="font-medium text-primary-foreground">Free AI analyses per month</p>
              <p className="text-sm text-primary-foreground/60">Included in the free plan</p>
            </div>
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <Button variant="default" size="lg">
              Try AI Analysis Free
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISection;
