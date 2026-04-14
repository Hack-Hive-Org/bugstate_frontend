import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getAllTags, formatPostDate } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: siteConfig.blog.title,
  description: siteConfig.blog.description,
  alternates: {
    canonical: "/blogs",
    types: {
      "application/rss+xml": [
        { url: "/rss.xml", title: `${siteConfig.name} RSS Feed` },
      ],
    },
  },
  openGraph: {
    title: siteConfig.blog.title,
    description: siteConfig.blog.description,
    url: `${siteConfig.url}/blogs`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.blog.title,
    description: siteConfig.blog.description,
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const tags = getAllTags();
  const [featured, ...rest] = posts;

  return (
    <main className="container mx-auto px-4 py-12 md:py-16 font-cabin">
      <header className="mx-auto mb-12 max-w-3xl text-center">
        <h1 className="font-changa-one text-4xl md:text-5xl tracking-tight">
          {siteConfig.blog.title}
        </h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          {siteConfig.blog.description}
        </p>
      </header>

      {tags.length > 0 && (
        <nav
          aria-label="Topics"
          className="mx-auto mb-12 flex max-w-4xl flex-wrap justify-center gap-2"
        >
          {tags.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/blogs/tag/${encodeURIComponent(tag.toLowerCase())}`}
              className="rounded-full border bg-background px-3 py-1 text-sm transition-colors hover:bg-accent"
            >
              {tag}
              <span className="ml-1.5 text-muted-foreground">{count}</span>
            </Link>
          ))}
        </nav>
      )}

      {posts.length === 0 ? (
        <p className="mx-auto max-w-xl rounded-lg border border-dashed p-10 text-center text-muted-foreground">
          No posts yet. Check back soon.
        </p>
      ) : (
        <>
          {featured && (
            <Link
              href={`/blogs/${featured.slug}`}
              className="group mx-auto mb-12 block max-w-5xl overflow-hidden rounded-2xl border bg-card transition-shadow hover:shadow-lg"
            >
              <div className="p-8 md:p-10">
                <div className="mb-3 flex items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground">
                  <span className="rounded-full bg-primary px-2 py-0.5 text-primary-foreground">
                    Latest
                  </span>
                  <time dateTime={featured.frontmatter.date}>
                    {formatPostDate(featured.frontmatter.date)}
                  </time>
                  <span aria-hidden>·</span>
                  <span>{featured.readingTime.text}</span>
                </div>
                <h2 className="font-changa-one text-2xl md:text-3xl leading-tight transition-colors group-hover:text-primary">
                  {featured.frontmatter.title}
                </h2>
                <p className="mt-3 text-muted-foreground md:text-lg">
                  {featured.frontmatter.description}
                </p>
                {featured.frontmatter.tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {featured.frontmatter.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border bg-background px-2.5 py-0.5 text-xs text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          )}

          {rest.length > 0 && (
            <ul className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="group flex h-full flex-col rounded-xl border bg-card p-6 transition-shadow hover:shadow-md"
                  >
                    <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                      <time dateTime={post.frontmatter.date}>
                        {formatPostDate(post.frontmatter.date)}
                      </time>
                      <span aria-hidden>·</span>
                      <span>{post.readingTime.text}</span>
                    </div>
                    <h3 className="font-changa-one text-xl leading-tight transition-colors group-hover:text-primary">
                      {post.frontmatter.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                      {post.frontmatter.description}
                    </p>
                    {post.frontmatter.tags.length > 0 && (
                      <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                        {post.frontmatter.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </main>
  );
}
