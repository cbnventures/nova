---
package: "@cbnventures/docusaurus-preset-nova"
category: updated
bump: minor
---

Renames the `./components` subpath export to `./blocks` to make the consumption-mode axis explicit - `theme/` houses Docusaurus swizzle targets (`@theme/X` namespace) and `blocks/` houses Nova-owned direct-import surfaces (Hero, Frame, Stats, etc.). Update consumer imports from `@cbnventures/docusaurus-preset-nova/components` to `@cbnventures/docusaurus-preset-nova/blocks`.
