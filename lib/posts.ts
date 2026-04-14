import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { z } from "zod";

const CONTENT_DIR = path.join(process.cwd(), "content");

const FrontmatterSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD"),
  updated: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  author: z.string().default("BugState"),
  tags: z.array(z.string()).default([]),
  cover: z.string().optional(),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
});

export type Frontmatter = z.infer<typeof FrontmatterSchema>;

export type Post = {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
  readingTime: {
    text: string;
    minutes: number;
    words: number;
  };
};

export type PostSummary = Omit<Post, "content">;

let postsCache: Post[] | null = null;

function slugify(filename: string) {
  return filename.replace(/\.mdx$/i, "");
}

function readPostFile(filePath: string, slug: string): Post {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const parsed = FrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `${i.path.join(".") || "root"}: ${i.message}`)
      .join("; ");
    throw new Error(
      `Invalid frontmatter in content/${slug}.mdx — ${issues}`,
    );
  }

  return {
    slug,
    frontmatter: parsed.data,
    content,
    readingTime: readingTime(content),
  };
}

function loadAllPosts(): Post[] {
  if (postsCache && process.env.NODE_ENV === "production") {
    return postsCache;
  }

  if (!fs.existsSync(CONTENT_DIR)) {
    postsCache = [];
    return postsCache;
  }

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => /\.mdx$/i.test(f));

  const posts = files
    .map((file) => readPostFile(path.join(CONTENT_DIR, file), slugify(file)))
    .filter(
      (p) =>
        process.env.NODE_ENV !== "production" || !p.frontmatter.draft,
    )
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime(),
    );

  postsCache = posts;
  return posts;
}

export function getAllPosts(): PostSummary[] {
  return loadAllPosts().map(({ content: _content, ...rest }) => rest);
}

export function getPost(slug: string): Post | null {
  return loadAllPosts().find((p) => p.slug === slug) ?? null;
}

export function getAllSlugs(): string[] {
  return loadAllPosts().map((p) => p.slug);
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of loadAllPosts()) {
    for (const t of p.frontmatter.tags) {
      counts.set(t, (counts.get(t) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getPostsByTag(tag: string): PostSummary[] {
  const normalized = tag.toLowerCase();
  return getAllPosts().filter((p) =>
    p.frontmatter.tags.some((t) => t.toLowerCase() === normalized),
  );
}

export function getRelatedPosts(
  slug: string,
  limit = 3,
): PostSummary[] {
  const current = getPost(slug);
  if (!current) return [];

  const currentTags = new Set(
    current.frontmatter.tags.map((t) => t.toLowerCase()),
  );

  return getAllPosts()
    .filter((p) => p.slug !== slug)
    .map((p) => {
      const overlap = p.frontmatter.tags.filter((t) =>
        currentTags.has(t.toLowerCase()),
      ).length;
      return { post: p, overlap };
    })
    .sort((a, b) => {
      if (b.overlap !== a.overlap) return b.overlap - a.overlap;
      return (
        new Date(b.post.frontmatter.date).getTime() -
        new Date(a.post.frontmatter.date).getTime()
      );
    })
    .slice(0, limit)
    .map((x) => x.post);
}

export function formatPostDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
