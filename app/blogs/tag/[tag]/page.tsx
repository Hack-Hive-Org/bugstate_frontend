import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatPostDate,
  getAllTags,
  getPostsByTag,
} from "@/lib/posts";
import { siteConfig } from "@/lib/site";

type Props = {
  params: Promise<{ tag: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({
    tag: encodeURIComponent(tag.toLowerCase()),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getPostsByTag(decoded);
  if (posts.length === 0) return {};

  return {
    title: `#${decoded}`,
    description: `Posts tagged “${decoded}” on ${siteConfig.name}.`,
    alternates: { canonical: `/blogs/tag/${encodeURIComponent(decoded)}` },
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getPostsByTag(decoded);

  if (posts.length === 0) notFound();

  return (
    <main className="container mx-auto px-4 py-12 md:py-16 font-cabin">
      <header className="mx-auto mb-10 max-w-3xl text-center">
        <Link
          href="/blogs"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← All posts
        </Link>
        <h1 className="mt-4 font-changa-one text-4xl md:text-5xl tracking-tight">
          #{decoded}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </p>
      </header>

      <ul className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
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
              <h2 className="font-changa-one text-xl leading-tight transition-colors group-hover:text-primary">
                {post.frontmatter.title}
              </h2>
              <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                {post.frontmatter.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
