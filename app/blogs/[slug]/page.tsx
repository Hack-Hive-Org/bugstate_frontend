import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  formatPostDate,
  getAllSlugs,
  getPost,
  getRelatedPosts,
} from "@/lib/posts";
import { mdxOptions } from "@/lib/mdx";
import { mdxComponents } from "@/components/MDXProvider";
import { siteConfig } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = `${siteConfig.url}/blogs/${post.slug}`;
  const ogImage = post.frontmatter.cover ?? siteConfig.ogImage;

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    keywords: post.frontmatter.tags,
    authors: [{ name: post.frontmatter.author }],
    alternates: { canonical: `/blogs/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url,
      siteName: siteConfig.name,
      publishedTime: post.frontmatter.date,
      modifiedTime: post.frontmatter.updated ?? post.frontmatter.date,
      authors: [post.frontmatter.author],
      tags: post.frontmatter.tags,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, 3);
  const url = `${siteConfig.url}/blogs/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.updated ?? post.frontmatter.date,
    author: {
      "@type": "Person",
      name: post.frontmatter.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}${siteConfig.ogImage}`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: post.frontmatter.tags.join(", "),
  };

  return (
    <main className="container mx-auto px-4 py-12 md:py-16 font-cabin">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-3xl">
        <div className="mb-6">
          <Link
            href="/blogs"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← All posts
          </Link>
        </div>

        <header className="mb-10 border-b pb-8">
          {post.frontmatter.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {post.frontmatter.tags.map((t) => (
                <Link
                  key={t}
                  href={`/blogs/tag/${encodeURIComponent(t.toLowerCase())}`}
                  className="rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground transition-colors hover:bg-accent"
                >
                  {t}
                </Link>
              ))}
            </div>
          )}
          <h1 className="font-changa-one text-3xl md:text-5xl leading-tight tracking-tight">
            {post.frontmatter.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {post.frontmatter.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span>{post.frontmatter.author}</span>
            <span aria-hidden>·</span>
            <time dateTime={post.frontmatter.date}>
              {formatPostDate(post.frontmatter.date)}
            </time>
            <span aria-hidden>·</span>
            <span>{post.readingTime.text}</span>
            {post.frontmatter.updated && (
              <>
                <span aria-hidden>·</span>
                <span>
                  Updated {formatPostDate(post.frontmatter.updated)}
                </span>
              </>
            )}
          </div>
        </header>

        <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-changa-one prose-pre:border prose-pre:bg-muted/40 prose-img:rounded-lg">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={mdxOptions}
          />
        </div>
      </article>

      {related.length > 0 && (
        <aside className="mx-auto mt-20 max-w-5xl border-t pt-12">
          <h2 className="font-changa-one text-2xl mb-6">Related posts</h2>
          <ul className="grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/blogs/${r.slug}`}
                  className="group flex h-full flex-col rounded-xl border bg-card p-5 transition-shadow hover:shadow-md"
                >
                  <time
                    dateTime={r.frontmatter.date}
                    className="text-xs text-muted-foreground"
                  >
                    {formatPostDate(r.frontmatter.date)}
                  </time>
                  <h3 className="mt-1 font-changa-one text-lg leading-tight transition-colors group-hover:text-primary">
                    {r.frontmatter.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {r.frontmatter.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </main>
  );
}
