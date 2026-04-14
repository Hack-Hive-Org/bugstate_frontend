import Link from "next/link";

export default function PostNotFound() {
  return (
    <main className="container mx-auto px-4 py-24 text-center font-cabin">
      <h1 className="font-changa-one text-4xl md:text-5xl">Post not found</h1>
      <p className="mt-4 text-muted-foreground">
        The post you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Link
        href="/blogs"
        className="mt-8 inline-block rounded-md border bg-background px-5 py-2 text-sm font-medium transition-colors hover:bg-accent"
      >
        Browse all posts
      </Link>
    </main>
  );
}
