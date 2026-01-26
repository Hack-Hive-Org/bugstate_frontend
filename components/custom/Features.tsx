import { Zap, Shield, Bell, Layers, Clock, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast SDK",
    description: "Integrate in under 5 minutes with our lightweight SDK. Available for JavaScript, Python, Java, Go, Ruby, and more.",
  },
  {
    icon: Shield,
    title: "Real-Time Error Detection",
    description: "Errors are captured and displayed on your dashboard within milliseconds. Never miss a critical issue again.",
  },
  {
    icon: Bell,
    title: "Instant Notifications",
    description: "Get email alerts the moment an error occurs. Configure custom rules to filter what matters most.",
  },
  {
    icon: Layers,
    title: "Multi-Project Support",
    description: "Manage unlimited projects from a single dashboard. Perfect for agencies and enterprise teams.",
  },
  {
    icon: Clock,
    title: "30-Day Log Retention",
    description: "Keep your error logs for 30 days on the free plan. Upgrade for extended retention up to 1 year.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Track error trends, resolution times, and team performance with detailed analytics and reports.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-medium">Features</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Everything you need to track bugs efficiently
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful features designed for modern development teams. From real-time tracking to AI-powered insights.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
