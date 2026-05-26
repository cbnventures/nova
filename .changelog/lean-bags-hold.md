---
package: "@cbnventures/docusaurus-preset-nova"
category: added
bump: minor
---

Adds typed swizzle implementations for `@theme/Blog/Components/Author` (author byline used in post headers and list cards), `@theme/Blog/Components/Author/Socials` (per-author social icon row sourced from `authors.yml`), `@theme/BlogPostPage/Metadata` (canonical metadata tags for the active post), `@theme/BlogPostPage/StructuredData` (per-post JSON-LD `BlogPosting` schema), and `@theme/BlogListPage/StructuredData` (JSON-LD `Blog` schema for index, tag, and author pages). All five surfaces ship as swizzle targets with full type declarations.
