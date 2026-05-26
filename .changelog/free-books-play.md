---
package: "@cbnventures/docusaurus-preset-nova"
category: removed
bump: minor
---

Removes the `@theme/DocVersionBadge` swizzle and the inline non-latest-version badge it rendered. The same "you are viewing an older version" cue is already surfaced by `@theme/DocVersionBanner` at the top of each older-version doc; consumers that swizzled `DocVersionBadge` should drop the swizzle and rely on the banner.
