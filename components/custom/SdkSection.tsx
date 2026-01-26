"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

const sdkLanguages = [
  {
    name: "JavaScript",
    icon: "JS",
    color: "bg-yellow-500",
    code: `import { BugTrack } from '@bugtrack/js';

BugTrack.init({
  apiKey: 'YOUR_API_KEY',
  project: 'my-app'
});

// Errors are automatically captured!`,
  },
  {
    name: "Python",
    icon: "PY",
    color: "bg-blue-500",
    code: `from bugtrack import BugTrack

BugTrack.init(
    api_key="YOUR_API_KEY",
    project="my-app"
)

# Errors are automatically captured!`,
  },
  {
    name: "Java",
    icon: "JV",
    color: "bg-orange-500",
    code: `import com.bugtrack.BugTrack;

BugTrack.init(
    "YOUR_API_KEY",
    "my-app"
);

// Errors are automatically captured!`,
  },
  {
    name: "Go",
    icon: "GO",
    color: "bg-cyan-500",
    code: `import "github.com/bugtrack/go"

func main() {
    bugtrack.Init(bugtrack.Config{
        APIKey:  "YOUR_API_KEY",
        Project: "my-app",
    })
}`,
  },
  {
    name: "Ruby",
    icon: "RB",
    color: "bg-red-500",
    code: `require 'bugtrack'

BugTrack.init(
  api_key: 'YOUR_API_KEY',
  project: 'my-app'
)

# Errors are automatically captured!`,
  },
  {
    name: "PHP",
    icon: "PHP",
    color: "bg-purple-500",
    code: `<?php
use BugTrack\\BugTrack;

BugTrack::init([
    'apiKey' => 'YOUR_API_KEY',
    'project' => 'my-app'
]);

// Errors are automatically captured!`,
  },
];

const SDKSection = () => {
  const [activeSDK, setActiveSDK] = useState(sdkLanguages[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSDK.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="sdk" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-medium">SDK Integration</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Integrate in minutes, not hours
          </h2>
          <p className="text-lg text-muted-foreground">
            Our lightweight SDKs support all major programming languages. Just a few lines of code and you're ready to go.
          </p>
        </div>

        {/* SDK Selector */}
        <div className="max-w-4xl mx-auto">
          {/* Language Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {sdkLanguages.map((sdk) => (
              <button
                key={sdk.name}
                onClick={() => setActiveSDK(sdk)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeSDK.name === sdk.name
                    ? "bg-primary text-primary-foreground"
                    : "bg-background hover:bg-accent text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className={`w-6 h-6 rounded text-xs font-bold flex items-center justify-center text-primary-foreground ${sdk.color}`}>
                  {sdk.icon}
                </span>
                {sdk.name}
              </button>
            ))}
          </div>

          {/* Code Block */}
          <div className="relative rounded-2xl bg-foreground overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-secondary border-b border-border/20">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-chart-4/60" />
                <div className="w-3 h-3 rounded-full bg-primary/60" />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="text-muted hover:text-primary-foreground hover:bg-muted/20"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>

            {/* Code */}
            <pre className="p-6 overflow-x-auto">
              <code className="text-sm font-mono text-primary-foreground/90">
                {activeSDK.code}
              </code>
            </pre>
          </div>

          {/* Install Command */}
          <div className="mt-6 text-center">
            <p className="text-muted-foreground mb-2">Install via package manager:</p>
            <code className="inline-block px-4 py-2 rounded-lg bg-background font-mono text-sm text-foreground">
              npm install @bugtrack/{activeSDK.name.toLowerCase()}
            </code>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SDKSection;
