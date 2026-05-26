---
package: "@cbnventures/docusaurus-preset-nova"
category: added
bump: minor
---

Splits `@theme/ContentFooter` into per-section swizzle targets so consumers can override individual rows without re-implementing the rest of the footer: `@theme/ContentFooter/Edit` (last-updated stamp plus edit-this-page link), `@theme/ContentFooter/Tags`, `@theme/ContentFooter/Share`, and `@theme/ContentFooter/ShareButton`.
