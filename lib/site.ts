export const siteConfig = {
  name: "BugState",
  url: "https://bugstate.dev",
  ogImage: "/og-image.png",
  description:
    "Deep-dive articles on backend engineering, distributed systems, and the craft of building production software.",
  author: {
    name: "BugState",
    url: "https://bugstate.dev",
  },
  blog: {
    title: "BugState Blog",
    description:
      "Essays, tutorials, and notes on backend engineering and modern architecture.",
    postsPerPage: 12,
  },
} as const;

export type SiteConfig = typeof siteConfig;
