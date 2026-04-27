---
package: "@cbnventures/nova"
category: added
bump: minor
---

TypeScript convention adds filename validation: path segments must match `[a-z][a-z0-9-]*` after stripping `.d.ts`, `.tsx`, `.ts`, and `.test`. Dotted suffixes (`.spec.ts`), leading digits, underscores, and special characters all fail
