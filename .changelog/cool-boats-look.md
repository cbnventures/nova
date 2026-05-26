---
package: "@cbnventures/docusaurus-preset-nova"
category: fixed
bump: patch
---

Emits one Open Graph `<meta>` tag per author URL and per blog tag (`article:author`, `article:tag`) on blog post pages, rather than collapsing each list into a single comma-joined value. Aligns the `BlogPostPage/Metadata` swizzle with the Open Graph protocol, which uses repeated properties to represent arrays.
