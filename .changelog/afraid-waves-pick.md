---
package: "@cbnventures/docusaurus-preset-nova"
category: fixed
bump: patch
---

Escapes `<` in JSON-LD payloads to `\u003c` before inlining structured data into `<script type="application/ld+json">` tags on the `BlogListPage/StructuredData`, `BlogPostPage/StructuredData`, and `DocBreadcrumbs/StructuredData` swizzles, so an embedded `</script>` sequence in any string value cannot close the script element early or corrupt the JSON-LD payload.
