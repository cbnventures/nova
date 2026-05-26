---
package: "@cbnventures/docusaurus-preset-nova"
category: added
bump: minor
---

Doc pages now emit a JSON-LD `BreadcrumbList` schema in `<head>` derived from the sidebar breadcrumb trail. Enables Google to render breadcrumb chips directly in search results. Exposed as the `@theme/DocBreadcrumbs/StructuredData` swizzle for consumers that need to override the schema shape.
