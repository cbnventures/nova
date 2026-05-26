---
package: "@cbnventures/docusaurus-preset-nova"
category: updated
bump: minor
---

Reworks the bundled Iconify collections: removes `@iconify-json/ic` and adds `@iconify-json/logos`, `@iconify-json/openmoji`, and `@iconify-json/simple-icons`. Consumers referencing `ic:*` icons should migrate to `ri:*` / `lucide:*` or one of the newly bundled collections (brand marks via `logos:*` / `simple-icons:*`, expressive glyphs via `openmoji:*`).
