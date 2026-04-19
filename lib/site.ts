export const siteConfig = {
  name: "BugState",
  url: "https://bugstate.dev",
  ogImage: "/og-image.png",
  description:
    "We build websites, landing pages, mobile apps, ad campaigns, branded emails, and automation solutions that help businesses grow.",
  author: {
    name: "BugState",
    url: "https://bugstate.dev",
  },
  blog: {
    title: "BugState Blog",
    description:
      "Insights, tips, and trends on web development, digital marketing, and growing your business online.",
    postsPerPage: 12,
  },
  services: [
    "Website Development",
    "Ad Campaign",
    "Landing Pages",
    "Branded Emails",
    "Website Automation",
    "Mobile Application Development",
    "Web Designing",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
