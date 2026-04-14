# Blog content

Blog posts live here as `.mdx` files. The filename (without extension) becomes
the URL slug: `my-post.mdx` → `/blogs/my-post`.

## Frontmatter

Every post must declare a YAML frontmatter block. Unknown fields are ignored;
validation runs at build time via `lib/posts.ts`.

```yaml
---
title: "Your post title"
description: "One-line summary shown in listings, meta tags, and RSS."
date: "2026-04-14"        # required, YYYY-MM-DD (publish date)
updated: "2026-04-20"     # optional, YYYY-MM-DD
author: "BugState"        # optional, defaults to "BugState"
tags:                     # optional, used for tag pages
  - Backend
  - Postgres
cover: "/covers/my.png"   # optional, absolute path under /public
draft: false              # optional; drafts are hidden in production
featured: false           # optional
---
```

## Authoring

- Write in standard MDX. GitHub-flavored Markdown (tables, task lists,
  strikethrough) is enabled.
- Code blocks are syntax highlighted via Shiki. Specify a language on the fence:
  ` ```ts `, ` ```bash `, etc.
- Internal links (`/foo`, `#bar`) are rendered with `next/link`; external links
  automatically open in a new tab with `rel="noopener noreferrer"`.
- Images should live under `/public` and be referenced by absolute path.

## Drafts

Set `draft: true` to hide a post in production. Drafts are still visible in
`next dev` so you can preview them.

## Publishing checklist

- [ ] Filename is lowercase, kebab-case, and unique
- [ ] `title`, `description`, `date` are present and correct
- [ ] `tags` are consistent with existing ones on `/blogs`
- [ ] Preview locally: `npm run dev`
- [ ] Build passes: `npm run build`
