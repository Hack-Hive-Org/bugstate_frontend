import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const posts = getAllPosts();
  const lastBuild =
    posts[0]?.frontmatter.updated ?? posts[0]?.frontmatter.date;

  const items = posts
    .map((post) => {
      const url = `${siteConfig.url}/blogs/${post.slug}`;
      const pubDate = new Date(
        `${post.frontmatter.date}T00:00:00Z`,
      ).toUTCString();
      const categories = post.frontmatter.tags
        .map((t) => `      <category>${escapeXml(t)}</category>`)
        .join("\n");
      return `    <item>
      <title>${escapeXml(post.frontmatter.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.frontmatter.description)}</description>
      <author>${escapeXml(post.frontmatter.author)}</author>
${categories}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.blog.title)}</title>
    <link>${siteConfig.url}/blogs</link>
    <description>${escapeXml(siteConfig.blog.description)}</description>
    <language>en-us</language>
    <atom:link href="${siteConfig.url}/rss.xml" rel="self" type="application/rss+xml" />
${lastBuild ? `    <lastBuildDate>${new Date(`${lastBuild}T00:00:00Z`).toUTCString()}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
